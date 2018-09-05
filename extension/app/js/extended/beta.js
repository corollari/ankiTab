import study from "./monkeyPatch.js";

// AnkiConnect
 function ankiConnectInvoke(action, params={}, cb) {
	const version = 6;
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to connect to AnkiConnect'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.error) {
                    throw response.error;
                } else {
                    if (response.hasOwnProperty('result')) {
                        cb();
                    } else {
                        console.log('failed to get results from AnkiConnect');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        });
         xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({action, version, params}));
}

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

export default study;
