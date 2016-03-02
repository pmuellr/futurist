'use strict'

var futurist = require('..')
var tapeRunner = require('./tapeRunner')(__filename)

tapeRunner(function checkExports (t) {
  t.equal(typeof futurist, 'function', 'module export should be a function')
  t.end()
})
