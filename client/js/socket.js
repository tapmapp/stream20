const Socket = (io, environment, streaming) => {

    return {
        connectSocket: (farmPath) => {
            var socket = io.connect(`http://localhost:8080/${farmPath}`, {
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