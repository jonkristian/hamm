#!/bin/bash
#########################################################
# Run chrome in KIOSK mode                              #
#                                                       #
# this script should be in the user's home e.g.         #
# /home/pi/kiosk.sh                                     #
# and should have exec right                            #
# $ chmod 750 kiosk.sh                                  #
#                                                       #
# This script should be executed by the XLDE autostart  #
# /home/pi/.config/lxsession/LXDE-pi/autostart          #
#########################################################

### Use unclutter to hide the mouse
# unclutter -idle 0.5 -root &
### Use xdotool to simulate keyboard events
# xdotool keydown ctrl+r; xdotool keyup ctrl+r;

### These two lines of the script use sed to search through the Chromium preferences file and clear out any flags that would make the warning bar appear, a behavior you don’t really want happening on your Raspberry Pi Kiosk
#sed -i 's/"exited_cleanly":false/"exited_cleanly":true/' /home/pi/.config/chromium/Default/Preferences
#sed -i 's/"exit_type":"Crashed"/"exit_type":"Normal"/' /home/pi/.config/chromium/Default/Preferences

### This line launches Chromium with our parameters. We will go through each of these parameters so you know what you can modify, and how you can modify it.
### --kiosk : operate in kiosk mode (limited acces to browser and OS e.g. no system bar, no tabs)
### --noerrdialogs : do not show error dialogs
### --disable-infobars : disable info bar (e.g. "chroium is not de default browser")
### --start-fullscreen (not necessary in kiosk mode)
### --incognito

chromium-browser --noerrdialogs --disable-infobars --incognito --kiosk http://localhost:5173/

# You may want to enclose the btowser command in a *while loop* to reopen the browser when user closes it instead of closing x server.
# In this case add an `&` at the end of the browser line:
#
#while true; do
#chromium-browser --noerrdialogs --disable-infobars --incognito --kiosk http://localhost:8080/&
#done
