// color swirl! connect an RGB LED to the PWM pins as indicated
// in the #defines
// public domain, enjoy!

#define REDPIN 3
#define GREENPIN 6
#define BLUEPIN 5

#define FADESPEED 5 // make this higher to slow down
long rando;
long multiplier;
void setup()
{

  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
}

void loop()

{
  rando = random(1, 255);
  multiplier = rando / 255;
  analogWrite(REDPIN, rando);
  analogWrite(GREENPIN, 50*multiplier);
  analogWrite(BLUEPIN, 0);

  delay(random(20, 200));
}
