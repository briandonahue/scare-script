// color swirl! connect an RGB LED to the PWM pins as indicated
// in the #defines
// public domain, enjoy!

#define REDPIN 3
#define GREENPIN 6
#define BLUEPIN 5

#define FADESPEED 5 // make this higher to slow down
long redRando;
long blueRando;
long greenRando;
long multiplier;

void setup()
{

  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
}

void loop()

{

    //Generate Random Number to set brightness
  int brightness = random(120);
  
  //Use brightness and filler to set Red to high visibility
  analogWrite(REDPIN, brightness+135);
  
  //Use green and blue in a very low percentage to get some orange glowing into the "fire"
  analogWrite(GREENPIN, brightness/7);
  analogWrite(BLUEPIN, brightness/17);
  
  //create a little bit of flickering
  delay(random(20, 300));

  analogWrite(REDPIN, 0);
  
  //Use green and blue in a very low percentage to get some orange glowing into the "fire"
  analogWrite(GREENPIN, 0);
  analogWrite(BLUEPIN, 0);
  delay(random(0, 100));
  


  /*
  redRando = random(1, 255);
  blueRando = random(1, 120);
  greenRando = random(1, 232);
  multiplier = redRando / 255;

  analogWrite(REDPIN, redRando);
  analogWrite(GREENPIN, greenRando * multiplier);
  analogWrite(BLUEPIN, blueRando * multiplier);

  delay(random(20, 200));
  */
}
