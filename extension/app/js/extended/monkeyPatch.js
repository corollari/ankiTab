import study from "../csp/inline.js";

let answerCardOriginal=study.answerCard.bind(study);

study.answerCard=function(n){
	answerCardOriginal(n);
	study.save();
}

let getNextCardOriginal=study.getNextCard.bind(study);

study.getNextCard=function(){
	getNextCardOriginal();
	chrome.storage.local.get(["interleavingTrigger", "interleavingDisabled"], function(result) {
		if(!result.interleavingDisabled){
			while(study.deck.cards.length>=Number(result.interleavingTrigger)){
				study.deck.cards.pop();
			}
		}
	});
}

export default study;
