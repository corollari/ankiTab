function getDecksWithCardsLeft(doc){ //Returns a sorted array of deck ids: ["did12121", "did12368", ...] and an array of deck IDs associated with the respective deck names
function getId(elem){
	return elem.firstElementChild.firstElementChild.id;
}

function getName(elem){
	return elem.firstElementChild.firstElementChild.innerText.trim();
}

function countNbsp(elem){
	return (elem.firstElementChild.firstElementChild.innerHTML.match(/&nbsp;/g) || []).length;
}

let decks = Array.from(doc.querySelectorAll(".row.light-bottom-border")); //Get all decks

let deckNames = {};

decks.forEach((deck) => {
	deckNames[getId(deck)]=getName(deck);
});

let decksLeft = decks.sort((a,b)=> //Sort by id
	getId(a)>getId(b)
).filter((e, i, arr)=>{ //Remove parent decks
	if(!arr[i+1]){
		return true;
	}
	return countNbsp(e)>=countNbsp(arr[i+1]);
}).filter((elem)=> //Remove decks that have no cards left to review
	(Array.from(elem.querySelectorAll(".deckDueNumber>font")).filter((e)=>
		Number(e.firstChild.nodeValue)>0
	).length)>0
).map((elem)=> //Get the ids of the decks left
	getId(elem)
).sort(); //Sort ids

return {deckNames, decksLeft}

}

var framed = document.createElement('div');

export default function rotateDeck(cb, DOMchange=true){ //Create an iframe of https://ankiweb.net/decks/ and change the deck so the cookie gets changed
        chrome.storage.local.get(["interleavingDisabled", "excludedDecks"], function(result) {
		if(result.interleavingDisabled){
			cb&&cb();
		}
		else{
		        $.get("https://ankiweb.net/decks/", function(data) {
        		        framed.innerHTML=data;
		
        		        let deckData=getDecksWithCardsLeft(framed);
				
				chrome.storage.local.set({deckNames: deckData.deckNames}, function() {});
        		        
				let decksLeft=deckData.decksLeft.filter((id)=>result.excludedDecks.indexOf(id)==-1);
	
	                	if(!decksLeft.length){ //All cards scheduled for today have been reviewed
					if(DOMchange){
						$("body").html("<div style='text-align: center;' class='vertical-center'><main class='container'><h1>Congratulations!</h1><hr><h3>All cards scheduled for today have been reviewed</h3></main></div>");
					}
		                }
	        	        else{
                		        chrome.storage.local.get(["lastDeck"], function(result) {
		                                let lastDeck=decksLeft.filter((id)=>id>result.lastDeck).shift() || decksLeft[0];
	        	                        $.post("https://ankiweb.net/decks/select/" + lastDeck, {}, function(){
                		                        cb&&cb();
		                                });
	        	                        chrome.storage.local.set({lastDeck: lastDeck}, function() {});
                		        });
		                }
	        	});
		}
	});
	chrome.storage.local.get(["deckNames", "lastDeck"], function(result) {
		if(result.deckNames[result.lastDeck]){
			let centerStudyMenu=document.querySelector("#deckName");
			if(centerStudyMenu && DOMchange){
				centerStudyMenu.innerText=result.deckNames[result.lastDeck];
			}
		}
	});
};
