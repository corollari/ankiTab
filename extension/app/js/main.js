import startStudy from "./cards.js";
import ankiConnectInvoke from "../../../libs/ankiConnect.js"
document.querySelector("base").href="/";
startStudy();
document.querySelector("#optionsBtn>a").href=chrome.runtime.getURL("options/index.html");
window.onbeforeunload=()=>{
	ankiConnectInvoke("guiDeckBrowser")
};
