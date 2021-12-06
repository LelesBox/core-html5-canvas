function $<T>(selector: string) {
  return document.querySelector(selector) as T | null;
}
function $$<T extends Element>(selector: string) {
  return document.querySelectorAll(selector) as NodeListOf<T>;
}
export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  const LEFT_COLUMN_FONTS = [
    '2em palatino',
    'bolder 2em palatino',
    'lighter 2em palatino',
    'italic 2em palatino',
    'oblique small-caps 24px palatino',
    'bold 14pt palatino',
    'xx-large palatino',
    'italic xx-large palatino',
  ]
  const RIGHT_COLUMN_FONTS = [
    'oblique 1.5em lucida console',
    'x-large fantasy',
    'italic 28px monaco',
    'italic large copperplate',
    '36px century',
    '28px tahoma',
    '28px impact',
    '1.7em verdana',
  ]

  const LEFT_COLUMN_X = 25;
  const RIGHT_COLUMN_X = 425;
  const DELTA_Y = 50;
  const TOP_Y = 50;
  let y = 0;
  context.fillStyle = 'blue';
  LEFT_COLUMN_FONTS.forEach(font => {
    context.font = font;
    context.fillText(font, LEFT_COLUMN_X, y += DELTA_Y);
  });

  y = 0;

  RIGHT_COLUMN_FONTS.forEach(font => {
    context.font = font;
    context.fillText(font, RIGHT_COLUMN_X, y += DELTA_Y)
  })
}
