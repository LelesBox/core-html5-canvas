export function run () {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const readout = document.getElementById('readout') as HTMLDivElement
  const context = canvas.getContext('2d')!

function windowToCanvas(canvas: HTMLCanvasElement, x: number, y: number) {
  var bbox = canvas.getBoundingClientRect()
  return {
    x: x - bbox.left * (canvas.width / bbox.width),
    y: y - bbox.top * (canvas.height / bbox.height)
  }
}

function drawBackground() {
  var VERTICAL_LINE_SPACING = 12
  var i = canvas.height
  context.clearRect(0, 0, canvas.width, canvas.height)
  context.strokeStyle = 'rgba(0, 0, 0, 0.3)'
  context.lineWidth = 0.5
  while(i > VERTICAL_LINE_SPACING) {
    context.beginPath()
    context.moveTo(0, i)
    context.lineTo(canvas.width, i)
    context.stroke()
    i -= VERTICAL_LINE_SPACING
  }
  var j = canvas.width
  while(j > VERTICAL_LINE_SPACING) {
    context.beginPath()
    context.moveTo(j, 0)
    context.lineTo(j, canvas.height)
    context.stroke()
    j -= VERTICAL_LINE_SPACING
  }
}


function drawGuideLines(x: number, y: number) {
  context.strokeStyle = 'rgba(0, 0, 230, 0.8)'
  context.lineWidth = 0.5
  drawVerticalLine(x)
  drawHorizontalLine(y)
}

function updateReadout(x: number, y: number) {
  readout.innerText = `(${x.toFixed(0)},${y.toFixed(0)})`
}

function drawHorizontalLine(y: number) {
  context.beginPath()
  context.moveTo(0, y + 0.5)
  context.lineTo(canvas.width, y + 0.5)
  context.stroke()
}

function drawVerticalLine(x: number) {
  context.beginPath()
  context.moveTo(x + 0.5, 0)
  context.lineTo(x + 0.5, canvas.height)
  context.stroke()
}
let dragImageData: any;
let isDrag = false;
canvas.onmousedown = () => {
  isDrag = true;
  dragImageData = context.getImageData(0, 0, canvas.width, canvas.height);
}

canvas.onmousemove = e => {
  var loc = windowToCanvas(canvas, e.clientX, e.clientY)
  if (isDrag) {
    context.putImageData(dragImageData, 0, 0);
    drawGuideLines(loc.x, loc.y)
    updateReadout(loc.x, loc.y)
  }
}

canvas.onmouseup = () => {
  isDrag = false;
  if (dragImageData) {
    context.putImageData(dragImageData, 0, 0);
  }
}

drawBackground()
}