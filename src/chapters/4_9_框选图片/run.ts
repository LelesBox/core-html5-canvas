function $<T>(selector: string) {
  return (document.querySelector(selector) as unknown) as T;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  var context = canvas.getContext("2d")!;
  console.log("hello world");
  var restButton = $<HTMLButtonElement>("#resetButton");
  var image = new Image();
  var imageData: ImageData | undefined = undefined;
  var mousedown = { x: 0, y: 0 };
  var rubberbandRectangle = { left: 0, top: 0, width: 0, height: 0 };
  var dragging = false;

  function windowToCanvas(canvas: HTMLCanvasElement, x: number, y: number) {
    var rect = canvas.getBoundingClientRect();
    return {
      x: x - rect.left,
      y: y - rect.y,
    };
  }

  function captureRubberbandPixels() {
    if (!imageData) {
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    }
  }

  function restoreRubberbandPixels() {
    if (imageData) {
      const deviceWidthOverCssPixels = imageData.width / canvas.width;
      const deviceHeightOverCssPixels = imageData.height / canvas.height;

      context.putImageData(
        imageData,
        0,
        0,
        rubberbandRectangle.left,
        rubberbandRectangle.top,
        rubberbandRectangle.width * deviceWidthOverCssPixels,
        rubberbandRectangle.height * deviceHeightOverCssPixels
      );
    }
  }

  function drawRubberband() {
    context.strokeRect(
      rubberbandRectangle.left + context.lineWidth,
      rubberbandRectangle.top + context.lineWidth,
      rubberbandRectangle.width - 2 * context.lineWidth,
      rubberbandRectangle.height - 2 * context.lineWidth
    );
  }

  function setRubberbandRectangle(x: number, y: number) {
    rubberbandRectangle.left = Math.min(x, mousedown.x);
    rubberbandRectangle.top = Math.min(y, mousedown.y);
    rubberbandRectangle.width = Math.abs(x - mousedown.x);
    rubberbandRectangle.height = Math.abs(y - mousedown.y);
  }

  function updateRubberband() {
    captureRubberbandPixels();
    drawRubberband();
  }

  function rubberbandStart(x: number, y: number) {
    mousedown.x = x;
    mousedown.y = y;
    rubberbandRectangle.left = mousedown.x;
    rubberbandRectangle.top = mousedown.y;
    dragging = true;
  }

  function rubberbandStretch(x: number, y: number) {
    if (
      rubberbandRectangle.width > 2 * context.lineWidth &&
      rubberbandRectangle.height > 2 * context.lineWidth
    ) {
      if (imageData !== undefined) {
        restoreRubberbandPixels();
      }
    }

    setRubberbandRectangle(x, y);

    if (
      rubberbandRectangle.width > 2 * context.lineWidth &&
      rubberbandRectangle.height > 2 * context.lineWidth
    ) {
      updateRubberband();
    }
  }

  function rubberbandEnd() {
    context.drawImage(
      canvas,
      rubberbandRectangle.left + context.lineWidth * 2,
      rubberbandRectangle.top + context.lineWidth * 2,
      rubberbandRectangle.width - 4 * context.lineWidth,
      rubberbandRectangle.height - 4 * context.lineWidth,
      0,
      0,
      canvas.width,
      canvas.height
    );
    dragging = false;
    imageData = undefined;
  }

  canvas.onmousedown = (e) => {
    var loc = windowToCanvas(canvas, e.clientX, e.clientY);
    e.preventDefault();
    rubberbandStart(loc.x, loc.y);
  };

  canvas.onmousemove = (e) => {
    var loc;
    if (dragging) {
      loc = windowToCanvas(canvas, e.clientX, e.clientY);
      rubberbandStretch(loc.x, loc.y);
    }
  };

  canvas.onmouseup = (e) => {
    rubberbandEnd();
  };

  image.src =
    "https://raw.githubusercontent.com/corehtml5canvas/code/master/ch04/example-4.1/countrypath.jpg";
  image.crossOrigin = "Anonymous";
  image.onload = () => {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  restButton.onclick = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
  };

  context.strokeStyle = "navy";
  context.lineWidth = 1.0;
}
