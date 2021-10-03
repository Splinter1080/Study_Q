const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var cors = require('cors')
const helmet = require("helmet");
const Chat = require('./models/chat')
const { isLoggedIn } = require('./middleware');
const socketio = require('socket.io');


//login route
const userRoutes = require('./routes/users')
const groupRoutes = require('./routes/groups')



const app = express();
app.use(cors())
app.use(helmet({ contentSecurityPolicy: false }))
app.use(express.json());
app.use("/", userRoutes);
app.use("/group", groupRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

//app.use('/', userRoutes);

//----------------------------------------------

const dbUrl = process.env.dbUrl;


mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

// -----------------------------------


var http = require("http").Server(app);
var io = socketio(http,{cors: {origin: "*"}});

// half baked chat qq

const createMessage = async (name,message,userId,groupId)=>{
    try{
const chat = await Chat.create({
    name,message,userId,groupId
})
    }catch(e){
       // console.log(e)
    }
}

io.on("connection",(socket)=>{
    socket.on("message",({name,message,userId,groupId})=>{
    
        io.emit("message",{name,message,userId,groupId})
    })

    socket.on("join",({name,message,userId,groupId})=>{
        socket.join(groupId)
    })

    socket.on("sendMessage",({name,message,userId,groupId})=>{
        createMessage(name,message,userId,groupId)
        console.log( name,message,userId,groupId)

        io.to(groupId).emit("message",{name,message,userId,groupId})
    })

    console.log("user connected")

    socket.on("disconnect",()=>{
        console.log("user has left")
    })
})


const port = process.env.PORT || 3000;

var server = http.listen(port, () => {
    console.log('server is running on port', server.address().port);
});