import rotateDeck from "./extended/rotateDeck.js"
import MIME from "./mimeTypes.js"
import ankiConnectInvoke from "../../libs/ankiConnect.js"

let jQuery=window.$;

let card;

function getCurrentCard(){
	return card;
}

function getCard(){
	return ankiConnectInvoke("guiCurrentCard")
		.then(res=>{
			card=res;
			/*ankiConnectInvoke("getIntervals", {cards: [res.cardId], complete:true}).then(res=>{
				card.intervals=processIntervals(res);
			});*/
		}, (e)=>{
			return new Promise((resolve, reject)=>{
				chrome.storage.local.get(["lastDeck", "emptyDecks"], function(result) {
					result.emptyDecks.push({name: result.lastDeck, date:new Date()});
					chrome.storage.local.set({emptyDecks: result.emptyDecks}, ()=>
						rotateDeck().then(getCard).then(resolve)
					);
				});
			});
		});
}

function processIntervals(interv){
	return interv.map((u)=>{
		if(u<=0)
			return -u+'s';
		else
			return u+'d';
	});
}

function replaceAudioTags(html){
	return html.replace(/\[sound:([^\]]*)\]/, (match, filename)=>{
		let mediaType="audio"
		if(MIME['.'+filename.split('.').pop()].split('/')[0]=="video")
			mediaType="video"
		return '<'+mediaType+' controls src="'+filename+'"></'+mediaType+'>'
	});
}

function buildCardHTML(css, content){
	return "<style>"+css+"</style>"+replaceAudioTags(content);
}

function retrieveMedia(){
	document.querySelector("#flashcard").querySelectorAll("[src]").forEach((elem)=>{
		let filename=elem.src.split('/').pop()
		let fileExtension='.'+filename.split('.').pop()
		ankiConnectInvoke("retrieveMediaFile", {filename:decodeURIComponent(filename)}).then((data)=>
			elem.src="data:"+MIME[fileExtension]+";base64,"+data
		)
	});
}


function renderQuestion(){
	document.querySelector("#flashcard").innerHTML=buildCardHTML(getCurrentCard().css, getCurrentCard().question);
	retrieveMedia();
	document.querySelector("#deckName").innerText=getCurrentCard().deckName;
	//Buttons
	document.querySelector("#answerButtons").innerHTML='<button class="btn btn-primary btn-lg" id="showAnswerButton">Show Answer</button>';
	document.querySelector("#showAnswerButton").addEventListener('click', ()=>renderAnswer());
	//document.querySelector("#flashcardParent").className="card card"+(getCurrentCard()[cardType]+1);
	//reviewStartTime=getTime();
	document.addEventListener('keyup', keyboardShowAnswer);
}

function keyboardShowAnswer(e){
	(e.which == 32 || e.which==13) && renderAnswer();
}

function renderAnswer(){
	document.removeEventListener('keyup', keyboardShowAnswer);
	document.querySelector("#flashcard").innerHTML=buildCardHTML(getCurrentCard().css, getCurrentCard().answer);
	retrieveMedia();
	//Buttons
	document.querySelector("#answerButtons").innerHTML='';
	let intervals=getCurrentCard().buttons;
	let btnNames=["Again", "Good"]
	if(intervals.length>=3){
		btnNames.push("Easy");
	}
	if(intervals.length>=4){
		btnNames.splice(1, 0, "Hard");
	}
	btnNames.forEach((btn, i)=>{
		document.querySelector("#answerButtons").innerHTML+='<div><span class="interval"></span><button class="btn btn-secondary btn-lg" id="btn'+i+'">'+btn+'</button></div>';
	});
	btnNames.forEach((btn, i)=>{
		document.querySelector("#btn"+i).addEventListener('click', ()=>answerQuestion(i+1));
	});
	document.addEventListener('keyup', keyboardAnswer);
	ankiConnectInvoke("guiShowAnswer");
}

function keyboardAnswer(e){
	let num=Number(e.key);
	if(Number.isInteger(num) && num<=getCurrentCard().buttons.length && num>0){
		answerQuestion(num);
	}
}


function answerQuestion(answer){
	document.removeEventListener('keyup', keyboardAnswer);
	ankiConnectInvoke("guiAnswerCard", {ease:answer}).then(()=>{
		rotateDeck().then(getCard).then(renderQuestion);
	});
}

function start(){
	rotateDeck().then(getCard).then(renderQuestion);
}

export default start;
