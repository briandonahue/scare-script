var Gpio = require('onoff').Gpio; //require onoff to control GPIO
var pinSkull1 = new Gpio(19, 'out'); //declare GPIO4 an output
var pinMotion = new Gpio(17, 'in'); //declare GPIO4 an output

const HIGH = 1
const LOW = 0
let MOTION_DETECTED = false

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
  const value  = await pinMotion.read()
  const current = value === 1
  if(MOTION_DETECTED != current){
    MOTION_DETECTED = current
  socket.emit('motion', MOTION_DETECTED)

  }
}

var io = require('socket.io')(http, {path: '/socket'}) //require socket.io module and pass the http object

http.listen(8080); //listen to port 8080
console.log("HERE")



io.sockets.on('connection', function (socket) {// WebSocket Connection
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
  socket.on('state', function (data) { //get button state from client
    // buttonState = data;
 //   if (buttonState != LEDPin.readSync()) { //Change LED state if button state is changed
//      LEDPin.writeSync(buttonState); //turn LED on or off
 //   }
  });
});