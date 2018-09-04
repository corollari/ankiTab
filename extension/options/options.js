chrome.storage.local.get(null, function(result) { //Get everything stored in chrome.storage.local
	for(s in result){
		let elem=document.querySelector('#'+s);
		if(elem){
			elem.value=result[s];
		}
	}
});

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#optionsForm').addEventListener('submit', saved);
});

function saved(e){
	e.preventDefault();
	settings={}
	document.querySelectorAll('input').forEach((s)=> settings[s.id]=s.value);
	chrome.storage.local.set(settings, function() {
		document.querySelector(".alert").style.opacity=1;
		let fade=setInterval(()=>{
			(document.querySelector(".alert").style.opacity-=0.01)?0:clearInterval(fade);
		}, 30);
	});
}
