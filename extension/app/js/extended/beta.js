import ankiConnectInvoke from "../../../libs/ankiConnect.js";

chrome.storage.local.get(["betaEnabled"], function(result) {
	if(result.betaEnabled){
		let _getButtonsOriginal=study._getButtons.bind(study);
		study._getButtons=()=>{
			let buts=_getButtonsOriginal();
			buts.push([buts.length+1, "Suspend", "Never"]);
			return buts;
		};

		let answerCardOriginal=study.answerCard.bind(study);
		study.answerCard=(n)=>{
			if ("answerShown" === study.state) {
			if(n>study.currentCard[study.CINTS].length){
				study.state = "initial";
				ankiConnectInvoke('suspend', {
					"cards": [study.currentCard[0]]
				}, ()=>{
					ankiConnectInvoke('sync', {}, ()=>{});
					study.currentCard = null;
					study.checkForNextCard();
				});
			}else{
				answerCardOriginal(n);
			}
			}
		};
	}
});
