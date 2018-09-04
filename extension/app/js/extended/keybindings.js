import study from "./monkeyPatch.js";

$(document).keyup(function(e) {
	(e.which == 32 || e.which==13) && study.drawAnswer();
});
