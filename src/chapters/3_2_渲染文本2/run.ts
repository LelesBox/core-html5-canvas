function $(selector: string) {
  return document.querySelector(selector);
}
function $$(selector: string) {
  return document.querySelectorAll(selector);
}
export function run() {
  var canvas = document.getElementById('canvas') as HTMLCanvasElement
  var context = canvas.getContext('2d')!
  console.log('hello world')
}
