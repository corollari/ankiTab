import rotateDeck from "../app/js/extended/rotateDeck.js";
import ankiConnectInvoke from "../libs/ankiConnect.js"

chrome.storage.local.get(null, function(result) { //Get everything stored in chrome.storage.local
	for(let s in result){
		let elem=document.querySelector('#'+s);
		if(elem){
			setValue(elem, result[s]);
		}
	}
});

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#optionsForm').addEventListener('submit', saved);
	document.querySelector('#interleavingDisabled').addEventListener('input', ()=>{
		document.querySelector("#interleavingTrigger").disabled=document.querySelector("#interleavingDisabled").checked;
	});
  document.querySelector('#tickall').addEventListener('click', (e)=>tickAll(true, e));
  document.querySelector('#untickall').addEventListener('click', (e)=>tickAll(false, e));
});

function tickAll(value, e){
  document.querySelectorAll(".deck").forEach((elem)=>elem.checked=value);
  e.preventDefault();
}

function saved(e){
	e.preventDefault();
	let settings={}
	document.querySelectorAll('.save').forEach((s)=> settings[s.id]=getValue(s));
	settings.excludedDecks=[];
	document.querySelectorAll('.deck').forEach((d)=>{
		if(!d.checked){
			settings.excludedDecks.push(d.id);
		}
	});
	chrome.storage.local.set(settings, function() {
		document.querySelector(".alert").style.opacity=1;
		let fade=setInterval(()=>{
			(document.querySelector(".alert").style.opacity-=0.01)>0?0:clearInterval(fade);
		}, 30);
		rotateDeck(false);
	});
}

function setValue(elem, val){
	switch(elem.type){
		case "checkbox":
			elem.checked=val;
			break;
		default:
			elem.value=val;
	}
}

function getValue(elem){
	switch(elem.type){
		case "checkbox":
			return elem.checked;
		default:
			return elem.value;
	}
}

ankiConnectInvoke("deckNames").then((decks)=>{
	chrome.storage.local.get(["excludedDecks"], function(result) {
		decks.sort().forEach((d)=>{
			let name=d.split("::").map((d, i, a)=>i==a.length-1?d:"&nbsp;&nbsp;&nbsp;").join('');
			document.querySelector("#decks").innerHTML+=('<div class="form-check"><label class="form-check-label" for="'+d+'"><input type="checkbox" class="form-check-input deck" id="'+d+'" ' + (result.excludedDecks.indexOf(d)==-1?'checked':'') +'> '+name+'</label></div>');
		});
	});
});
