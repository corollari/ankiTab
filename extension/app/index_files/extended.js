//Monkey patching

study.getNextCardOriginal=study.getNextCard

study.getNextCard=function(){
	study.getNextCardOriginal();
	for(let i=1; i<=2; i++){
		study.currentCard[i]=study.currentCard[i].replace('src="', 'src="https://ankiuser.net/study/media/');
	}
}

study.answerCardOriginal=study.answerCard;

study.answerCard=function(n){

study.deck.cards=[];
let r = study.answerCardOriginal(n);
rotateDeck(function(){});
return r;

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
	return Array.from(doc.querySelectorAll(".deckDueNumber:first-child>font")).filter((a)=>Number(a.firstChild.nodeValue)>0).map((a)=>a.parentNode.parentNode.parentNode.querySelector("button").id);
}

var framed = document.createElement('div');
let last="";

function rotateDeck(cb){ //Create an iframe of https://ankiweb.net/decks/ and change the deck so the cookie gets changed
$.get("https://ankiweb.net/decks/",function( data ) {

framed.innerHTML=data;

let decksLeft=getDecksWithCardsLeft(framed);
decksLeft.sort();
last=decksLeft.filter((id)=>id>last).shift() || decksLeft[0];
$.post("https://ankiweb.net/decks/select/" + last, {});
});

}

study.initStudy();

rotateDeck();
