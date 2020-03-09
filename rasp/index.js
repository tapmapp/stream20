const RaspividJpegStream = require('raspivid-jpeg-stream')
const io = require('socket.io-client');
var sensorLib = require("node-dht-sensor");
const socket = io.connect('http://10.3.141.250:8080/1234', { reconnect: true });

var tempHumInterval;
var chunks = 15;

// TEMP / HUMIDITY PIN CONFIG
var sensor = {
    name: "Temp/Hum",
    type: 22,
    pin: 4
};

socket.on('connect', () => {

    var camera = new RaspividJpegStream({
		'width': 210,
		'height': 120,
		'timeout': 0,
		'framerate': 15,
		'bitrate': 25000000
	});

	tempHumInterval = setInterval(() => {

        let tempHumActual = sensorLib.read(sensor.type, sensor.pin);

        console.log('');
        console.log('temp: ' + tempHumActual.temperature.toFixed(1) + 'ºC');
        console.log('hum: ' + tempHumActual.humidity.toFixed(0) + '%');
        console.log('');

    }, 2000);

	return new Promise((resolve, reject) => {
		camera.on('data', function(frame) {
			const image = frame.toString('base64');
	
			const date = new Date().getTime();
			const lengthImg = Math.ceil(image.length / chunks);
	
			for (let index = 0, p = Promise.resolve(); index < chunks; index++) {
				p = p.then(_ => new Promise(resolve => {
					setTimeout(() => {
						let chunk = image.substring(index * lengthImg, lengthImg * (index + 1)).trim();
						if(index < (chunks-1)) {
							socket.emit('frame', {chunk, index});
						} else if (index === (chunks -1 )) {
							console.log(chunk.length)
							socket.emit('frame', {chunk, index, date});
						}
						resolve();
					}, 0);
				}))
			}
			
			resolve();
		});

		
	}).catch(err => resolve());
	
    

});




socket.on('disconnect', () => {
	console.log("socket disconnected");
	camera = null;
    clearInterval(tempHumInterval);
});
