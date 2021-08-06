export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  const SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)'

  function setIconShadow() {
    context.shadowColor = SHADOW_COLOR
    context.shadowOffsetX = 1
    context.shadowOffsetY = 1
    context.shadowBlur = 2
  }

  function setSelectedIconShadow() {
    context.shadowColor = SHADOW_COLOR
    context.shadowOffsetX = 4
    context.shadowOffsetY = 4
    context.shadowBlur = 5
  }
  function render() {
    context.font = '24px Helvetica'
    context.fillText('Click anywhere to ease', 175, 200)
  }
  setIconShadow()
  drawEraser({ x: 100, y: 100})
  render()
  canvas.onmouseover = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    setSelectedIconShadow()
    render()
    drawEraser({ x: 100, y: 100})
  }
  canvas.onmouseleave = () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
    setIconShadow()
    render()
    drawEraser({ x: 100, y: 100})
  }

  function setEraserAttributes() {
    context.lineWidth = 1
    context.shadowColor = 'red'
    context.shadowOffsetX = -5
    context.shadowOffsetY = -5
    context.shadowBlur = 20
    context.strokeStyle = 'rgba(0, 0, 255, 0.6)'
  }

  function drawEraser(loc: {x: number, y: number}) {
    context.save();
    setEraserAttributes();
    context.beginPath();
    context.arc(loc.x, loc.y, 60, 0, Math.PI * 2, false);
    context.clip()
    context.stroke()
    context.restore()
  }
}
