// color swirl! connect an RGB LED to the PWM pins as indicated
// in the #defines
// public domain, enjoy!

#define REDPIN 3
#define GREENPIN 6
#define BLUEPIN 5

#define FADESPEED 5 // make this higher to slow down

void setup()
{

  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
}

void loop()

{
    int v, p;
    int pins[3];
    pins[0] = REDPIN;
    pins[1] = GREENPIN;
    pins[2] = BLUEPIN;

  for (p = 0; p < 3; p++){
    for (v = 0; v < 256; v++) { 
        analogWrite(pins[p], v);
        delay(FADESPEED);
    } 
    for (v = 255; v >= 0; v--) { 
        analogWrite(pins[p], v);
        delay(FADESPEED);
    } 
  }
}

