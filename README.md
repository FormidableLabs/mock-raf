# mock-raf

A simple mock for `requestAnimationFrame` testing with fake timers. This is a fork of the
 mock-raf package provided by [Alex Lande](https://github.com/alexlande) which can be found
 [`here`](https://github.com/FormidableLabs/mock-raf). This fork implements request IDs, which
 can be used e.g. to test if the right animation frames are cancelled.

## Basic Usage

```js
var createMockRaf = require('mock-raf');
var mockRaf = createMockRaf();

// Stub out your `requestAnimationFrame` method
sinon.stub(window, 'requestAnimationFrame', mockRaf.raf);

// Take 10 `requestAnimationFrame` steps (your callback will fire 10 times)
mockRaf.step(10);
```

## API

### `createMockRaf()`

Creates a `mockRaf` instance, exposing the functions you'll use to interact with the mock.

Returns:

- now()
- raf()
- cancel()
- step()

```js
var mockRaf = createMockRaf();
```

### `now()`

Returns the current `now` value of the mock. Starts at 0 and increases with each `step()` taken. Useful for stubbing out `performance.now()` or a polyfill when using `requestAnimationFrame` with timers.

### `raf()`

Replacement for `requestAnimationFrame` or a polyfill. Adds a callback to be fired on the next step
and returns an `id` which may be used with `cancel()`.

### `cancel([id])`

Replacement for `cancelAnimationFrame` or a polyfill. If provided with an `id`, it removes the
`requestAnimationFrame` callback associated with this `id` if it exists.

If no argument is provided,
all queued `requestAnimationFrame` callbacks are removed.

### `step(options)`

Takes `requestAnimationFrame` steps. Fires currently queued callbacks for each step and increments `now` time for each step. The primary way to interact with a `mockRaf` instance for testing.

#### Options

`step()` takes an optional `options` object:

##### `time`

Type: `Number` Default: `1000 / 60`

The time that should pass during each `requestAnimationFrame` step in milliseconds. Default is roughly equivalent to default browser behavior.

##### `count`

Type: `Number` Default: `1`

The number of steps to take.
