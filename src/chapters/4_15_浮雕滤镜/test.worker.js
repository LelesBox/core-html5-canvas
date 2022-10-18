addEventListener('message', function (e) {
  let st = new Date().getTime()
  let res = fib(e.data)
  let ed = new Date().getTime()
  self.postMessage(res);
}, false);

function fib(n) {
  return n < 2 ? n : fib(n - 1) + fib(n - 2)
}