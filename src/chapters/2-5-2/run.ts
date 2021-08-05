export function run() {
  var canvas = document.getElementById("canvas") as HTMLCanvasElement;
  var context = canvas.getContext("2d")!;

  const repeatRadio = document.getElementById("repeatRadio");
  const repeatXRadio = document.getElementById("repeatXRadio");
  const repeatYRadio = document.getElementById("repeatYRadio");
  const noRepeatRadio = document.getElementById("noRepeatRadio");

  const image = new Image();

  function fillCanvasWithPattern(repeatString: any) {
    const pattern = context.createPattern(image, repeatString);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = pattern!;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fill();
  }

  repeatRadio!.onclick = (e) => {
    fillCanvasWithPattern("repeat");
  };
  repeatXRadio!.onclick = (e) => {
    fillCanvasWithPattern("repeat-x");
  };
  repeatYRadio!.onclick = (e) => {
    fillCanvasWithPattern("repeat-y");
  };
  noRepeatRadio!.onclick = (e) => {
    fillCanvasWithPattern("no-repeat");
  };

  image.src = 'https://raw.githubusercontent.com/corehtml5canvas/code/master/ch02/example-2.5/redball.png';
  image.onload = () => {
    fillCanvasWithPattern('repeat')
  }
}
