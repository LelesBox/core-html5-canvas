function $<T>(selector: string) {
  return document.querySelector(selector) as T | null;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  var context = canvas.getContext("2d")!;
  console.log("hello world");
  const fontSelect = $<HTMLSelectElement>("#fontSelect")!;
  const sizeSelect = $<HTMLSelectElement>("#sizeSelect")!;
  const strokeStyleSelect = $<HTMLSelectElement>("#strokeStyleSelect")!;
  const fillStyleSelect = $<HTMLSelectElement>("#fillStyleSelect")!;
  const GRID_STROKE_STYLE = "lightgray";
  const GRID_HORIZONTAL_SPACING = 10;
  const GRID_VERTICAL_SPACING = 10;
  const cursor = new TextCursor(context);
  let line: TextLine;
  let blinkInterval: number;
  let drawingSurfaceImageData: ImageData;
  const BLINK_TIME = 1000;
  const BLINK_OFF = 300;

  function windowToCanvas(x: number, y: number) {
    const box = canvas.getBoundingClientRect();
    return {
      x: x - box.left * (canvas.width / box.width),
      y: y - box.top * (canvas.height / box.height),
    };
  }

  function saveDrawingSurface() {
    drawingSurfaceImageData = context.getImageData(
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  function setFont() {
    context.font = sizeSelect.value + 'px ' + fontSelect.value;
  }

  function blinkCursor(x: number, y: number) {
    clearInterval(blinkInterval);
    blinkInterval = setInterval(() => {
      cursor.erase(drawingSurfaceImageData);
      setTimeout(() => {
        if (cursor.left === x && cursor.top + cursor.getHeight() === y) {
          cursor.draw(x, y);
        }
      }, 300);
    }, 1000);
  }

  function moveCursor(x: number, y: number) {
    cursor.erase(drawingSurfaceImageData)
    saveDrawingSurface();
    context.putImageData(drawingSurfaceImageData, 0, 0);
    cursor.draw(x, y);
    blinkCursor(x, y);
  }

  canvas.onmousedown = e => {
    const loc = windowToCanvas(e.clientX, e.clientY);
    let fontHeight = context.measureText('W').width;
    fontHeight += fontHeight / 6;
    line = new TextLine(context, loc.x, loc.y);
    moveCursor(loc.x, loc.y);
  }

  fillStyleSelect.onchange = e => {
    cursor.fillStyle = fillStyleSelect.value;
    context.fillStyle = fillStyleSelect.value;
  }

  strokeStyleSelect.onchange = e => {
    cursor.strokeStyle = strokeStyleSelect.value;
    context.strokeStyle = strokeStyleSelect.value;
  }

  document.onkeydown = e => {
    if (e.keyCode === 8 || e.keyCode === 13) {
      e.preventDefault();
    }
    if (e.keyCode === 8) {
      context.save();
      line.erase(drawingSurfaceImageData);
      line.removeCharacterBeforeCaret();
      moveCursor(line.left + line.getWidth(), line.bottom);
      line.draw();
      context.restore();
    }
  }

  document.onkeypress = e => {
    const key = String.fromCharCode(e.which);
    if (e.keyCode !== 8 && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      context.save();
      line.erase(drawingSurfaceImageData);
      line.insert(key);
      moveCursor(line.left + line.getWidth(), line.bottom);
      context.shadowColor = 'rgba(0,0,0,.5)';
      context.shadowOffsetX = 1;
      context.shadowOffsetY = 1;
      context.shadowBlur = 2;
      line.draw();
      context.restore();
    }
  }
  
  function drawBackground() { // Ruled paper
    var STEP_Y = 12,
        i = context.canvas.height;
    
    context.strokeStyle = 'rgba(0,0,200,0.225)';
    context.lineWidth = 0.5;
 
    context.save();
 
    while(i > STEP_Y*4) {
       context.beginPath();
       context.moveTo(0, i);
       context.lineTo(context.canvas.width, i);
       context.stroke();
       i -= STEP_Y;
    }
 
    context.strokeStyle = 'rgba(100,0,0,0.3)';
    context.lineWidth = 1;
 
    context.beginPath();
 
    context.moveTo(35,0);
    context.lineTo(35,context.canvas.height);
    context.stroke();
 
    context.restore();
 }

  fontSelect.onchange = setFont;
  sizeSelect.onchange = setFont;

  cursor.fillStyle = fillStyleSelect.value;
  cursor.strokeStyle = strokeStyleSelect.value;

  context.fillStyle = fillStyleSelect.value;
  context.strokeStyle = strokeStyleSelect.value;
  context.lineWidth = 2;
  setFont();
  drawBackground()
  saveDrawingSurface();
}

class TextLine {
  text = "";
  left: number;
  bottom: number;
  caret = 0;
  context: CanvasRenderingContext2D;
  constructor(context: CanvasRenderingContext2D, x: number, y: number) {
    this.left = x;
    this.bottom = y;
    this.context = context;
  }

  insert(text: string) {
    this.text =
      this.text.substr(0, this.caret) + text + this.text.substr(this.caret);
    this.caret += text.length;
  }

  removeCharacterBeforeCaret() {
    if (this.caret === 0) {
      return;
    }
    this.text =
      this.text.substring(0, this.caret - 1) + this.text.substring(this.caret);
    this.caret--;
  }

  getWidth() {
    return this.context.measureText(this.text).width;
  }

  getHeight() {
    const h = this.context.measureText("W").width;
    return h + h / 6;
  }

  draw() {
    const { context } = this;
    context.save();
    context.textAlign = "start";
    context.textBaseline = "bottom";
    context.strokeText(this.text, this.left, this.bottom);
    context.fillText(this.text, this.left, this.bottom);
    context.restore();
  }

  erase(imageData: ImageData) {
    this.context.putImageData(imageData, 0, 0);
  }
}

class TextCursor {
  left = 0;
  top = 0;
  width = 2;
  fillStyle = "rgba(0, 0, 0, .5)";
  strokeStyle = '';
  context: CanvasRenderingContext2D;
  constructor(
    context: CanvasRenderingContext2D,
    width?: number,
    fillStyle?: string
  ) {
    this.fillStyle = fillStyle || "rgba(0, 0, 0, .5)";
    this.width = width || 2;
    this.left = 0;
    this.top = 0;
    this.context = context;
  }

  getHeight() {
    const h = this.context.measureText("W").width;
    return h + h / 6;
  }

  createPath() {
    this.context.beginPath();
    this.context.rect(this.left, this.top, this.width, this.getHeight());
  }

  draw(left: number, bottom: number) {
    const { context } = this;
    context.save();
    this.left = left;
    this.top = bottom - this.getHeight();
    this.createPath();
    context.fillStyle = this.fillStyle;
    context.fill();
    context.restore();
  }

  erase(imageData: ImageData) {
    this.context.putImageData(
      imageData,
      0,
      0,
      this.left,
      this.top,
      this.width,
      this.getHeight()
    );
  }
}
