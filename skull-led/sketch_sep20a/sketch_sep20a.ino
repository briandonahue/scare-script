// color swirl! connect an RGB LED to the PWM pins as indicated
// in the #defines
// public domain, enjoy!
 
#define REDPIN 5
#define GREENPIN 6
#define BLUEPIN 7
#define LEDPIN 0
 
#define FADESPEED 5     // make this higher to slow down
 
void setup() {
//  Serial.write("SET UP");
/*  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
*/
 pinMode(BLUEPIN, OUTPUT);
/*    analogWrite(REDPIN, 0);
    analogWrite(BLUEPIN, 0);
    analogWrite(GREENPIN, 0);
*/

//    analogWrite(LEDPIN, 0);
}
 
 
void loop() {
  int r, g, b;
 analogWrite(BLUEPIN, 255);
 delay(50);
 analogWrite(BLUEPIN, 0);
 delay(50);
 

/*    Serial.print("what");
    analogWrite(REDPIN, 255);
    analogWrite(GREENPIN, 35); //orangeish
    delay(50);
    analogWrite(REDPIN, 0);
    analogWrite(GREENPIN, 0);
 
    delay(50);
 */
 /*
  // fade from blue to violet
  for (r = 0; r < 256; r++) { 
    analogWrite(REDPIN, r);
    delay(FADESPEED);
  } 
  // fade from violet to red
  for (b = 255; b > 0; b--) { 
    analogWrite(BLUEPIN, b);
    delay(FADESPEED);
  } 
  // fade from red to yellow
  for (g = 0; g < 256; g++) { 
    analogWrite(GREENPIN, g);
    delay(FADESPEED);
  } 
  // fade from yellow to green
  for (r = 255; r > 0; r--) { 
    analogWrite(REDPIN, r);
    delay(FADESPEED);
  } 
  // fade from green to teal
  for (b = 0; b < 256; b++) { 
    analogWrite(BLUEPIN, b);
    delay(FADESPEED);
  } 
  // fade from teal to blue
  for (g = 255; g > 0; g--) { 
    analogWrite(GREENPIN, g);
    delay(FADESPEED);
  } 
  */
  
}
