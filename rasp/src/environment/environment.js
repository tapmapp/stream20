var sensorLib = require("node-dht-sensor");

var environment = () => {

    

}

var tempHum = () => {

    var tempHumInterval;

    function startTempHum () {
        tempHumInterval = setInterval(() => {
        
            let tempHumActual = sensorLib.read(sensor.type, sensor.pin);
    
            console.log('');
            console.log('temp: ' + tempHumActual.temperature.toFixed(1) + 'ºC');
            console.log('hum: ' + tempHumActual.humidity.toFixed(0) + '%');
            console.log('');
    
        }, 2000);
    }

    return {
        startTempHum: () => startTempHum(),
        stopTempHum: () => clearInterval(tempHumInterval)
    }

}

var lighting = () => {

};

var co2 = () => {

}

module.exports = environment;