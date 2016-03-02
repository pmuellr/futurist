'use strict'

var Future = require('..')
var tapeRunner = require('./tapeRunner')(__filename)

tapeRunner(function FutureAPI (t) {
  t.ok(typeof Future.fromPromise === 'function', 'Future.fromPromise() should be a method')

  var f1 = Future()
  t.ok(typeof f1.resolve === 'function', 'resolve() should be a method')
  t.ok(typeof f1.onResolved === 'function', 'onResolved() should be a method')
  t.ok(typeof f1.promise === 'function', 'promise() should be a method')

  if (typeof Promise !== 'function') {
    t.skip('Promise is not defined, skipping some tests')
  } else {
    var f2 = Future.fromPromise(Promise.resolve(42))
    t.ok(typeof f2.resolve === 'function', 'resolve() should be a method')
    t.ok(typeof f2.onResolved === 'function', 'onResolved() should be a method')
    t.ok(typeof f2.promise === 'function', 'promise() should be a method')
  }

  t.end()
})

tapeRunner(function resolveBefore (t) {
  var f = Future()

  f.resolve(42)
  f.onResolved(function (val) {
    t.equal(val, 42, 'value should be 42')
    t.end()
  })
})

tapeRunner(function resolveAfter (t) {
  var f = Future()

  f.onResolved(function (val) {
    t.equal(val, 43, 'value should be 43')
    t.end()
  })

  f.resolve(43)
})

tapeRunner(function resolveOnTick (t) {
  var f = Future()

  f.onResolved(function (val) {
    t.equal(val, 44, 'value should be 44')
    t.end()
  })

  process.nextTick(function () { f.resolve(44) })
})

tapeRunner(function resolvedMulti (t) {
  var f = Future()
  var resolved1 = false
  var resolved2 = false

  f.onResolved(function (val) {
    resolved1 = true
    t.equal(val, 45, 'value should be 45(1)')
    if (resolved1 && resolved2) t.end()
  })

  f.onResolved(function (val) {
    resolved2 = true
    t.equal(val, 45, 'value should be 45(2)')
    if (resolved1 && resolved2) t.end()
  })

  f.resolve(45)
})

tapeRunner(function resolvedAsync (t) {
  var f = Future().resolve(46)
  var sideVal = 'foo'

  f.onResolved(function (val) {
    t.equal(val, 46, 'value should be 46')
    t.equal(sideVal, 'bar', 'sideVal should be "bar"')
    t.end()
  })

  sideVal = 'bar'
})

tapeRunner(function checkValueAndIsResolved (t) {
  var f = Future()

  t.equal(f.value(), null, 'value should be null')
  t.equal(f.isResolved(), false, 'isResolved should be false')

  f.resolve(47)

  t.equal(f.value(), 47, 'value should be null')
  t.equal(f.isResolved(), true, 'isResolved should be false')
  t.end()
})
