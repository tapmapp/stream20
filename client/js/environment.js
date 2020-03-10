var Environment = () => {

    var tempHum = () => {

        var temperature = document.getElementById('temperature');
        var humidity = document.getElementById('humidity');
    
        function start (socket) {
            
            socket.on('environment', data => {
                temperature.innerHTML = `${data.temperature}&#8451;`;
                humidity.innerHTML = `${data.humidity}%`;
            });
        }
    
        return {
            start: (socket) => start(socket),
            stop: () => clearInterval(tempHumInterval)
        }
    
    }

    var lighting = () => {}
    
    var co2 = () => {}

    return {
        tempHum: tempHum(),
        lighting: lighting(),
        co2: co2()
    }

}