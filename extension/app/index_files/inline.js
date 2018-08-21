require("babel-polyfill");


        var _host = "https://ankiweb.net";
        var _ihost = "https://ankiuser.net";
        study = require("study").default;

//study.initStudy();

function drawAnswer(){
	return study.drawAnswer();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#ansbuta').addEventListener('click', drawAnswer);
});

study.drawAnswerOriginal=study.drawAnswer

study.drawAnswer=function(){
study.drawAnswerOriginal();
for(let i=1; i<=4; i++){
	document.querySelector('#ease'+i).addEventListener('click', function(){
		study.answerCard(i);
	});
}
}
