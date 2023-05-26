# HAMM (Home Assistant Magic Mirror)

![image.png](./assets/hamm_preview.png)

Electron Application built with vite+svelte to to display [Home Assistant](https://home-assistant.io) entities in a magic mirror like fashion. It connects to Home Assistant through websockets.

## Getting started
### This assumes you have raspberry pi running with a desktop environment.
1. Download latest release from packages and install with `sudo dpki -i hamm-{version}.deb`.
2. Copy contents of `resources/hamm.service` to `/etc/systemd/system/hamm.service` and type `sudo systemctl enable hamm`
3. Create A Long-Lived Access Token for hamm in Home Assistant under profile.
4. Copy content of `resources/config.json` and `resources/cards.json` to `~/.config/hamm`
5. Modify `config.json` with your token and url, and `cards.json` with your own config.
6. Reboot

## Working with it
Just start editing `cards.json`, the app should auto-refresh.


Hope you found this little project useful, please let me know if you like it and you're welcome to create a ticket if you feel something is missing or if you're having any issues.

***
⭐️ this repository if you found it useful ❤️

<a href="https://www.buymeacoffee.com/jonkristian" target="_blank"><img src="https://bmc-cdn.nyc3.digitaloceanspaces.com/BMC-button-images/custom_images/white_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
