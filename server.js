
var express = require('express');
const socketIO = require('socket.io');
const http = require('http')
var cors = require('cors')
let app = express();
let server = http.createServer(app)
var io=socketIO(server);
app.use(cors());

app.options('*', cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

let interval;

io.on("connection", (socket) => {
  // console.log("New client connected");
  if (interval) {
    clearInterval(interval);
  }

  socketHandlers(socket)

  socket.on("disconnect", () => {
    // console.log("Client disconnected");
    clearInterval(interval);
  });
});



let playersData=[
    {name:"emad", position:{ positionZ:-3, positionY:1, positionX:1}},
    {name:"arsalan",position:{ positionZ:-10, positionY:1, positionX:3 }},
    {name:"bilal",position:{ positionZ:-20, positionY:1, positionX:1} },
]


const socketHandlers = socket => {    
    
    socket.on("updatePlayers", updatedPlayersData => {
        console.log(updatedPlayersData,'updatedPlayersData')
        const updatedPlayer = playersData.filter((itm)=>  itm.name == updatedPlayersData.name ).map(itm => itm.position = updatedPlayersData.position )    
        console.log(updatedPlayer, 'updatePlayers received in server')
        
    });

    socket.on("addPlayer", addPlayer => {
        // console.log('addPlayer received in server')
        playersData.push(addPlayer)});

        // console.log(playersData)
    // Emitting a new message. Will be consumed by the client
    // console.log('playersData send from server')
    socket.emit("playersData", playersData);
  };

server.listen(3002);