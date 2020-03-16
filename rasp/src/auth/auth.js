const request = require('request');
const Env = require('../env/env');

const auth = (socket) => {         

    function authenticate(boardSerialToken, boardPassword) {

        var json = { boardSerialToken, boardPassword };
        var url = `${Env.apiUrl}/auth/connect/farm`;
    
        var options = {
            url: url,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: json
        }
    
        request(options, authCallback)
    
    } 
    
    function authCallback(err, res, body) {
        if(!err && res.statusCode === 200) {
            // GET FARM CONFIG
    
            // START SOCKET
            socket.connect(Env.boardSerialToken, Env.boardPassword);

        } 
    }

    return {
        authenticate: (boardSerialToken, boardPassword) => {
            authenticate(boardSerialToken, boardPassword);
        }
    }
}

module.exports = auth;