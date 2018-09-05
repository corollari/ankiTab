chrome.storage.local.get(null, function(result) { //Get everything stored in chrome.storage.local
	for(s in result){
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
	settings={}
	document.querySelectorAll('input').forEach((s)=> settings[s.id]=getValue(s));
	chrome.storage.local.set(settings, function() {
		document.querySelector(".alert").style.opacity=1;
		let fade=setInterval(()=>{
			(document.querySelector(".alert").style.opacity-=0.01)>0?0:clearInterval(fade);
		}, 30);
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
