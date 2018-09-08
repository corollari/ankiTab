document.querySelectorAll(".pl-0").forEach((elem) => {
	elem.addEventListener("click", () => {
		chrome.storage.local.set({lastDeck: elem.id}, function() {});
	});
});

let decks = Array.from(document.querySelectorAll(".row.light-bottom-border")).map((el) => el.firstElementChild.firstElementChild); //Get all decks

let deckNames = {};

decks.forEach((deck) => {
	deckNames[deck.id]=deck.innerText.trim();
});

chrome.storage.local.set({deckNames: deckNames}, function() {});
