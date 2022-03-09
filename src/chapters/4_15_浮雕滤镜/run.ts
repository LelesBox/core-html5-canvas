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
  }

  negativeButton.onclick = () => {
    if (imageCopy) {
      context.putImageData(imageCopy, 0, 0);
      imageCopy = undefined;
    } else {
      var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      copyCanvasPixels(imageData);
      var data = imageData.data;
      var length = data.length;
      var width = imageData.width;
      for(let i = 0; i <= data.length; i++) {
        /* 不是最后一行 */
        if (i < length - width * 4) {
          /* 拿到 RGB 像素点 */
          if ((i + i) % 4 !== 0) {
            /* 如果是最后一个像素 */
            if ((i + 4) % (width * 4) === 0) {
              data[i] = data[i - 4];
              data[i + 1] = data[i - 3];
              data[i + 2] = data[i - 2];
              data[i + 3] = data[i - 1];
              i += 4;
            } else {
              data[i] =  255 / 2 + 2 * data[i] - data[i + 4] - data[i + width * 4]
            }
          }
        } else if ((i + i) % 4 !== 0) {
          data[i] = data[i - width * 4];
        }
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
