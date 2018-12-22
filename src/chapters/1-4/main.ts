export function run () {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement
  const context = canvas.getContext('2d')!
  const CENTER = {
    x: canvas.width / 2,
    y: canvas.height / 2,
  }
  var FONT_HEIGHT = 15
  var MARGIN = 35
  var HOUR_HAND_TRUNCATION = canvas.width / 3
  var NUMERAL_SPACING = 20
  var RADIUS = CENTER.x - MARGIN
  var HAND_RADIUS = RADIUS + NUMERAL_SPACING
  
  function drawCircle() {
    context.beginPath();
    context.arc(CENTER.x, CENTER.y, RADIUS, 0 , Math.PI * 2, true)
    context.stroke();
  }
  
  function drawNumerals() {
    var numerals = [1,2,3,4,5,6,7,8,9,10,11,12]
    var angle = 0
    var numeralWidth = 0
    numerals.forEach(numeral => {
      angle = Math.PI / 6 * (numeral - 3)
      numeralWidth = context.measureText(numeral.toString()).width
      context.fillText(numeral.toString(), 
                       CENTER.x + Math.cos(angle) * (HAND_RADIUS) - numeralWidth / 2,
                       CENTER.y + Math.sin(angle) * HAND_RADIUS + FONT_HEIGHT / 3)
    })
  }
  
  function drawCenter() {
    context.beginPath()
    context.arc(CENTER.x, CENTER.y, 5, 0, Math.PI * 2, true)
    context.fill()
  }
  
  function drawHand(num: number, discount = 1) {
    var angle = (Math.PI * 2) / 60 * (num - 15)
    var x = HOUR_HAND_TRUNCATION * Math.cos(angle) * discount
    var y = HOUR_HAND_TRUNCATION * Math.sin(angle) * discount
    context.moveTo(CENTER.x, CENTER.y)
    context.lineTo(CENTER.x + x, CENTER.y + y)
    context.stroke()
  }
  
  function drawHands() {
    var date = new Date()
    var hour = date.getHours()
    hour = hour > 12 ? hour - 12 : hour
    drawHand((hour + (date.getMinutes() / 60)) * 5, 0.6)
    drawHand(date.getMinutes(), 0.8)
    drawHand(date.getSeconds())
  }
  
  function draw() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    drawCircle()
    drawNumerals()
    drawCenter()
    drawHands()
  }
  
  context.font = `${FONT_HEIGHT}px Arial`;
  setInterval(() => {
    draw()
  }, 1000)
}
