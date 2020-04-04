window.addEventListener('message', async function(event) {
    switch(event.data.command) {
    case 'render':
        window.mutex = new Promise((resolve, reject)=>{
          var html = event.data.html;
          document.body.querySelector(".flashcard").innerHTML = html;
          // Run scripts (setting innerHTML doesn't run any)
          var scripts = Array.prototype.slice.call(document.body.querySelector(".flashcard").getElementsByTagName("script"));
          for (var i = 0; i < scripts.length; i++) {
            if (scripts[i].src != "") {
              var tag = document.createElement("script");
              tag.src = scripts[i].src;
              document.getElementsByTagName("head")[0].appendChild(tag);
            }
            else {
              eval(scripts[i].innerHTML);
            }
          }
          resolve();
          typeset();
        });
        break;
    case 'replaceMedia':
        await window.mutex;
        document.querySelectorAll(`[src="${event.data.oldSrc}"]`).forEach(async (elem)=>{
          console.log(elem);
          elem.src = event.data.newSrc
        });
    }
})

function typeset(){
  try{
    MathJax.Hub.Typeset();
  } catch(e){
    setTimeout(typeset, 300);
  }
}
