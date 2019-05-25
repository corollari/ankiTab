import startStudy from "./cards.js";
import ankiConnectInvoke from "../../../libs/ankiConnect.js"
document.querySelector("base").href="/";
startStudy();
document.querySelector("#optionsBtn>a").href=chrome.runtime.getURL("options/index.html");
document.querySelector("#optionsBtn>#syncBtn").addEventListener("click", ()=>ankiConnectInvoke("sync"));
window.onbeforeunload=()=>{
	ankiConnectInvoke("guiDeckBrowser")
};
