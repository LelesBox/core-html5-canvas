function $<T>(selector: string) {
  return document.querySelector(selector) as T | null;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  const cursor = new TextCursor();
  let drawingSurfaceImageData: ImageData;

  function moveCursor (location: {x: number; y: number}) {
    drawingSurfaceImageData && cursor.erase(context, drawingSurfaceImageData)
    cursor.draw(context, location.x, location.y);
    if (!blinkingInterval) {
      blinkCursor(location);
    }
  }

  function windowToCanvas(e: MouseEvent) {
    var bbox = canvas.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    return {
      x: x - bbox.left * (canvas.width / bbox.width),
      y: y - bbox.top * (canvas.height / bbox.height)
    }
  }

  function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(0, 0, canvas.width, canvas.height);
  }

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

  let blinkingInterval: number;
  let blinkingTimer:number;
  function blinkCursor(loc: {x: number; y: number}) {
    clearInterval(blinkingInterval);
    clearTimeout(blinkingTimer);
    blinkingInterval = setInterval(() => {
      cursor.erase(context, drawingSurfaceImageData);
      blinkingTimer = setTimeout(() => {
        cursor.draw(context, cursor.left, cursor.top + cursor.getHeight(context));
      }, 500);
    }, 1000);
  }

  canvas.onmousedown = e => {
    const location = windowToCanvas(e);
    moveCursor(location);
  }
  drawGrid('lightgray', 10, 10);
  saveDrawingSurface();
}

class TextCursor {
  left = 0;
  top = 0;
  width = 2;
  fillStyle = 'rgba(0, 0, 0, .5)';
  constructor(width?: number, fillStyle?: string) {
    this.fillStyle = fillStyle || 'rgba(0, 0, 0, .5)';
    this.width = width || 2;
    this.left = 0;
    this.top = 0;
  }

  getHeight(context: CanvasRenderingContext2D) {
    const h = context.measureText('W').width;
    return h + h/6;
  }

  createPath(context: CanvasRenderingContext2D) {
    context.beginPath();
    context.rect(this.left, this.top, this.width, this.getHeight(context));
  }

  draw(context: CanvasRenderingContext2D, left: number, bottom: number) {
    context.save();
    this.left = left;
    this.top = bottom - this.getHeight(context);
    this.createPath(context);
    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore();
  }

  erase(context: CanvasRenderingContext2D, imageData: ImageData) {
    context.putImageData(imageData, 0, 0, this.left, this.top, this.width, this.getHeight(context));
  }
}
