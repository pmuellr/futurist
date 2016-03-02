'use strict'

module.exports = Future

function Future () {
  if (!(this instanceof Future)) return new Future()

  this._value = null
  this._resolved = false
  this._listeners = []
}

Future.prototype.value = function value () {
  return this._value
}

Future.prototype.isResolved = function isResolved () {
  return this._resolved
}

Future.fromPromise = function Future_fromPromise (promise) {
  if (!isPromise(promise)) throw new Error('promise argument must be a promise')

  var future = new Future()

  promise.then(resolved, resolved)

  return future

  function resolved (val) {
    future.resolve(val)
  }
}

Future.prototype.resolve = function resolve (value) {
  if (this._resolved) return this

  this._resolved = true
  this._value = value

  var listeners = this._listeners
  this._listeners = null

  for (var i = 0; i < listeners.length; i++) {
    this.onResolved(listeners[i])
  }

  return this
}

Future.prototype.onResolved = function resolved (cb) {
  if (typeof cb !== 'function') throw new Error('callback argument must be a function')

  if (!this._resolved) {
    this._listeners.push(cb)
    return this
  }

  var self = this
  process.nextTick(function resolving () { cb(self._value) })

  return this
}

Future.prototype.promise = function promise () {
  var self = this

  return new Promise(function (resolve) {
    self.onResolved(function (val) {
      resolve(val)
    })
  })
}

function isPromise (promise) {
  if (typeof promise.then !== 'function') return false
  if (typeof promise.catch !== 'function') return false
  return true
}
