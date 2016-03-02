futurist - like a Promise, but simpler
================================================================================

Creates objects which will be resolved to a value in the future, and that
you can add a callback which is called when they are resolved.  Like Promises,
once a future object is resolved, further calls to add a callback waiting for
the value to be resolved, will be called with the resolved value.

Unlike Promises:

* there is no notion of rejection, only resolving
* errors are not caught on your behalf in the callbacks waiting for the value
  to be resolved
* future objects do not "chain"
* futures are resolved by calling a method on the future itself, instead of
  indirectly via the fulfiller function passed to the Promise constructor.

You can, however, create a Promise from a future object, and vice versa.


examples
================================================================================

```js
var Future = require('futurist')

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
```

install
================================================================================

    npm install futurist
    npm install pmuellr/futurist
    npm install pmuellr/futurist#v0.1.0
    ...


API
================================================================================

This package exports a function referred to below as `Future()`, as if you
had:

```js
var Future = require('futurist')
```


`Future()`
--------------------------------------------------------------------------------

Returns a new future object.  You can also call this as a constructor:

```js
var future1 = Future()
var future2 = new Future()
```


`Future.fromPromise(promise)`
--------------------------------------------------------------------------------

Returns a new future object which will be resolved when the promise is
fulfilled; resolved or rejected - either case; the value resolved will be the
value the promise resolves to, or rejects with.  Or the value that the future
itself is resolved to via `Future::resolve()`.


`Future::resolve(value)`
--------------------------------------------------------------------------------

Resolves a future to the specified value.

Once a future is resolved, further calls to `resolve()` are a no-op.

Returns the future object.


`Future::onResolved(function cb(value) {})`
  --------------------------------------------------------------------------------

Runs the callback, asynchronously, when the future object is resolved.

If the future is already resolved, calls the callback asynchronously.

Returns the future object.


`Future::promise()`
--------------------------------------------------------------------------------

Returns a promise that resolves to the value that the future object resolves to.
The promise will never be rejected.
