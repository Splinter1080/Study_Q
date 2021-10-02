const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
var cors = require('cors')
const corsAllow = require('./routes/cors');
const helmet = require("helmet");
const { isLoggedIn } = require('./middleware');


//login route
const userRoutes = require('./routes/users')

const app = express();
app.use(cors())
app.use(helmet({ contentSecurityPolicy: false }))
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public'))); 

//CORS middleware
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type, Accept,Authorization,Origin");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", true);
    next();
});

app.use('/', userRoutes);

//----------------------------------------------

const dbUrl = 'mongodb+srv://sans:sans@codefury.gkzbe.mongodb.net/codefury4?retryWrites=true&w=majority';


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
var io = require("socket.io")(http);


// -----------------------------------


app.get('/', corsAllow.corsWithOptions, (req, res) => {
   
 res.status(200).send({"hello":true})
});

io.on("connection", () => {
    console.log("a user is connected")
})


const port = process.env.PORT || 3000;

var server = http.listen(port, () => {
    console.log('server is running on port', server.address().port);
});

