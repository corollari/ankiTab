function getDecksWithCardsLeft(doc){ //Returns sorted array of deck ids: ["did12121", "did12368", ...]
function getId(elem){
	return elem.firstElementChild.firstElementChild.id;
}

function countNbsp(elem){
	return (elem.firstElementChild.firstElementChild.innerHTML.match(/&nbsp;/g) || []).length;
}

return Array.from(doc.querySelectorAll(".row.light-bottom-border") //Get all decks
).sort((a,b)=> //Sort by id
	a.firstElementChild.firstElementChild.id>b.firstElementChild.firstElementChild.id
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
}

var framed = document.createElement('div');

export default function rotateDeck(cb){ //Create an iframe of https://ankiweb.net/decks/ and change the deck so the cookie gets changed
        chrome.storage.local.get(["interleavingDisabled"], function(result) {
		if(result.interleavingDisabled){
			cb&&cb();
		}
		else{
		        $.get("https://ankiweb.net/decks/",function( data ) {
        		        framed.innerHTML=data;
		
        		        let decksLeft=getDecksWithCardsLeft(framed);
	
	                	if(!decksLeft.length){ //All cards scheduled for today have been reviewed
                	        	$("body").html("<div style='text-align: center;' class='vertical-center'><main class='container'><h1>Congratulations!</h1><hr><h3>All cards scheduled for today have been reviewed</h3></main></div>");
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
};
