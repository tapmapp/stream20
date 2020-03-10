const Mobilenet = async() => {

  let net;
  let model;
  
  // Load the model.
  var loadModel = async(tfModel) => {
    model = tfModel
    console.log('Loading model...')
    net = await model.load({
      architecture: 'MobileNetV1',
      outputStride: 16,
      multiplier: 1,
      quantBytes: 4
    });
  }
  
  // Make a prediction through the model on our image.
  var makePrediction = async(image, net) => {
    if(net && image) {

      // Get the activation from mobilenet from the webcam.
      await net.segmentPersonParts(image, {
        flipHorizontal: false,
        internalResolution: 'medium',
        segmentationThreshold: 0.7
      }).then(segmentation => {

        const coloredPartImage = model.toColoredPartMask(segmentation);
        const opacity = 0.7;
        const flipHorizontal = false;
        const maskBlurAmount = 0;
        const canvas = document.getElementById('canvas');
        // Draw the colored part image on top of the original image onto a canvas.
        // The colored part image will be drawn semi-transparent, with an opacity of
        // 0.7, allowing for the original image to be visible under.
        model.drawMask(
          canvas, image, coloredPartImage, opacity, maskBlurAmount,
          flipHorizontal);
              
            });
      
    }
  }

  return {
    loadModel: (model) => loadModel(model),
    makePrediction: (image) => makePrediction(image, net)
  }

}