import study from "./extended/monkeyPatch.js";
import "./extended/keybindings.js";

document.querySelector("base").href="https://ankiuser.net/study/media/";

//Cookie stealing

chrome.cookies.get({"url": "https://ankiweb.net", "name": "ankiweb"}, function(cookie) {
	if(!cookie || cookie.value=="login"){
		window.location=chrome.runtime.getURL("../login/index.html")
	}else{
		chrome.cookies.set( 
		{
			url: "https://ankiuser.net",
			name: cookie.name,
			value: cookie.value,
			domain: "ankiuser.net",
			path: cookie.path,
			secure: cookie.secure,
			httpOnly: cookie.httpOnly,
		},
		()=>study.initStudy());
	}
});
