function $<T>(selector: string) {
  return document.querySelector(selector) as unknown as T;;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  console.log('hello world')

  var image = new Image();
  var imageCopy: ImageData | undefined = undefined;
  var negativeButton = $<HTMLButtonElement>('#negativeButton');

  function copyCanvasPixels(imageData: ImageData) {
    imageCopy = context.createImageData(canvas.width, canvas.height)
    var i = 0;
    for (i = 0; i < imageData.data.length; i++) {
      imageCopy.data[i] = imageData.data[i];
    }
    // for (i = 0; i < 3; i++) {
    //   imageCopy.data[i] = imageData.data[i];
    // }
    // imageCopy.data[3] = imageData.data[3] / 2;
    // for (i = 4; i < imageData.data.length; i += 4) {
    //   imageCopy.data[i] = imageData.data[i]
    //   imageCopy.data[i + 1] = imageData.data[i + 1]
    //   imageCopy.data[i + 2] = imageData.data[i + 2]
    //   imageCopy.data[i + 3] = imageData.data[i + 3] / 2
    // }
  }

  negativeButton.onclick = () => {
    if (imageCopy) {
      context.putImageData(imageCopy, 0, 0);
      imageCopy = undefined;
    } else {
      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      copyCanvasPixels(imageData);
      var data = imageData.data;
      for(let i = 0; i <= data.length - 4; i+=4) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] =  255 - data[i + 2];
      }
      context.putImageData(imageData, 0, 0);
    }
  }

  image.src = 'https://raw.githubusercontent.com/corehtml5canvas/code/master/ch04/example-4.1/countrypath.jpg';
  image.crossOrigin = "Anonymous";
  image.onload = () => {
    context.drawImage(image, 0, 0, image.width, image.height, 0, 0, context.canvas.width, context.canvas.height)
  }
}
