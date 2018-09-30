import startStudy from "./cards.js";
document.querySelector("base").href="/";
startStudy();
document.querySelector("#optionsBtn>a").href=chrome.runtime.getURL("options/index.html");
