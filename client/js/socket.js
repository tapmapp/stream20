const socket = (io, mobilenet) => {

    function startStreaming(socket) {

        console.log('Streaming Started!');

        const image = document.getElementById('image');
        const dateElem = document.getElementById('date');
        const timeElem = document.getElementById('time');
        const difference = document.getElementById('difference');

        var chunksL = 15;
        var chunks = [];
        var total = '';

        socket.on('frame', (data) => {

            if(data.index === chunks.length) {
                chunks.push(data.index);
                total += data.chunk;
            }
    
            if(data.index === (chunksL - 1) && chunks.length === chunksL) {
                var date = new Date(data.date)
                image.setAttribute('src', 'data:image/jpeg;base64,' + total);

                mobilenet.makePrediction(image);

                dateElem.innerHTML = date.getTime() / 1000;
                timeElem.innerHTML = new Date().getTime() / 1000;
                difference.innerHTML = (new Date().getTime() - date.getTime()) / 1000;
                total = '';
                chunks.length = 0;
            }
        
        });

    }

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
                startStreaming(socket);
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