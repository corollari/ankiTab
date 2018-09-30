chrome.browserAction.onClicked.addListener(function (tab) { //Fired when the user clicks the extension's icon
      chrome.tabs.create({ url: "about://newtab" });
      //chrome.tabs.create({ url: "app/index.html" });
});

chrome.runtime.onInstalled.addListener(function() {
	let defaults={
		interleavingTrigger: 1, 
		lastDeck:"", 
		interleavingDisabled:false, 
		betaEnabled:false, 
		deckNames:[], 
		excludedDecks:[],
		emptyDecks:[]
	};
	chrome.storage.local.get(Object.keys(defaults), function(result) {
		for(let s in result){
			delete defaults[s];
		}
		chrome.storage.local.set(defaults, function() {}); //Set missing default values
	});
});

chrome.runtime.setUninstallURL("https://goo.gl/forms/QsvZzGcRfQTPZ66E2");
