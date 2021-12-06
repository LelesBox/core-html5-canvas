function $<T>(selector: string) {
  return document.querySelector(selector) as T | null;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  console.log('hello world')

  const fontHeight = 24;
  const alignValues: CanvasTextAlign[] = ['start', 'center', 'end'];
  const baselineValues: CanvasTextBaseline[] = ['top', 'middle', 'bottom', 'alphabetic', 'ideographic', 'hanging'];
  let x:number;
  let y:number;

  function drawGrid(color: string, stepX: number, stepY: number) {
    context.strokeStyle = color;
    context.lineWidth = 0.5;
    for (let i = stepX + 0.5; i < context.canvas.width; i += stepX) {
      context.beginPath();
      context.moveTo(i, 0);
      context.lineTo(i , context.canvas.height);
      context.stroke();
    }
    for (let i = stepY + 0.5; i < context.canvas.height; i += stepY) {
      context.beginPath();
      context.moveTo(0, i);
      context.lineTo(context.canvas.width, i);
      context.stroke();
    }
  }

  function drawTextMarker() {
    context.fillStyle = 'yellow';
    context.fillRect(x, y, 7, 7)
    context.strokeRect(x, y, 7, 7);
  }

  function drawText(text: string, textAlign: CanvasTextAlign, textBaseline: CanvasTextBaseline) {
    if (textAlign) {
      context.textAlign = textAlign;
    }
    if (textBaseline) {
      context.textBaseline = textBaseline
    }
    context.fillStyle = 'cornflowerblue';
    context.fillText(text, x, y);
  }

  function drawTextLine() {
    context.strokeStyle = 'gray';
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + 738, y);
    context.stroke();
  }

  context.font = 'oblique normal bold 24px palatino';
  drawGrid('lightgray', 10, 10);
  for(let align = 0; align < alignValues.length; ++align) {
    for (let baseline = 0; baseline < baselineValues.length; ++baseline) {
      x = 20 + align * fontHeight * 15;
      y = 20 + baseline * fontHeight * 3;
      drawText(alignValues[align] + '/' + baselineValues[baseline], alignValues[align], baselineValues[baseline]);
      drawTextMarker();
      drawTextLine()
    }
  }
}
