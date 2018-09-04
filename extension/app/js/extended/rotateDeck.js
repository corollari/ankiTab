function getDecksWithCardsLeft(doc){ //Returns sorted array of deck ids: ["did12121", "did12368", ...]
        return Array.from(doc.querySelectorAll(".deckDueNumber>font")).filter((a)=>Number(a.firstChild.nodeValue)>0).map((a)=>a.parentNode.parentNode.parentNode.querySelector("button").id).sort().filter((item, pos, ary) => !pos || item != ary[pos - 1]);
}

var framed = document.createElement('div');

export default function rotateDeck(cb){ //Create an iframe of https://ankiweb.net/decks/ and change the deck so the cookie gets changed
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
};
