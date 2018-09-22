import rotateDeck from "./extended/rotateDeck.js"
import ankiConnectInvoke from "../../libs/ankiConnect.js"

let jQuery=window.$;

let card=[];
let answers=[];
let reviewStartTime;

const cardID=0;
const cardQuestion=1;
const cardAnswer=2;
const cardIntervals=5;
const cardType=6;

function getCurrentCard(){
	return card;
}

function getCard(){
	return ankiConnectInvoke("guiCurrentCard").then(res=>{
		card=res;
		ankiConnectInvoke("getIntervals", {cards: res.cardId}).then(res=>{
			card.intervals=processIntervals(res);
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
	return html.replace(/\[sound:([^\]]*)\]/, (match, filename)=>'<audio controls><source src="'+filename+'"></audio>');
}

function buildCardHTML(css, content){
	return "<style>"+css+"</style>"+replaceAudioTags(content);
}

function renderQuestion(){
	document.querySelector("#flashcard").innerHTML=buildCardHTML(getCurrentCard().css, getCurrentCard().question);
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
	//Buttons
	document.querySelector("#answerButtons").innerHTML='';
	let intervals=getCurrentCard().intervals;
	let btnNames=["Again", "Good"]
	if(intervals.length>=3){
		btnNames.push("Easy");
	}
	if(intervals.length>=4){
		btnNames.splice(1, 0, "Hard");
	}
	btnNames.forEach((btn, i)=>{
		document.querySelector("#answerButtons").innerHTML+='<div><span class="interval">'+intervals[i]+'</span><button class="btn btn-secondary btn-lg" id="btn'+i+'">'+btn+'</button></div>';
	});
	btnNames.forEach((btn, i)=>{
		document.querySelector("#btn"+i).addEventListener('click', ()=>answerQuestion(i+1));
	});
	document.addEventListener('keyup', keyboardAnswer);
	ankiConnectInvoke("guiShowAnswer");
}

function keyboardAnswer(e){
	let num=Number(e.key);
	if(Number.isInteger(num) && num<=getCurrentCard()[cardIntervals].length && num>0){
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
	getCard().then(()=>{
		if(card==null){
			rotateDeck().then(start);
		} else {
			renderQuestion();
		}
	});
}

export default start;
