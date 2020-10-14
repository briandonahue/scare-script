import "regenerator-runtime/runtime.js";
import { exec } from 'child_process'
import { Gpio } from 'onoff'

const pinSkull1 = new Gpio(19, 'out'); 
const pinSkull2 = new Gpio(26, 'out'); 


var pinMotion = new Gpio(17, 'in'); 

const HIGH = 1
const LOW = 0
let MOTION_DETECTED = false

exec("sudo fbi -d /dev/fb0 -T 1 --noverbose /home/pi/share/black.png")

var fs = require('fs'); //require filesystem to read html files
var http = require('http').createServer(function handler(req, res) { //create server
  console.log(__dirname)
  fs.readFile('public/index.html', function (err, data) { //read html file
    if (err) {
      res.writeHead(500);
      return res.end('Error loading socket.io.html');
    }

    res.writeHead(200);
    res.end(data);
  });
});

var config = {
  hauntCooldown: 30,
  roamCooldown: 60
}

const readMotion = async (socket) => {
  const value = await pinMotion.read()
  const current = value === 1
  if (MOTION_DETECTED != current) {
    MOTION_DETECTED = current
    socket.emit('motion', MOTION_DETECTED)

  }
}

var io = require('socket.io')(http, { path: '/socket' }) //require socket.io module and pass the http object

http.listen(8080); //listen to port 8080
console.log("HERE")



io.sockets.on('connection', async (socket) => {// WebSocket Connection
  pinSkull1.writeSync(HIGH)
  console.log("Client Connected")
  //  var buttonState = 0; //variable to store button state
  socket.broadcast.emit('test', "test")
  socket.emit('config', config)

  let i = 0
  setInterval(() => {
    readMotion(socket)
  }, 500)
  socket.on('console', (msg) => {
    console.log(msg)
  })
  socket.on('scare', async (msg) => {
    const ghost = Math.floor(Math.random() * 4)
    await play(ghost, 'scare')
  })
  socket.on('roam', async (msg) => {
    const ghost = Math.floor(Math.random() * 4)
    await play(ghost, 'roam')
  })

  socket.on('skull', msg => {

  })
});

const play = async (fileNum, type) => {
  const { error, stdout, stderr } = await exec(`sudo omxplayer -b -o both --vol -1000 /home/pi/share/${type}${fileNum}.mp4`)
  console.log(error, stdout, stderr)
}

