require("babel-polyfill");

let links=["firefox", "https://github.com/corollari/ankiTab", "chrome"];


        var _host = "https://ankiweb.net";
        var _ihost = "https://ankiuser.net";
        study = require("study").default;

function drawAnswer(){
	return study.drawAnswer();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('#ansbuta').addEventListener('click', drawAnswer);
});

study.drawAnswerOriginal=study.drawAnswer

study.drawAnswer=function(){
study.drawAnswerOriginal();
for(let i=1; i<=3; i++){
	document.querySelector('#ease'+i).addEventListener('click', function(){
		window.location=links[i-1];
	});
}
}
