chrome.browserAction.onClicked.addListener(function (tab) { //Fired when the user clicks the extension's icon
      chrome.tabs.create({ url: "about://newtab" });
      //chrome.tabs.create({ url: "app/index.html" });
});
chrome.runtime.onInstalled.addListener(function() {
	chrome.storage.local.set({interleavingTrigger: 2, lastDeck:"", interleavingDisabled:false, betaEnabled:false, deckNames:{}}, function() {}); //Set default values
});
