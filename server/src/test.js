
var Gpio = require('onoff').Gpio; //require onoff to control GPIO
var LEDPin = new Gpio(19, 'out'); //declare GPIO4 an output


LEDPin.writeSync(0)
