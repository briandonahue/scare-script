import "regenerator-runtime/runtime.js";
import { exec } from 'child_process'
import ReadMotion from './ReadMotion'
import { server } from './server'
import fs from 'fs'
import { play } from './play-video'
import Glob from 'glob'


let verticalMode = false
let kidMode = false
let files = {roam:[], scare:[]}

const motion = new ReadMotion();


var config = {
  hauntCooldown: 30,
  roamCooldown: 60
}

let roamInterval = undefined

exec("sudo fbi -d /dev/fb0 -T 1 --noverbose /home/pi/share/black.png")
const loadFiles = (isVertical, kidMode) => {
  const orientation = isVertical ? "vertical" : "horizontal";
  const scareFiles = kidMode ? "kids" : "adults";
  files = {
    roam: Glob.sync(`/home/pi/share/${orientation}/roam/**/*.mp4`),
    scare: Glob.sync(`/home/pi/share/${orientation}/scare/${scareFiles}/**/*.mp4`),
  }
}

loadFiles(verticalMode)
console.log(files)

var io = require('socket.io')(server, { path: '/socket' })

server.listen(8080);
console.log("Listening on port 8080...")



io.sockets.on('connection', async (socket) => {// WebSocket Connection
  console.log("Client Connected")
  //  var buttonState = 0; //variable to store button state
  socket.broadcast.emit('test', "test")
  socket.emit('config', config)


  socket.on('verticalMode', (enabled) => {
    verticalMode = enabled
    loadFiles(verticalMode)
  })
  socket.on('kidMode', (enabled) => {
    kidMode = enabled
    loadFiles(kidMode)
  })
  socket.on('enableMotion', (enabled) => {
    if (enabled) {
      console.log('Enabling motion detection.')
      motion.start(17, 500, (current) => {
        socket.emit('motion', current)
      }, 500)
    }
    else {
      console.log('Disabling motion detection.')
      motion.stop()
    }
  })

  socket.on('console', (msg) => {
    console.log(msg)
  })
  socket.on('scare', async (msg) => {
    const ghost = Math.floor(Math.random() * files.scare.length)
    await playFile(files.scare[ghost])
  })
  socket.on('roam', async (msg) => {
    const ghost = Math.floor(Math.random() * files.roam.length)
    await playFile(files.roam[ghost])
  })

});

const playFile = async (file) => {
  await play(file)
  console.log("playing", file)
}

