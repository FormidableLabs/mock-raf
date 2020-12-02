var assign = require('object-assign');

module.exports = function () {
  var FPS = 1000 / 60;
  var allCallbacks = {};
  var callbacksLength = 0;

  var now = 0;

  var getNow = function () {
    return now;
  };

  var raf = function (callback) {
    callbacksLength += 1;

    allCallbacks[callbacksLength] = callback;

    return callbacksLength;
  };

  var cancel = function (id) {
    delete allCallbacks[id];
  };

  var step = function (opts) {
    var options = assign({}, {
      time: FPS,
      count: 1
    }, opts);

    var oldAllCallbacks;

    if (options.count > 0) {
      oldAllCallbacks = allCallbacks;
      allCallbacks = {};
    }

    for (var i = 0; i < options.count; i++) {
      now += options.time;

      for (var id in oldAllCallbacks) {
        var callback = oldAllCallbacks[id];
        callback(now);
      }
    }
  }

  return {
    now: getNow,
    raf: raf,
    cancel: cancel,
    step: step
  };
};
