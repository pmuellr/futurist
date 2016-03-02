'use strict'

var path = require('path')

var tape = require('tape')

module.exports = tapeRunner

function tapeRunner (fileName) {
  fileName = path.basename(fileName)

  return function tapeRunner_ (fn) {
    var fnName = fn.name || 'anonymous!'
    return tape(fileName + ': ' + fnName + '()', fn)
  }
}
