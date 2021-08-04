export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  
  context.lineJoin = 'round'
  context.lineWidth = 30
  context.font = '24px Helvetica'
  context.fillText('Click anywhere to ease', 175, 200)
  context.strokeStyle = 'goldenrod'
  context.fillStyle = 'rgba(0, 0, 255, .5)';
  context.strokeRect(75, 100, 200, 200)
  context.fillRect(325, 100, 200, 200)
  
  context.canvas.onmousedown = function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height)
  }
}