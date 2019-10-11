import RPi.GPIO as GPIO
import time
import subprocess
import os
import random

GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.IN)        

Last_State = 0
Current_State = 0
Timer_Seconds = 60
Current_Time = time.time()
Trigger_Time = Current_Time + 30
random.seed(time.time())

def startle():
    x = random.randrange(4)
    print "Startle!, ", x
    os.system("sudo omxplayer -b -o hdmi --vol 100 /home/pi/share/startle" + str(x) + ".mp4")

def roam():
    x = random.randrange(4)
    print "Roam!, ", x
    os.system("sudo omxplayer -b -o hdmi --vol 100 /home/pi/share/roam" +str(x) + ".mp4")


os.system("sudo fbi -d /dev/fb0 -T 1 --noverbose /home/pi/share/black.png")
while True:

    Current_State=GPIO.input(11)
    Current_Time = time.time()
    print "Timer: ", round(Trigger_Time - Current_Time, 2), " Motion: ", Current_State


    if Current_Time > Trigger_Time:
        print "Timer Elapsed!"
        roam()
        Trigger_Time = time.time() + Timer_Seconds

    elif Current_State==1 and Current_State != Last_State:
        print "Motion Detected", Current_State
        startle()
        Trigger_Time = time.time() + Timer_Seconds

    time.sleep(.5)

