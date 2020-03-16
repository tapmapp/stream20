const Env = (() => {

    const boardSerialToken = '1234';
    const boardPassword = 'password';

    if(process.argv[2] === '--prod') {
        return {
            boardSerialToken: boardSerialToken,
            boardPassword: boardPassword,
            apiUrl: 'https://stream-269511.appspot.com',
            socketUrl: 'wss://stream-269511.appspot.com',
            mongoDB: ''
        }
    }

    if(process.argv[2] === '--dev') {
        return {
            boardSerialToken: boardSerialToken,
            boardPassword: boardPassword,
            apiUrl: 'http://10.3.141.250:8080',
            socketUrl: 'ws://10.3.141.250:8080',
            mongoDB: ''
        }
    }
})();

module.exports = Env;