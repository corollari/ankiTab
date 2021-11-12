[link-cws]: https://chrome.google.com/webstore/detail/ankitab/ihoaepdiibjbifnhcjoaddgcnfgjmjdk "Version published on Chrome Web Store"
[link-amo]: https://addons.mozilla.org/en-US/firefox/addon/ankitab/ "Version published on Mozilla Add-ons"

<h1 align="center">
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
- [**Chrome** extension][link-cws] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/ihoaepdiibjbifnhcjoaddgcnfgjmjdk.svg?label=%20">][link-cws]
- [**Firefox** add-on](https://github.com/corollari/ankiTab/issues/3)

### Recent releases
- v0.5.4 (Nov 11, 2021) - improved dark mode (cards are made white-on-black text), image widths now limited to <100% of card width. 

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
The main icon used in the extension comes from [Open Iconic](https://useiconic.com/open).

## TO-DO
- [ ] Use a standalone web version of Anki instead of relying on AnkiConnect

## License
The Unlicense
