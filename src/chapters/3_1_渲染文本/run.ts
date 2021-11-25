function $<T>(selector: string) {
  return document.querySelector(selector) as T | null;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}

export function run() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  var context = canvas.getContext("2d")!;
  const fillCheckbox = $<HTMLInputElement>("#fillCheckbox");
  const strokeCheckbox = $<HTMLInputElement>("#strokeCheckbox");
  const shadowCheckbox = $<HTMLInputElement>("#shadowCheckbox");
  const text = "HTML5";

  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawBackground();
    if (shadowCheckbox!.checked) {
      turnShadowsOn()
    } else {
      turnShadowsOff();
    }
    drawText();
  }

  function drawBackground() {
    const STEP_Y = 12
    const TOP_MARGIN = STEP_Y * 4
    const LEFT_MARGIN = STEP_Y * 3
    let i = context.canvas.height;

    context.strokeStyle = 'lightgray';
    context.lineWidth = 0.5;
    while (i > TOP_MARGIN) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
      i -= STEP_Y;
    }
  }
  function turnShadowsOn() {}
  function turnShadowsOff() {}
  function drawText() {}
  draw();
}
