function $<T>(selector: string) {
  return document.querySelector(selector) as T | null;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  const HORIZONTAL_AXIS_MARGIN = 50;
  const VERTICAL_AXIS_MARGIN = 50;

  const AXIS_ORIGIN = {
    x: HORIZONTAL_AXIS_MARGIN,
    y: canvas.height - VERTICAL_AXIS_MARGIN,
  }

  const AXIS_TOP = VERTICAL_AXIS_MARGIN;
  const AXIS_RIGHT = canvas.width - HORIZONTAL_AXIS_MARGIN;

  const HORIZONTAL_TICK_SPACING = 10;
  const VERTICAL_TICK_SPACING = 10;

  const AXIS_WIDTH = AXIS_RIGHT - AXIS_ORIGIN.x;
  const AXIS_HEIGHT = AXIS_ORIGIN.y - AXIS_TOP;

  const NUM_VERTICAL_TICKS = AXIS_HEIGHT / VERTICAL_TICK_SPACING;
  const NUM_HORIZONTAL_TICKS = AXIS_WIDTH / HORIZONTAL_TICK_SPACING;

  const TICK_WIDTH = 10;

  const SPACE_BETWEEN_LABEL_AND_AXIS = 20;

  function drawAxes() {
    context.save();
    context.lineWidth = 1.0;
    context.fillStyle = 'rgba(100, 140, 230, 0.8)';
    context.strokeStyle = 'navy';

    drawHorizontalAxis();
    drawVerticalAxis();

    context.lineWidth = 0.5;
    context.strokeStyle = 'navy';
    context.strokeStyle = 'darked';
    
    drawVerticalAxisTicks();
    drawHorizontalAxisTicks();
    context.restore();
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

  function drawHorizontalAxis() {
    context.beginPath();
    context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
    context.lineTo(AXIS_RIGHT, AXIS_ORIGIN.y);
    context.stroke();
  }

  function drawVerticalAxis() {
    context.beginPath();
    context.moveTo(AXIS_ORIGIN.x, AXIS_ORIGIN.y);
    context.lineTo(AXIS_ORIGIN.x, AXIS_TOP);
    context.stroke();
  }

  function drawVerticalAxisTicks() {
    var deltaX;
    for (let i = 1; i < NUM_VERTICAL_TICKS; ++i) {
      context.beginPath();
      if (i % 5 === 0) {
        deltaX = TICK_WIDTH;
      } else {
        deltaX = TICK_WIDTH / 2;
      }
      context.moveTo(AXIS_ORIGIN.x - deltaX, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING)
      context.lineTo(AXIS_ORIGIN.x + deltaX, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING)
      context.stroke();
    }
  }

  function drawHorizontalAxisTicks() {
    var deltaY;
    for (let i = 1; i < NUM_HORIZONTAL_TICKS; ++i) {
      context.beginPath();
      if (i % 5 === 0) {
        deltaY = TICK_WIDTH;
      } else {
        deltaY = TICK_WIDTH / 2;
      }
      context.moveTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y - deltaY);
      context.lineTo(AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y + deltaY);
      context.stroke();
    }
  }

  function drawAxisLabels() {
    context.fillStyle = 'blue';
    drawHorizontalAxisLabels();
    drawVerticalAxisLabels();
  }

  function drawHorizontalAxisLabels() {
    context.textAlign = 'center';
    context.textBaseline = 'top';
    for (var i = 0; i <= NUM_HORIZONTAL_TICKS; ++i) {
      if (i % 5 === 0) {
        context.fillText(i.toString(), AXIS_ORIGIN.x + i * HORIZONTAL_TICK_SPACING, AXIS_ORIGIN.y + SPACE_BETWEEN_LABEL_AND_AXIS);
      }
    }
  }

  function drawVerticalAxisLabels() {
    context.textAlign = 'right';
    context.textBaseline = 'middle';
    for (var i = 0; i <= NUM_VERTICAL_TICKS; ++i) {
      if (i % 5 === 0) {
        context.fillText(i.toString(), AXIS_ORIGIN.x - SPACE_BETWEEN_LABEL_AND_AXIS, AXIS_ORIGIN.y - i * VERTICAL_TICK_SPACING);
      }
    }
  }

  context.font = '13px Arial'
  context.shadowColor = 'rgba(100, 140, 230, 0.8)';
  context.shadowOffsetX = 3;
  context.shadowOffsetY = 3;
  context.shadowBlur = 5;
  drawGrid('lightgray', 10, 10);
  drawAxes();
  drawAxisLabels();
}
