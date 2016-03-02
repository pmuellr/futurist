'use strict'

var Future = require('..')
var tapeRunner = require('./tapeRunner')(__filename)

tapeRunner(function exceptions (t) {
  var f1 = Future()

  try {
    f1.onResolved('foo')
    t.fail('should have thrown an exception')
  } catch (err) {
    t.pass('should have thrown an exception')
  }

  try {
    Future.fromPromise('bar')
    t.fail('should have thrown an exception')
  } catch (err) {
    t.pass('should have thrown an exception')
  }

  t.end()
})
