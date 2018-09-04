import study from "../csp/inline.js";

let answerCardOriginal=study.answerCard.bind(study);

study.answerCard=function(n){

	chrome.storage.local.get(["interleavingTrigger"], function(result) {
		while(study.deck.cards.length>=Number(result.interleavingTrigger)){
			study.deck.cards.pop();
		}
		answerCardOriginal(n);
		study.save();
	});

}

export default study;
