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
  analogWrite(GREENPIN, 0);
  analogWrite(BLUEPIN, 0);
}

void loop()

{
    int v;

    for (v = 0; v < 220; v++) { 
        analogWrite(REDPIN, v);
        delay(1);
    } 
    for (v = 220; v >= 0; v--) { 
        analogWrite(REDPIN, v);
        delay(1);
    } 
    
    delay(100);

    for (v = 0; v < 256; v++) { 
        analogWrite(REDPIN, v);
        delay(1);
    } 
    for (v = 255; v >= 0; v--) { 
        analogWrite(REDPIN, v);
        delay(2);
    } 
        delay(900);
}