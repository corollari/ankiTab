while getopts "ifc" opt; do
  case $opt in
    i)
      convert promo/icon.png -resize 16x16 extension/icons/16.png
      cp extension/icons/16.png docs/favicon.png
      convert promo/icon.png -resize 24x24 extension/icons/24.png
      convert promo/icon.png -resize 32x32 extension/icons/32.png
      convert promo/icon.png -resize 48x48 extension/icons/48.png
      convert promo/icon.png -resize 128x128 extension/icons/128.png
      ;;
    f)
      cp manifests/firefoxManifest.json extension/manifest.json
      exit
      ;;
    c)
      cp manifests/chromeManifest.json extension/manifest.json
      exit
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      ;;
  esac
done
cp manifests/firefoxManifest.json extension/manifest.json
(cd extension && zip -r ../firefox.zip .)
cp manifests/chromeManifest.json extension/manifest.json
(cd extension && zip -r ../chrome.zip .)
