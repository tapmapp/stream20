const auth = () => {            
    return {
        authenticate: (boardSerialToken, boardPassword) => {
            return fetch('http://localhost:8080/auth/connect/farm', {
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