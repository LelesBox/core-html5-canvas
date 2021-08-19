export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  function drawTwoArcs() {
    context.beginPath();
    context.arc(720, 320, 150, 0, Math.PI * 2, false);
    context.arc(720, 320, 100, 0, Math.PI * 2, true);
    context.fill();
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.stroke();
  }
  function draw() {
    context.clearRect(0, 0, context.canvas.width, context.canvas.height);
    context.save();
    context.shadowColor = 'rgba(0, 0, 0, 0.8)';
    context.shadowOffsetX = 12;
    context.shadowOffsetY = 12;
    context.shadowBlur = 15;
    drawTwoArcs();
    context.restore();
  }

  function draw2() {
    context.save();
    context.shadowColor = 'rgba(200, 200, 0, .5)';
    context.shadowOffsetX = 12;
    context.shadowOffsetY = 12;
    context.shadowBlur = 15;
    drawCutouts();
    strokeCutoutsShapes()
  }

  function drawCutouts() {
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
    context.shadowBlur = 0;
    context.beginPath();
    addOuterRectanglePath();
    addCirclePath();
    addRectanglePath();
    addTrianglePath();
    context.fill();
  }

  function strokeCutoutsShapes() {
    context.save();
    context.strokeStyle = 'rgba(0,0,0,.7)';
    context.beginPath();
    addOuterRectanglePath();
    context.stroke();
    context.beginPath();
    addCirclePath();
    addRectanglePath();
    addTrianglePath();
    context.stroke();
    context.restore();
  }

  function rect(x: number, y: number, w: number, h: number, direction: boolean) {
    if (direction) {
      context.moveTo(x, y);
      context.lineTo(x, y + h);
      context.lineTo(x + w, y + h);
      context.lineTo(x + w, y);
      context.closePath();
    } else {
      context.rect(x, y, w, h);
    }
  }

  function addOuterRectanglePath() {
    context.rect(110, 25, 370, 335);
  }

  function addCirclePath() {
    context.arc(300, 300, 40, 0, Math.PI * 2, true);
  }

  function addRectanglePath() {
    rect(310, 55, 70, 35, true);
  }

  function addTrianglePath() {
    context.moveTo(400, 200);
    context.lineTo(250, 115);
    context.lineTo(200, 200);
    context.closePath();
  }

  context.fillStyle = 'rgba(100, 140, 230, 0.5)';
  context.strokeStyle = context.fillStyle;
  draw();
  context.fillStyle = 'goldenrod';
  draw2();
}
