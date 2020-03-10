const Mobilenet = async() => {

  let net;
  let status = true;
  let model;
  // Pass the intermediate activation to the classifier.
  console.log('Loading mobilenet..');




  // Load the model.
  var loadModel = async() => {
    console.log('Loading model...')
    net = await mobilenet.load().then(loadedModel => {
      model = loadedModel
    });
    
    console.log('Successfully loaded model');
  }
  
  // Make a prediction through the model on our image.
  var makePrediction = async(image) => {
    if(model && status) {
      status = false;
      // Get the activation from mobilenet from the webcam.
      model.classify(image).then(predictions => {
        console.log(predictions)
        status = true;
      });
      
    }
  }

  return {
    loadModel: () => loadModel(),
    makePrediction: (image) => makePrediction(image)
  }

}