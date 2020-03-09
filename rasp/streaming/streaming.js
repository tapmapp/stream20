const RaspividJpegStream = require('raspivid-jpeg-stream');

var streaming = () => {

    var camera;

    function startStreaming(socket) {

        camera = new RaspividJpegStream({
            'width': 210,
            'height': 120,
            'timeout': 0,
            'framerate': 15,
            'bitrate': 25000000
        });

        var chunks = 15;

        return new Promise((resolve) => {
            camera.on('data', (frame) => {
    
                const image = frame.toString('base64');
                const date = new Date().getTime();
                const lengthImg = Math.ceil(image.length / chunks);
        
                for (let index = 0, p = Promise.resolve(); index < chunks; index++) {
                    p = p.then(() => new Promise(resolve => {
                        setTimeout(() => {
                            let chunk = image.substring(index * lengthImg, lengthImg * (index + 1)).trim();
                            if(index < (chunks - 1)) {
                                socket.compress(true).emit('frame', { chunk, index });
                            } else if (index === (chunks - 1)) {
                                console.log(chunk.length)
                                socket.compress(true).emit('frame', { chunk, index, date });
                            }
                            resolve();
                        }, 0);
                    }))
                }
                
                resolve();
            });
    
            
        }).catch(err => resolve());

    }

    return {
        startStreaming: (socket) => {
            startStreaming(socket);
        },
        stopStreaming: () => {
            stopStreaming();
        }
    }

};

module.exports = streaming;