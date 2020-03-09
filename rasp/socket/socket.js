const io = require('socket.io-client');
const Streaming = require('../streaming/streaming')();

const devUrl = 'http://10.3.141.250:8080';
const prodUrl = '';

const socket = () => {

    function connectSocket(farmPath, streaming) {

        var socket = io.connect(`${devUrl}/${farmPath}`, {
            transports: ['websocket'],
            reconnect: true
        });

        var socketInterval = setInterval(() => {
            console.log('Connecting...');
            socket.open();
        }, 5000);

        socket.on('connect', () => {
            console.log('Farm connected to socket!')
            clearInterval(socketInterval);
            streaming.startStreaming(socket);
        });

        socket.on('disconnect', () => {
            socketInterval = setInterval(() => {
                console.log('Connecting...');
                socket.open();
            }, 5000);
        });

    }

    return {
        connect: (farmPath) => {
            connectSocket(farmPath, Streaming);
        }
    }
}

module.exports = socket;