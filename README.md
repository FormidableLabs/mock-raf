# mock-raf

A simple mock for `requestAnimationFrame` testing with fake timers.

Adapted with gratitude from [`react-motion`](https://github.com/chenglou/react-motion/blob/dafff3f2b00ac11f39d91f3363cc97de664b2406/test/createMockRaf.js). Original source [here](https://github.com/chenglou/react-motion/blob/dafff3f2b00ac11f39d91f3363cc97de664b2406/test/createMockRaf.js).

## Basic Usage

```js
var createMockRaf = require('mock-raf');
var mockRaf = createMockRaf();

// Stub out your `requestAnimationFrame` method
sinon.stub(window, 'requestAnimationFrame').callsFake(mockRaf.raf);

// Take 10 `requestAnimationFrame` steps (your callback will fire 10 times)
mockRaf.step({ count: 10 });
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

Replacement for `requestAnimationFrame` or a polyfill. Adds a callback to be fired on the next step.

### `cancel()`

Replacement for `cancelAnimationFrame` or a polyfill. Removes all currently scheduled `requestAnimationFrame` callbacks from the queue.

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
