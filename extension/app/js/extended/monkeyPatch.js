import study from "../csp/inline.js";

let answerCardOriginal=study.answerCard.bind(study);

study.answerCard=function(n){

	chrome.storage.local.get(["interleavingTrigger", "interleavingDisabled"], function(result) {
		if(!result.interleavingDisabled){
			while(study.deck.cards.length>=Number(result.interleavingTrigger)){
				study.deck.cards.pop();
			}
		}
		answerCardOriginal(n);
		study.save();
	});

}

export default study;
