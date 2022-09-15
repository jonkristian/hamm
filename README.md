# HAMM (Home Assistant Magic Mirror)

![image.png](./src/assets/hamm_preview.png)

A simple vite + svelte application to display [Home Assistant](https://home-assistant.io) entities in a magic mirror like fashion. It connects to Home Assistant through websockets.

## Getting started
Clone this repository and then inside run `npm install`. Copy `.env-example` to `.env` and modify it with your home assistant url and a long lived token (generated via your account in home assistant).

## Working with it
Start by creating a file called `cards.js` inside the `src` folder, then copy the contents from `./src/cards.js-example`, naturally you will now have to edit and replace with your own entities and configurations. For a live preview while you're happily editing you can simply run `npm run dev` in your terminal, the output will give you a localhost url for the live preview.

## Setting it up on a Raspberry Pi
I am using pm2 to autostart on boot and control the service. Install it with `sudo npm install -g pm2` and make sure it starts on boot by following instructions from the `pm2 startup` command. Once pm2 is in place create a file called `hamm.sh` with the following content:
```
cd ./hamm
DISPLAY=:0 npm run dev
```
Then start hamm through pm2 by issuing `pm2 start hamm.sh`. and save it with `pm2 save`. You can now control hamm with `pm2 restart|stop|logs|show hamm` and it will automatically start on boot. 

Copy `kiosk.sh` to your home folder on the pi, `chmod +x kiosk.sh` and add the following to `~/.config/lxsession/LXDE-pi/autostart`:

```
@xset s noblank
@xset s off
@xset -dpms
@bash /home/pi/kiosk.sh
```
Hope you found this little project useful, please let me know if you like it and you're welcome to create a ticket if you feel something is missing or if you're having any issues.

***
⭐️ this repository if you found it useful ❤️

<a href="https://www.buymeacoffee.com/jonkristian" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
