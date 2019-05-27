window.addEventListener('message', function(event) {
    switch(event.data.command) {
    case 'render':
        var html = event.data.html;
        document.body.querySelector(".card").innerHTML = html;
        // Reload the entire document so that script tags are run.
        var outerHTML = document.documentElement.outerHTML;
        document.open();
        document.write(outerHTML);
        document.close();
        break;
    }
})
