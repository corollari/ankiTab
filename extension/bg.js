chrome.browserAction.onClicked.addListener(function (tab) { //Fired when the user clicks the extension's icon
      chrome.tabs.create({ url: "about://newtab" });
      //chrome.tabs.create({ url: "app/index.html" });
});
