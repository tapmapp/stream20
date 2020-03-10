var sensorLib = require("node-dht-sensor");

var environment = () => {

    return {
        tempHum: tempHum(),
        lighting: lighting(),
        co2: co2()
    }

}

var tempHum = () => {

    var tempHumInterval;
    var sensor = {
        name: 'Temp/Hum',
        type: 22,
        pin: 4
    }

    function start (socket) {
        tempHumInterval = setInterval(() => {
        
            let tempHumActual = sensorLib.read(sensor.type, sensor.pin);
    
            console.log('');
            console.log('temp: ' + tempHumActual.temperature.toFixed(1) + 'ºC');
            console.log('hum: ' + tempHumActual.humidity.toFixed(0) + '%');
            console.log('');
    
            socket.emit('environment', { 
                temperature: tempHumActual.temperature.toFixed(1), 
                humidity: tempHumActual.humidity.toFixed(0) 
            });

        }, 2000);
    }

    return {
        start: (socket) => start(socket),
        stop: () => clearInterval(tempHumInterval)
    }

}

var lighting = () => {

};

var co2 = () => {

}

module.exports = environment;