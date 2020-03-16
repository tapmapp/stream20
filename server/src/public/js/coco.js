const CocoModule = async() => {

    let net;
    let model;
    let status = true;

    // Load the model.
    var loadModel = async(tfModel) => {

        model = tfModel
        
        console.log('Loading model...')
        net = await model.load();

    }

    // Make a prediction through the model on our image.
    var makePrediction = async(image, net) => {

        if(net && image && status) {
            
            status= false;
        
            setTimeout(() => {

                net.detect(image).then(result => {
                    
                    const c = document.getElementById('canvas');
                    const context = c.getContext('2d');
                    
                    context.drawImage(image, 0, 0);
                    context.font = '10px Arial';
                    
                    for (let i = 0; i < result.length; i++) {
                        context.beginPath();
                        context.rect(...result[i].bbox);
                        context.lineWidth = 1;
                        context.strokeStyle = 'green';
                        context.fillStyle = 'green';
                        context.stroke();
                        context.fillText(
                            result[i].score.toFixed(3) + ' ' + result[i].class, result[i].bbox[0],
                            result[i].bbox[1] > 10 ? result[i].bbox[1] - 5 : 10);
                    }

                });

                status= true;
        },0)
        
        }
    }

    return {
        loadModel: (model) => loadModel(model),
        makePrediction: (image) => makePrediction(image, net)
    }

}