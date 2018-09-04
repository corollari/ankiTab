import study from "../modules/study.js";

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#ansbuta').addEventListener('click', study.drawAnswer.bind(study));
});

let drawAnswerOriginal=study.drawAnswer.bind(study);

study.drawAnswer=function(){
	drawAnswerOriginal();
	
	let ezButton=document.querySelector('#ease'+1);
	for(let i=1; ezButton; i++){
		ezButton.addEventListener('click', function(){
			study.answerCard(i);
		});
		ezButton=document.querySelector('#ease'+(i+1));
	}
}

export default study;
