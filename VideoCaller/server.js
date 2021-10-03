const express = require('express')
const app = express()
// const cors = require('cors')
// app.use(cors())
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
  debug: true
});
const { v4: uuidV4 } = require('uuid')
var bodyParser = require('body-parser') ; 

app.use('/peerjs', peerServer);

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(req.body.roomId) ; 
  res.redirect(`/join`) ; 
  //res.redirect(`/${uuidV4()}`)
})

app.get('/join',async(req,res) => { 
  res.render('joinRoom');
})
app.post('/join' , async(req, res) => {
  //console.log(req.body.roomId) ;
  res.redirect(`/${req.body.roomId}`) ; 
})


app.get('/:room', (req, res) => {
  res.render('room', { roomId: req.params.room })
})



io.on('connection', socket => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId)
    socket.to(roomId).broadcast.emit('user-connected', userId);
    // messages
    socket.on('message', (message) => {
      //send message to the same room
      io.to(roomId).emit('createMessage', message)
  }); 

    socket.on('disconnect', () => {
      socket.to(roomId).broadcast.emit('user-disconnected', userId)
    })
  })
})

server.listen(process.env.PORT||3030)
