const Socket = (io, environment, streaming) => {

    const devUrl = 'http://10.3.141.250:8080';
    const prodUrl = 'https://stream-269511.appspot.com';

    return {
        connectSocket: (farmPath) => {
            var socket = io.connect(`${prodUrl}/${farmPath}`, {
                transports: ['websocket']
            });

            var socketInterval = setInterval(() => {
                console.log('Connecting...');
                socket.open();
            }, 5000);

            socket.on('connect', () => {
                console.log('Farm connected to socket!')
                clearInterval(socketInterval);
                streaming.start(socket);
                environment.tempHum.start(socket);
            });

            socket.on('disconnect', () => {
                socketInterval = setInterval(() => {
                    console.log('Connecting...');
                    socket.open();
                }, 5000);
            });
        }
    }
}