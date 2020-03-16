const io = require('socket.io-client');
const Streaming = require('../streaming/streaming')();
const Environment = require('../environment/environment')();

const devUrl = 'http://10.3.141.250:8080';
const prodUrl = 'wss://stream-269511.appspot.com';

const socket = () => {

    function connectSocket(farmPath) {

        var socket = io.connect(`${prodUrl}/${farmPath}`, {
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
            Streaming.startStreaming(socket);
            Environment.tempHum.start(socket);
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
            connectSocket(farmPath);
        }
    }
}

module.exports = socket;