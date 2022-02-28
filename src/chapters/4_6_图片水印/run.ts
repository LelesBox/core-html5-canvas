function $<T>(selector: string) {
  return (document.querySelector(selector) as unknown) as T;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  var context = canvas.getContext("2d")!;
  var offscreenCanvas = document.createElement("canvas");
  var offscreenContext = offscreenCanvas.getContext("2d")!;

  const image = new Image();
  let scale = 1.0;
  const scaleSlider = $<HTMLInputElement>("#scaleSlider");
  const scaleOutput = $<HTMLElement>("#scaleOutput")!;
  const MINIMUM_SCALE = 1.0;
  const MAXIMUM_SCALE = 3.0;
  // image.src =
  //   "https://raw.githubusercontent.com/corehtml5canvas/code/master/ch04/example-4.1/countrypath.jpg";
  // image.onload = () => {
  //   drawImage();
  // };

  function drawScaled() {
    var w = canvas.width,
      h = canvas.height,
      sw = w * scale,
      sh = h * scale;

    context.clearRect(0, 0, w, h);
    context.drawImage(
      offscreenCanvas,
      0,
      0,
      offscreenCanvas.width,
      offscreenCanvas.height,
      -sw / 2 + w / 2,
      -sh / 2 + h / 2,
      sw,
      sh
    );
  }

  function drawWatermark(context: CanvasRenderingContext2D) {
    var lineOne = "Copyright",
      lineTwo = "Acme Inc.",
      textMetric,
      FONT_HEIGHT = 128;
    context.save();
    context.fillStyle = "cornflowerblue";
    context.strokeStyle = "yellow";
    context.shadowColor = "rgba(50, 50, 50, 1.0)";
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
    context.font = FONT_HEIGHT + "px Arial";
    textMetric = context.measureText(lineOne);
    context.globalAlpha = 0.6;
    context.translate(canvas.width / 2, canvas.height / 2 - FONT_HEIGHT / 2);
    context.fillText(lineOne, -textMetric.width / 2, 0);
    context.strokeText(lineOne, -textMetric.width / 2, 0);

    textMetric = context.measureText(lineTwo);
    context.fillText(lineTwo, -textMetric.width / 2, FONT_HEIGHT);
    context.strokeText(lineTwo, -textMetric.width / 2, FONT_HEIGHT);
    context.restore();
  }

  // function drawImage() {
  //   const w = canvas.width;
  //   const h = canvas.height;
  //   const sw = w * scale;
  //   const sh = h * scale;
  //   context.clearRect(0, 0, w, h);
  //   context.drawImage(image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
  // }

  function drawScaleText(value: string) {
    const text = parseFloat(value).toFixed(2);
    let percent =
      (parseFloat(value) - MINIMUM_SCALE) / (MAXIMUM_SCALE - MINIMUM_SCALE);
    scaleOutput.innerText = text;
    percent = percent < 0.35 ? 0.35 : percent;
    scaleOutput.style.fontSize = (percent * MAXIMUM_SCALE) / 1.5 + "em";
  }

  scaleSlider.onchange = (e: any) => {
    scale = Number(e.target.value);
    if (scale < MINIMUM_SCALE) {
      scale = MINIMUM_SCALE;
    } else if (scale > MAXIMUM_SCALE) {
      scale = MAXIMUM_SCALE;
    }
    drawScaled();
    drawScaleText(scale.toString());
  };

  offscreenCanvas.width = canvas.width;
  offscreenCanvas.height = canvas.height;
  image.src =
    "https://raw.githubusercontent.com/corehtml5canvas/code/master/ch04/example-4.1/countrypath.jpg";
  image.onload = () => {
    context.drawImage(image, 0, 0, canvas.width, canvas.height);
    offscreenContext.drawImage(image, 0, 0, canvas.width, canvas.height);
    drawWatermark(context);
    drawWatermark(offscreenContext);
    drawScaleText(scaleSlider.value);
  };
}
