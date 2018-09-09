import rotateDeck from "../app/js/extended/rotateDeck.js";

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
	document.querySelector('#betaEnabled').addEventListener('input', ()=>{
		chrome.permissions.request({
			origins: ["https://127.0.0.1:8765/"]
		}, function(granted) { // The callback argument will be true if the user granted the permissions.
			if (!granted) {
				document.querySelector("#betaEnabled").checked=false;
			}
		});
	});
});

function saved(e){
	e.preventDefault();
	let settings={}
	document.querySelectorAll('.save').forEach((s)=> settings[s.id]=getValue(s));
	settings.excludedDecks=[];
	deckElems.forEach((d)=>{
		if(!d.checked){
			settings.excludedDecks.push(d.id);
		}
	});
	chrome.storage.local.set(settings, function() {
		document.querySelector(".alert").style.opacity=1;
		let fade=setInterval(()=>{
			(document.querySelector(".alert").style.opacity-=0.01)>0?0:clearInterval(fade);
		}, 30);
		rotateDeck(()=>{}, false);
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
	if(elem.id=="interleavingDisabled"){
		document.querySelector("#interleavingTrigger").disabled=document.querySelector("#interleavingDisabled").checked;
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

let deckElems=[];
var framed = document.createElement('div');
$.get("https://ankiweb.net/decks/", function(data) {
	framed.innerHTML=data;
	let decks=getDecks(framed);
	for(let id in decks){
		$("#decks").append('<div class="form-check"><label class="form-check-label" for="'+id+'"><input type="checkbox" class="form-check-input" id="'+id+'" checked>'+decks[id]+'</label></div>');
		deckElems.push(document.querySelector("#"+id));
	}
	chrome.storage.local.get(["excludedDecks"], function(result) {
		result.excludedDecks.forEach((deck)=>setValue(document.querySelector("#"+deck), false));
	});
});


function getDecks(doc){ //Returns an array of deck IDs associated with the respective deck names
function getId(elem){
	return elem.firstElementChild.firstElementChild.id;
}

function getName(elem){
	return elem.firstElementChild.firstElementChild.innerText.trim();
}

function countNbsp(elem){
        return (elem.firstElementChild.firstElementChild.innerHTML.match(/&nbsp;/g) || []).length;
}

let decks = Array.from(doc.querySelectorAll(".row.light-bottom-border")); //Get all decks

let deckNames = {};

decks.sort((a,b)=> //Sort by id
        getId(a)>getId(b)
).filter((e, i, arr)=>{ //Remove parent decks
        if(!arr[i+1]){
                return true;
        }
        return countNbsp(e)>=countNbsp(arr[i+1]);
}).forEach((deck) => {
	deckNames[getId(deck)]=getName(deck);
});

return deckNames;

}
