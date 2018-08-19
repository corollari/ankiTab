(function() {

  var wrapWords = function(text, before, after, join) {
    var join = join || '';
    var words = text.split('');
    for(var i=0;i<words.length;i++) {
      words[i] = before + words[i] + after;
    }
    return words.join(join);
  };

  var wrapWordsInChildElement = function(el) {
    if(el.nodeName == '#text') {
      var words = el.textContent.split('');
      for(var i=0;i<words.length;i++) {
        if(words[i].length > 0) {
          var span = document.createElement('span');
          span.className = "js-detect-wrap";
          span.innerText = words[i];
          el.parentNode.insertBefore(span, el);
        }
      };
      el.parentNode.removeChild(el);
    }
    else {
      if(el.innerText){
        el.innerHTML = wrapWords(el.innerText,'<span class="js-detect-wrap">','</span>');
      }
    }
  };

  var wrapWordsInElement = function(el) {
    if(!el.firstChild) {
      wrapWordsInChildElement(el);
    }
    else {
      var siblings = [];
      var s = el.firstChild;
      do {
        siblings.push(s);
      }
      while(s = s.nextSibling);

      for(var i=0;i<siblings.length;i++) {
        wrapWordsInElement(siblings[i]);
      }
    };
  }

  var getLines = function(el) {

    wrapWordsInElement(el);

    var spans = el.getElementsByClassName('js-detect-wrap');

    var lastOffset = 0, line=[], lines = [], l=0;
    for(var i=0;i<spans.length;i++) {
      var offset = spans[i].offsetTop+spans[i].getBoundingClientRect().height;
      if(offset == lastOffset) {
        line.push(spans[i]);
      }
      else {
        if(line.length > 0) lines[l++] = line;

        line = [spans[i]];
      }
      lastOffset = offset;
    }
    lines.push(line);
    return lines;
  }

  var detector = {
      wrapWords: wrapWords
    , wrapWordsInElement: wrapWordsInElement
    , wrapWordsInChildElement: wrapWordsInChildElement
    , getLines: getLines
  };

  if(typeof define == 'function') {
    define(function() {
      return detector; 
    });
  }
  else {
    window.lineWrapDetector = detector;
  }

})();

const GRADIENT_LENGTH_PERCENTAGE = 0.5;

var ps = document.getElementsByTagName('p');
for(let i=0; i<ps.length; i++){
	var p = ps[i];
	var lines = lineWrapDetector.getLines(p);
	for(let j=0; j<lines.length; j++){
		let line = lines[j];
		let red = 0, blue = 0, green = 0;
		for(let k=0; k<line.length; k++){
			switch(j%4){
				case 0: //Blue ending
					blue = k>(line.length-1)*GRADIENT_LENGTH_PERCENTAGE ? getGradient(k, line.length) : 0;
					break;
				case 1: //Blue beginning
					blue = k<(line.length-1)*GRADIENT_LENGTH_PERCENTAGE ? getGradient(k, line.length) : 0;
					break;
				case 2: //Red ending
					red = k>(line.length-1)*GRADIENT_LENGTH_PERCENTAGE ? getGradient(k, line.length) : 0;
					break;
				case 3: //Red beginning
					red = k<(line.length-1)*GRADIENT_LENGTH_PERCENTAGE ? getGradient(k, line.length) : 0;
					break;
			}
			line[k].style.color="rgb("+red+","+green+","+blue+")";
		}
	}
}

function getGradient(k, len){
	return Math.round(Math.abs(255*(((k/(len-1))-GRADIENT_LENGTH_PERCENTAGE)/GRADIENT_LENGTH_PERCENTAGE)));
}
