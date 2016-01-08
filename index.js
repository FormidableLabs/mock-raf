var assign = require('object-assign');

module.exports = function () {
  var allCallbacks = {};
  var prevTime = 0;
  var nextCallbackID = 0;

  var now = function () {
    return prevTime;
  };

  var raf = function (callback) {
    allCallbacks[nextCallbackID] = callback;
    return nextCallbackID++;
  };

  var cancel = function (callbackID) {
    if (typeof callbackID === 'number') {
      delete allCallbacks[callbackID];
    } else {
      allCallbacks = {};
    }
  };

  var step = function (opts) {
    var options = assign({}, {
      time: 1000 / 60,
      count: 1
    }, opts);

    if (options.count > 0) {
      callAllCallbacks();
      allCallbacks = {};
      prevTime += options.time * options.count;
    }
  };

  var callAllCallbacks = function () {
    for (var id in allCallbacks) {
      if (allCallbacks.hasOwnProperty(id)) {
        allCallbacks[id]();
      }
    }
  };

  return {
    now: now,
    raf: raf,
    cancel: cancel,
    step: step
  };
};
