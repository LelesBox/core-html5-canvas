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
  const TEXT_FILL_STYLE = 'rgba(100, 130, 240, 0.5)';
  const TEXT_STROKE_STYLE = 'rgba(200, 0, 0, 0.7)';
  const TEXT_SIZE = 64;

  const circle = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    radius: 200
  }

  function drawCircularText(text: string, startAngle: number, endAngle: number) {
    const radius = circle.radius;
    var angleDecrement = (startAngle - endAngle) / ((text.length - 1));
    var angle = parseFloat(startAngle.toString());
    var index = 0;
    var character;

    context.save();

    context.fillStyle = TEXT_FILL_STYLE;
    context.strokeStyle = TEXT_STROKE_STYLE;
    context.font = TEXT_SIZE + 'px Lucida Sans';

    while(index  < text.length) {
      character = text.charAt(index);
    }
  }
}
