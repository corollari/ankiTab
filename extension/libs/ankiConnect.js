function ankiConnectInvoke(action, params={}, cb) {
	const version = 6;
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to connect to AnkiConnect'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.error) {
                    throw response.error;
                } else {
                    if (response.hasOwnProperty('result')) {
                        cb();
                    } else {
                        console.log('failed to get results from AnkiConnect');
                    }
                }
            } catch (e) {
                console.log(e);
            }
        });
        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({action, version, params}));
}

export default ankiConnectInvoke;
