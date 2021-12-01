function $(selector: string) {
  return document.querySelector(selector);
}
function $$(selector: string) {
  return document.querySelectorAll(selector);
}
export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  const image = new Image();
  const gradient = context.createLinearGradient(0, 0, canvas.width, canvas.height);
  const text = 'Canvas'
  let pattern: any;

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

    context.strokeStyle = 'rgba(100, 0, 0, .3)';
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(LEFT_MARGIN, 0);
    context.lineTo(LEFT_MARGIN, context.canvas.height);
    context.stroke();
  }

  function drawGradientText() {
    context.fillStyle =gradient;
    context.fillText(text, 65, 200);
    context.strokeText(text, 65, 200);
  }

  function drawPatternText() {
    context.fillStyle = pattern;
    context.fillText(text, 65, 450);
    context.strokeText(text, 65, 450);
  }

  image.onload = e => {
    pattern = context.createPattern(image, 'repeat');
    drawPatternText();
  }

  image.src = 'https://raw.githubusercontent.com/corehtml5canvas/code/master/ch02/example-2.5/redball.png';

  context.font = '256px Palatino';
  context.strokeStyle = 'cornflowerblue';
  context.shadowColor = 'rgba(100, 100, 150, 0.8)';
  context.shadowOffsetX = 5;
  context.shadowOffsetY = 5;
  context.shadowBlur = 10;
  gradient.addColorStop(0, 'blue');
  gradient.addColorStop(0.25, 'blue');
  gradient.addColorStop(0.5, 'white');
  gradient.addColorStop(0.75, 'red');
  gradient.addColorStop(1, 'yellow');
  drawBackground();
  drawGradientText();
}
