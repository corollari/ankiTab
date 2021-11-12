import startStudy from "./cards.js";
import ankiConnectInvoke from "../../../libs/ankiConnect.js"
document.querySelector("base").href="/";
startStudy();
document.querySelector("#optionsBtn>a").href=chrome.runtime.getURL("options/index.html");
document.querySelector("#optionsBtn>#syncBtn").addEventListener("click", ()=>ankiConnectInvoke("sync"));

// Dark mode----
const btn = document.querySelector("#darkmodeEnabled");

const currentTheme = localStorage.getItem("theme");
if (currentTheme == "dark") {
  document.body.classList.add("dark-theme");
  document.querySelector("#flashcardSandbox").contentWindow.postMessage({
		'command': 'toggle-dark-theme'
	}, '*');
}

btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-theme");
  document.querySelector("#flashcardSandbox").contentWindow.postMessage({
		'command': 'toggle-dark-theme'
	}, '*');
  
  let theme = "light";
  if (document.body.classList.contains("dark-theme")) {
    theme = "dark";
  }
  localStorage.setItem("theme", theme);
});
// ----Dark mode

window.onbeforeunload=()=>{
	ankiConnectInvoke("guiDeckBrowser")
};
