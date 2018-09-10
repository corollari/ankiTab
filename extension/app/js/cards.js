import rotateDeck from "./extended/rotateDeck.js"

let jQuery=window.$;

let cards=[];
let answers=[];
let reviewStartTime;

const cardID=0;
const cardQuestion=1;
const cardAnswer=2;
const cardIntervals=5;
const cardType=6;

function getTime(){
	return new Date().getTime();
}

function getCurrentCard(){
	return cards[0];
}

function getCards(save=false){
	return new Promise((resolve, reject)=>{
		let answersEncoded=encodeURIComponent(JSON.stringify(answers));
		let ts=getTime();
		jQuery.post("https://ankiuser.net/study/getCards", "answers="+answersEncoded+(save?"&force=true":"")+"&ts="+ts, (res)=>{
			if(!save){
				cards=res.cards;
				rotateDeck();
			}
			resolve();
		});
	});
}

function save(){
	return getCards(true);
}

function replaceAudioTags(html){
	return html.replace(/\[sound:([^\]]*)\]/, (match, filename)=>'<audio controls><source src="'+filename+'"></audio>');
}

function renderQuestion(){
	document.querySelector("#flashcard").innerHTML=replaceAudioTags(getCurrentCard()[cardQuestion]);
	//Buttons
	document.querySelector("#answerButtons").innerHTML='<button class="btn btn-primary btn-lg" id="showAnswerButton">Show Answer</button>';
	document.querySelector("#showAnswerButton").addEventListener('click', ()=>renderAnswer());
	document.querySelector("#flashcardParent").className="card card"+(getCurrentCard()[cardType]+1);
	reviewStartTime=getTime();
	document.addEventListener('keyup', keyboardShowAnswer);
}

function keyboardShowAnswer(e){
	(e.which == 32 || e.which==13) && renderAnswer();
}

function renderAnswer(){
	document.removeEventListener('keyup', keyboardShowAnswer);
	document.querySelector("#flashcard").innerHTML=replaceAudioTags(getCurrentCard()[cardAnswer]);
	//Buttons
	document.querySelector("#answerButtons").innerHTML='';
	let intervals=getCurrentCard()[cardIntervals];
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
		document.addEventListener('keyup', keyboardAnswer);
	});

}

function keyboardAnswer(e){
	let num=Number(e.key);
	if(Number.isInteger(num) && num<=getCurrentCard()[cardIntervals].length && num>0){
		answerQuestion(num);
	}
}


function answerQuestion(answer){
	document.removeEventListener('keyup', keyboardAnswer);
	answers.push([getCurrentCard()[cardID], answer, getTime()-reviewStartTime]);
	cards.shift();
	chrome.storage.local.get(["interleavingTrigger", "interleavingDisabled"], function(result) {
		if(!result.interleavingDisabled){
			while(cards.length>=Number(result.interleavingTrigger)){
				cards.pop();
			}
		}

		if(cards.length){
			save();
			renderQuestion();
		}else{
			getCards().then(renderQuestion);
		}
	});
}

function start(){
	getCards().then(renderQuestion);
}

export default start;

//TODO: Support AnkiConnect features
