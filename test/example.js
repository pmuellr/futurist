var Future = require('..')

var f1 = new Future().resolve(42)
f1.onResolved(function (val) {
  console.log(val) // prints 42
})

var f3 = new Future()
f3.onResolved(function (val) {
  console.log(val) // prints 43
})
process.nextTick(function () {
  f3.resolve(43)
  f3.onResolved(function (val) {
    console.log(val) // prints 43
  })
})

var f4 = new Future()
f4.promise().then(function (val) {
  console.log(val) // prints 44
})
f4.resolve(44)

var f5 = Future.fromPromise(Promise.resolve(45))
f5.onResolved(function (val) {
  console.log(val) // prints 45
})
