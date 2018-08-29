document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('form').addEventListener('submit', login);
});

function login(e){
	e.preventDefault();
	request+="username="+$("#email").val()+'&'
	request+="password="+$("#password").val()
	$.post("https://ankiweb.net/account/login", request, (res)=>{
		ifr.innerHTML=res
		if(ifr.querySelectorAll("title")[0].firstChild.nodeValue.includes("Decks")){
			window.location=chrome.runtime.getURL("../app/index.html")
		}
		else{
			alert("Sorry, no account was found with that email address. Please check your spelling and try again.")
			setup()
		}
	})
}

let request=""
function setup(){
request=""

ifr=document.createElement("div")
$.get("https://ankiweb.net/account/login", (html)=>{
	ifr.innerHTML=html
	ifr.querySelectorAll("form>input").forEach((i)=>request+=i.name+'='+i.value+'&')
})
}
setup()
