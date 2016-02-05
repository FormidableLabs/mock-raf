var createMockRaf = require('../index');
var mockRaf = createMockRaf();

var assert = require('assert');
var sinon = require('sinon');

describe('mock-raf', function () {
  it('should call all callbacks when calling step', function () {
    var callback1 = sinon.stub();
    var callback2 = sinon.stub();
    mockRaf.raf(callback1);
    mockRaf.raf(callback2);
    mockRaf.step();
    assert(callback1.called);
    assert(callback2.called);
  });

  it('should remove the callbacks once they have been called', function () {
    var callback = sinon.stub();
    mockRaf.raf(callback);
    mockRaf.step();
    callback.reset();
    mockRaf.step();
    assert(callback.notCalled);
  });

  it('should remove all callbacks when calling cancel without arguments', function () {
    var callback = sinon.stub();
    mockRaf.raf(callback);
    mockRaf.cancel();
    mockRaf.step();
    assert(callback.notCalled);
  });

  it('should only remove the specified callback when calling cancel with a callback ID', function () {
    const callback1 = sinon.stub();
    const callback2 = sinon.stub();
    var id1 = mockRaf.raf(callback1);
    mockRaf.raf(callback2);
    mockRaf.cancel(id1);
    mockRaf.step();
    assert(callback1.notCalled);
    assert(callback2.called);
  });

  it('should advance the mocked time coordinate when calling step', function () {
    var initialTime = mockRaf.now();
    mockRaf.step({
      time: 1
    });
    assert.equal(initialTime + 1, mockRaf.now());
  });

  it('should properly advance time for several steps', function () {
    var initialTime = mockRaf.now();
    mockRaf.step({
      time: 1,
      count: 2
    });
    assert.equal(initialTime + 2, mockRaf.now());
  });

  it('should call the callbacks only once for several steps', function () {
    var callback = sinon.stub();
    mockRaf.raf(callback);
    mockRaf.step({
      count: 2
    });
    assert(callback.calledOnce);
  });

  it('should only remove callbacks which have been called', function () {
    var callback2 = sinon.stub();
    var callback1 = function() {
      mockRaf.raf(callback2);
    };
    mockRaf.raf(callback1);
    mockRaf.step();
    assert(callback2.notCalled);
    mockRaf.step();
    assert(callback2.called);
  });
});
