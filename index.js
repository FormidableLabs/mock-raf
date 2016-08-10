var assign = require('object-assign');

module.exports = function () {
  var allCallbacks = [];
  var prevTime = 0;

  var now = function () {
    return prevTime;
  };

  var raf = function (callback) {
    allCallbacks.push(callback);
  };

  var cancel = function () {
    allCallbacks = [];
  };

  var step = function (opts) {
    var options = assign({}, {
      time: 1000 / 60,
      count: 1
    }, opts);

    var oldAllCallbacks;

    for (var i = 0; i < options.count; i++) {
      oldAllCallbacks = allCallbacks;
      allCallbacks = [];

      oldAllCallbacks.forEach(function (callback) {
        callback(prevTime);
      });

      prevTime += options.time;
    }
  }

  return {
    now: now,
    raf: raf,
    cancel: cancel,
    step: step
  };
};
