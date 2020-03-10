var request = require('request');

const auth = (socket) => {         

    var boardSerialToken;
    var boardPassword;
    
    function authenticate(boardSerialTokenv, boardPasswordv) {

        boardSerialToken = boardSerialTokenv;
        boardPassword = boardPasswordv;

        var json = { boardSerialToken, boardPassword };
        console.log(json)
        var url = 'http://10.3.141.250:8080/auth/connect/farm';
    
        var options = {
            url: url,
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            json: json
        }
    
        request(options, authCallback)
    
    } 
    
    function authCallback(err, res, body) {
        if(!err && res.statusCode === 200){
            // GET FARM CONFIG
    
            // START SOCKET
            console.log(boardSerialToken, boardPassword)
            socket.connect(boardSerialToken, boardPassword);

        } 
    }

    return {
        authenticate: (boardSerialToken, boardPassword) => {
            authenticate(boardSerialToken, boardPassword);
        }
    }
}

module.exports = auth;