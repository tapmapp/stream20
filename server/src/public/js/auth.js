const Auth = () => {        
    
    const devUrl = 'http://10.3.141.250:8080';
    const prodUrl = 'wss://stream-269511.appspot.com';

    return {
        authenticate: (boardSerialToken, boardPassword) => {
            return fetch(`${prodUrl}/auth/connect/farm`, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({ boardSerialToken: boardSerialToken, boardPassword: boardPassword })
            });
        }
    }
}