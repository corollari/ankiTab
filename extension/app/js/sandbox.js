window.addEventListener('message', function(event) {
    switch(event.data.command) {
    case 'render':
        var html = event.data.html;
        document.body.querySelector(".card").innerHTML = html;
        break;
    }
})
