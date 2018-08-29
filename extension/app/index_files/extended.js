//Monkey patching

study.answerCardOriginal=study.answerCard;

study.answerCard=function(n){

chrome.storage.local.get(["interleavingTrigger"], function(result) {
	while(study.deck.cards.length>=Number(result.interleavingTrigger)){
		study.deck.cards.pop();
	}
	study.answerCardOriginal(n);
	study.save();
});

}

function getDecksWithCardsLeft(doc){ //Returns sorted array of deck ids: ["did12121", "did12368", ...]
	return Array.from(doc.querySelectorAll(".deckDueNumber>font")).filter((a)=>Number(a.firstChild.nodeValue)>0).map((a)=>a.parentNode.parentNode.parentNode.querySelector("button").id).sort().filter((item, pos, ary) => !pos || item != ary[pos - 1]);
}

var framed = document.createElement('div');

function rotateDeck(cb){ //Create an iframe of https://ankiweb.net/decks/ and change the deck so the cookie gets changed
	$.get("https://ankiweb.net/decks/",function( data ) {
		framed.innerHTML=data;

		let decksLeft=getDecksWithCardsLeft(framed);

		if(!decksLeft.length){ //All cards scheduled for today have been reviewed
			$("body").html("<div style='text-align: center;' class='vertical-center'><main class='container'><h1>Congratulations!</h1><hr><h3>All cards scheduled for today have been reviewed</h3></main></div>");
		}
		else{
			chrome.storage.local.get(["lastDeck"], function(result) {
				let lastDeck=result.lastDeck||"";
				lastDeck=decksLeft.filter((id)=>id>lastDeck).shift() || decksLeft[0];
				$.post("https://ankiweb.net/decks/select/" + lastDeck, {}, function(){
					cb&&cb();
				});
				chrome.storage.local.set({lastDeck: lastDeck}, function() {});
			});
		}
	});
}

$(document).keyup(function(e) {
	(e.which == 32 || e.which==13) && study.drawAnswer();
});

document.querySelector("base").href="https://ankiuser.net/study/media/";

//Cookie stealing

chrome.cookies.get({"url": "https://ankiweb.net", "name": "ankiweb"}, function(cookie) {
	if(!cookie || cookie.value=="login"){
		window.location=chrome.runtime.getURL("../login/index.html")
	}else{
		chrome.cookies.set( 
		{
			url: "https://ankiuser.net",
			name: cookie.name,
			value: cookie.value,
			domain: "ankiuser.net",
			path: cookie.path,
			secure: cookie.secure,
			httpOnly: cookie.httpOnly,
		},
		()=>study.initStudy());
	}
});
