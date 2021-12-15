function $<T>(selector: string) {
  return document.querySelector(selector) as unknown as T;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  var context = canvas.getContext("2d")!;
  // const scaleCheckbox = $<HTMLInputElement>("#scale")!;
  console.log("hello world");
  const image = new Image();
  let scale = 1.0;
  const scaleSlider = $<HTMLInputElement>("#scaleSlider");
  const scaleOutput = $<HTMLElement>('#scaleOutput')!;
  const MINIMUM_SCALE = 1.0;
  const MAXIMUM_SCALE = 3.0;
  image.src =
    "https://raw.githubusercontent.com/corehtml5canvas/code/master/ch04/example-4.1/countrypath.jpg";
  image.onload = () => {
    drawImage();
  };

  // scaleCheckbox.onchange = () => {
  //   drawImage();
  // };

  // function drawImage() {
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  //   if (scaleCheckbox.checked) {
  //     context.drawImage(image, 0, 0, canvas.width, canvas.height);
  //   } else {
  //     context.drawImage(image, 0, 0);
  //   }
  // }

  function drawImage() {
    const w = canvas.width;
    const h = canvas.height;
    const sw = w * scale;
    const sh = h * scale;
    context.clearRect(0, 0, w, h);
    context.drawImage(image, -sw / 2 + w / 2, -sh / 2 + h / 2, sw, sh);
  }

  function drawScaleText(value: string) {
    const text = parseFloat(value).toFixed(2);
    let percent =
      (parseFloat(value) - MINIMUM_SCALE) / (MAXIMUM_SCALE - MINIMUM_SCALE);
    scaleOutput.innerText = text;
    percent = percent < 0.35 ? 0.35 : percent;
    scaleOutput.style.fontSize = percent * MAXIMUM_SCALE / 1.5 + 'em';
  }

  scaleSlider.onchange = (e: any) => {
    scale = Number(e.target.value);
    if (scale < MINIMUM_SCALE) {
      scale = MINIMUM_SCALE
    } else if (scale > MAXIMUM_SCALE) {
      scale = MAXIMUM_SCALE;
    }
    drawScaleText(scale.toString());
    drawImage();
  }

  context.fillStyle = 'cornflowerblue';
  context.strokeStyle = 'yellow';
  context.shadowColor = 'rgba(50, 50, 50, 1.0)';
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 10;
  image.src =
    "https://raw.githubusercontent.com/corehtml5canvas/code/master/ch04/example-4.1/countrypath.jpg";
  image.onload = () => {
    drawImage();
    drawScaleText(scaleSlider.value);
  };
}
