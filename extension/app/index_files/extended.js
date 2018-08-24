//Monkey patching

study.answerCardOriginal=study.answerCard;

study.answerCard=function(n){

chrome.storage.sync.get(["interleavingTrigger"], function(result) {
        while(study.deck.cards.length>Number(result.interleavingTrigger)){
		study.deck.cards.pop();
	}
});

return study.answerCardOriginal(n);

}

//Cookie stealing

chrome.cookies.get({"url": "https://ankiweb.net", "name": "ankiweb"}, function(cookie) {
	if(!cookie || cookie.value=="login"){
		window.location="https://ankiweb.net/account/login";
	}else{
		document.cookie="ankiweb="+cookie.value;
	}
});


function getDecksWithCardsLeft(doc){ //Returns array of deck ids: [12232,12121,...]
	return Array.from(doc.querySelectorAll(".deckDueNumber>font")).filter((a)=>Number(a.firstChild.nodeValue)>0).map((a)=>a.parentNode.parentNode.parentNode.querySelector("button").id).sort().filter((item, pos, ary) => !pos || item != ary[pos - 1]);
}

var framed = document.createElement('div');

function rotateDeck(cb){ //Create an iframe of https://ankiweb.net/decks/ and change the deck so the cookie gets changed
	$.get("https://ankiweb.net/decks/",function( data ) {
		framed.innerHTML=data;

		let decksLeft=getDecksWithCardsLeft(framed);
		decksLeft.sort();

		chrome.storage.sync.get(["lastDeck"], function(result) {
			let lastDeck=result.lastDeck||"";
			lastDeck=decksLeft.filter((id)=>id>lastDeck).shift() || decksLeft[0];
			$.post("https://ankiweb.net/decks/select/" + lastDeck, {}, function(){
				cb&&cb();
			});
			chrome.storage.sync.set({lastDeck: lastDeck}, function() {});
		});
	});
}

study.initStudy();

document.querySelector("base").href="https://ankiuser.net/study/media/";
