const Coco = async() => {

  let net;
  let model;
  let status = true;

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
      /*
      await net.segmentPersonParts(image, {
        flipHorizontal: false,
        internalResolution: 'high',
        segmentationThreshold: 0.75,
        nmsRadius: 20,
        refineSteps: 10
      })
      */

      /*
      await net.segmentMultiPersonParts(image, {
        flipHorizontal: false,
        internalResolution: 'medium',
        segmentationThreshold: 0.7,
        maxDetections: 10,
        scoreThreshold: 0.2,
        nmsRadius: 20,
        minKeypointScore: 0.3,
        refineSteps: 10
      })
      */
      await net.segmentMultiPersonParts(image, {
          flipHorizontal: false,
          internalResolution: 'high',
          segmentationThreshold: 0.7,
          nmsRadius: 20,
          refineSteps: 10
      }).then(segmentation => {
  
          const coloredPartImage = model.toColoredPartMask(segmentation);
          const opacity = 0.9;
          const flipHorizontal = false;
          const maskBlurAmount = 1;
          const canvas = document.getElementById('canvas');
          const pixels = 2;

          // Draw the colored part image on top of the original image onto a canvas.
          // The colored part image will be drawn semi-transparent, with an opacity of
          // 0.7, allowing for the original image to be visible under.
          model.drawPixelatedMask(
              canvas,
              image,
              coloredPartImage,
              opacity,
              maskBlurAmount,
              flipHorizontal,
              pixels
          );
              
      });
      
    }
  }

  return {
    loadModel: (model) => loadModel(model),
    makePrediction: (image) => makePrediction(image, net)
  }

}