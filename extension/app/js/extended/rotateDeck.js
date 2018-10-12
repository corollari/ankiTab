import ankiConnectInvoke from "../../../libs/ankiConnect.js"

const checkEmptyDelay=3600*1000; // in milliseconds

export default function rotateDeck(DOMchange=true){
	return new Promise((resolve, reject)=>{
		chrome.storage.local.get(["interleavingDisabled", "excludedDecks", "lastDeck", "deckNames", "emptyDecks"], async function(result) {
			if(result.interleavingDisabled){
				resolve();
			}
			else{
				let now=Date.now();
				let newEmptyDecks = result.emptyDecks.filter((deck)=>Math.abs(now-deck.date)<checkEmptyDelay);
				chrome.storage.local.set({emptyDecks: newEmptyDecks});
				let emptyDeckNames=newEmptyDecks.map((d)=>d.name);
				if(!result.deckNames.length){
					result.deckNames = await ankiConnectInvoke("deckNames");
				}
				let decksLeft=result.deckNames.filter((deck)=>result.excludedDecks.indexOf(deck)==-1 && emptyDeckNames.indexOf(deck)==-1); 
				if(!decksLeft.length){ //All cards scheduled for today have been reviewed
					if(DOMchange){
						document.body.innerHTML="<div style='text-align: center;' class='vertical-center'><main class='container'><h1>Congratulations!</h1><hr><h3>All cards scheduled for today have been reviewed</h3></main></div>";
					}
				}
				else{
					let lastDeck=decksLeft.sort().filter((d)=>d>result.lastDeck).shift() || decksLeft[0];
					ankiConnectInvoke("guiDeckReview", {name: lastDeck})
						.then(()=>chrome.storage.local.set({lastDeck: lastDeck}, resolve))
						.catch((e)=>{
							window.location.href="chrome-search://local-ntp/local-ntp.html"
						});
				}
			}
		});
		ankiConnectInvoke("deckNames").then((decks)=>chrome.storage.local.set({deckNames: decks}));
	});
};
