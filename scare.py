import RPi.GPIO as GPIO
import time
import subprocess
import os
import random
import argparse

parser = argparse.ArgumentParser(description='Scare script!')
parser.add_argument('--roam', '-r', help='Timer for roaming ghost to appear. Default: 60. Set to 0 to disable.', \
                    default=60, type=int)

parser.add_argument('--scare', '-s', help='Cooldown for scare ghosts. Default=30. Set to 0 to disable.', \
                    default=30, type=int)
args = parser.parse_args()

print args.roam
GPIO.setwarnings(False)
GPIO.setmode(GPIO.BOARD)
GPIO.setup(11, GPIO.IN)        

Last_State = 0
Current_State = 0
Haunt_Cooldown = args.roam
Scare_Cooldown = args.scare
Current_Time = time.time()
Scare_Window = Current_Time
Haunt_Trigger = Current_Time + Haunt_Cooldown
random.seed(time.time())

def startle():
    x = random.randrange(4)
    print "Startle!, ", x
    os.system("sudo omxplayer -b -o hdmi --vol 100 /home/pi/share/scare" + str(x) + ".mp4")

def roam():
    x = random.randrange(4)
    print "Roam!, ", x
    os.system("sudo omxplayer -b -o hdmi --vol 100 /home/pi/share/roam" +str(x) + ".mp4")


os.system("sudo fbi -d /dev/fb0 -T 1 --noverbose /home/pi/share/black.png")
while True:

    Current_State=GPIO.input(11)
    Current_Time = time.time()
    print "Motion: ", Current_State
    print "Haunt Countdown: ", round(Haunt_Trigger - Current_Time, 2)
    print "Scare Cooldown: ", round(Scare_Window - Current_Time, 2)


    if Current_Time > Haunt_Trigger and Haunt_Cooldown > 0:
        print "Timer Elapsed!"
        roam()
        Haunt_Trigger = time.time() + Haunt_Cooldown

    elif Current_State == 1 and \
         Current_Time > Scare_Window and \
         Scare_Cooldown > 0:
        print "Motion Detected", Current_State
        startle()
        Haunt_Trigger = time.time() + Haunt_Cooldown
        Scare_Window = time.time() + Scare_Cooldown

    time.sleep(.5)

