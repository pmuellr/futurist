'use strict'

var Future = require('..')
var tapeRunner = require('./tapeRunner')(__filename)

tapeRunner(function Promise_resolve (t) {
  if (!PromiseDefined(t)) return

  var p = Promise.resolve(42)
  var f = Future.fromPromise(p)

  f.onResolved(function (val) {
    t.equal(val, 42, 'value should be 42')
    t.end()
  })
})

tapeRunner(function Promise_reject (t) {
  if (!PromiseDefined(t)) return

  var p = Promise.reject(43)
  var f = Future.fromPromise(p)

  f.onResolved(function (val) {
    t.equal(val, 43, 'value should be 43')
    t.end()
  })
})

tapeRunner(function Promise_resolve_async (t) {
  if (!PromiseDefined(t)) return

  var p = new Promise(function (resolve, reject) {
    process.nextTick(function () { resolve(44) })
  })

  var f = Future.fromPromise(p)

  f.onResolved(function (val) {
    t.equal(val, 44, 'value should be 44')
    t.end()
  })
})

tapeRunner(function Promise_reject_async (t) {
  if (!PromiseDefined(t)) return

  var p = new Promise(function (resolve, reject) {
    process.nextTick(function () { reject(45) })
  })

  var f = Future.fromPromise(p)

  f.onResolved(function (val) {
    t.equal(val, 45, 'value should be 45')
    t.end()
  })
})

tapeRunner(function promiseFromFuture (t) {
  if (!PromiseDefined(t)) return

  var f = Future()
  var p = f.promise()

  p.then(function (val) {
    t.equal(val, 46, 'value should be 46')
    t.end()
  })

  f.resolve(46)
})

function PromiseDefined (t) {
  if (typeof Promise === 'function') return true

  t.skip('Promise not defined, skipping')
  t.end()
  return false
}
