
<h1 align="center">
  <br>
  <img src="https://raw.githubusercontent.com/corollari/ankiTab/master/promo/icon.png" width="64"></a>
  <br>
  AnkiTab
  <br>
</h1>

<h4 align="center">Browser extension that replaces the new tab page with <a href="https://apps.ankiweb.net/" target="_blank">Anki</a> flashcards</h4>

<p align="center">
  <a href="#install">Install</a> •
  <a href="#build">Build</a> •
  <a href="#credits">Credits</a> •
  <a href="#to-do">TO-DO</a> •
  <a href="#license">License</a>
</p>

![screenshot](https://raw.githubusercontent.com/corollari/ankiTab/master/promo/screenshot.png)

## Install
The extension can be installed through [Chrome's Web Store](https://chrome.google.com/webstore/detail/ankitab/ihoaepdiibjbifnhcjoaddgcnfgjmjdk) or [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/ankitab/)

## Build
##### Setup:
```bash
git clone https://github.com/corollari/ankiTab.git
cd ankiTab
```

##### Build .zip packages for Firefox and Chrome:
```bash
bash build.sh
```

##### Prepare the extension to be loaded unpacked into Firefox:
```bash
bash build.sh -f
```

##### Prepare the extension to be loaded unpacked into Chrome:
```bash
bash build.sh -c
```

##### Build the images (only necessary after changing the icon):
```bash
bash build.sh -i
```

## Credits
The following external resources have been included as part of the project:
- A modified version of the web app which powers [ankiuser.net](https://ankiuser.net/study/)

## TO-DO
- [ ] Add the option to use a local server powered by AnkiConnect as the back end instead of ankiweb.net/ankiuser.net

## License
The Unlicense
