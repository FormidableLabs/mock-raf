var assign = require('object-assign');

module.exports = function () {
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
      time: 1000 / 60,
      count: 1
    }, opts);

    var oldAllCallbacks;

    for (var i = 0; i < options.count; i++) {
      oldAllCallbacks = allCallbacks;
      allCallbacks = {};
      
      now += options.time;

      Object.keys(oldAllCallbacks).forEach(function (id) {
        var callback = oldAllCallbacks[id];
        callback(now);
      });
    }
  }

  return {
    now: getNow,
    raf: raf,
    cancel: cancel,
    step: step
  };
};
