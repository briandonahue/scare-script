import "regenerator-runtime/runtime.js";
import { server } from './server'
import App from './App'
import Glob from 'glob'

/*
import { exec } from 'child_process'
import { play } from './play-video'
*/
require('dotenv-defaults').config()

let opts = {
  kidScareFiles: ["kid-scare-1", "kid-scare-2"],
  adultScareFiles: ["adult-scare-1", "adult-scare-2"],
  roamFiles: ["roam-1", "roam-2"],
  kidMode: true
}

if(process.env.RASPPI === 'true'){
  const orientation = process.env.VERTICAL_MODE === 'true' ? 'vertical' : 'horizontal'
  const basePath = process.env.VIDEO_FOLDER
  opts.kidScareFiles = Glob.sync(`${basePath}${orientation}/scare/kids/**\/*.mp4`),
  opts.adultScareFiles = Glob.sync(`${basePath}${orientation}/scare/adults/**\/*.mp4`)
  opts.roamFiles = Glob.sync(`${basePath}${orientation}/roam/**\/*.mp4`)
  console.log(opts)
}

const app = new App(opts)
app.start()


const socket = require('socket.io')(server, { path: '/socket' })
socket.on('connect', async (socket) => {// WebSocket Connection
  console.log("Client Connected")
  //  var buttonState = 0; //variable to store button state
  socket.broadcast.emit('test', "test")

})
socket.on('enableRoam', (enabled) => {
})

socket.on('enableMotion', (enabled) => {
})

server.listen(8080);

console.log("Listening on port 8080...")

/*

let files = {roam:[], scare:[]}

const motion = new ReadMotion();



const config = defaultConfig

let roamInterval = undefined

exec("sudo fbi -d /dev/fb0 -T 1 --noverbose /home/pi/share/black.png")
const loadFiles = (isVertical, kidMode) => {
  const orientation = isVertical ? "vertical" : "horizontal";
  const scareFiles = kidMode ? "kids" : "adults";
  files = {
    roam: Glob.sync(`/home/pi/share/${orientation}/roam/**\/*.mp4`),
    scare: Glob.sync(`/home/pi/share/${orientation}/scare/${scareFiles}/**\/*.mp4`),
  }
}

loadFiles(config.verticalMode)
console.log(files)



const startRoam = () => {
  if(roamInterval) clearInterval(roamInterval)
  roamInterval = setInterval(() => {
    playRoam()
  }, config.roamCooldown * 1000)
}

const playRoam = async () => {
    const ghost = Math.floor(Math.random() * files.roam.length)
    const file = files.roam[ghost]
    await play(file)
}




  socket.on('verticalMode', (enabled) => {
    config.verticalMode = enabled
    loadFiles(config.verticalMode)
  })
  socket.on('kidMode', (enabled) => {
    config.kidMode = enabled
    loadFiles(config.kidMode)
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
    const file = files.scare[ghost]
    await play(file)
  })
  socket.on('start-roam', async () => {
    await playRoam()
  })



*/