var Streaming = (mobilenetModule) => {

    function start(socket) {

        console.log('Streaming connected!');

        const image = document.getElementById('image');
        const dateElem = document.getElementById('date');
        const timeElem = document.getElementById('time');
        const difference = document.getElementById('difference');

        var chunksL = 15;
        var chunks = [];
        var total = '';

        socket.on('frame', async (data) => {

            if(data.index === chunks.length) {
                chunks.push(data.index);
                total += data.chunk;
            }
    
            if(data.index === (chunksL - 1) && chunks.length === chunksL) {
                var date = new Date(data.date)
                await image.setAttribute('src', 'data:image/jpeg;base64,' + total);

                mobilenetModule.makePrediction(image);

                dateElem.innerHTML = date.getTime() / 1000;
                timeElem.innerHTML = new Date().getTime() / 1000;
                difference.innerHTML = (new Date().getTime() - date.getTime()) / 1000;
                total = '';
                chunks.length = 0;
            }
        
        });

    }

    return {
        start: (socket) => {
            start(socket);
        }
    }

};