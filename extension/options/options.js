chrome.storage.local.get(["interleavingTrigger"], function(result) {
	document.querySelector("#interleavingCards").value=result.interleavingTrigger;
});

document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#optionsForm').addEventListener('submit', saved);
});

function saved(e){
	e.preventDefault();
	chrome.storage.local.set({interleavingTrigger: document.querySelector('#interleavingCards').value}, function() {});
}
