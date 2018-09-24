function ankiConnectInvoke(action, params={}) {
	const version = 6;
	return new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('error', () => reject('failed to connect to AnkiConnect'));
        xhr.addEventListener('load', () => {
            try {
                const response = JSON.parse(xhr.responseText);
                if (response.error) {
                    throw response.error;
                } else {
                    if (response.hasOwnProperty('result')) {
                        resolve(response.result);
                    } else {
                        console.log('failed to get results from AnkiConnect');
                    }
                }
            } catch (e) {
                console.error(e);
                reject(e);
            }
        });
        xhr.open('POST', 'http://127.0.0.1:8765');
        xhr.send(JSON.stringify({action, version, params}));
	});
}

export default ankiConnectInvoke;
