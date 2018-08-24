require("babel-polyfill");

let links=["https://addons.mozilla.org/en-US/firefox/addon/ankitab/", "https://github.com/corollari/ankiTab", "https://chrome.google.com/webstore/detail/ankitab/ihoaepdiibjbifnhcjoaddgcnfgjmjdk"];


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
	let a=document.createElement('a');
	a.href=links[i-1];
	document.querySelector('#ease'+i).parentElement.appendChild(a);
	a.appendChild(document.querySelector('#ease'+i));
}
}
