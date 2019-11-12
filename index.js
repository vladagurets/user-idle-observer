(function () {
  "use strict";

  var THROTTLE_DELAY = 100;
  var LISTENERS_NAMES = ["mousemove", "mousedown", "keydown", "scroll", "touchstart", "resize", "visibilitychange"];

  function throttle(func, ms) {
    var isThrottled = false,
        savedArgs,
        savedThis;
  
    function wrapper() {
      if (isThrottled) {
        savedArgs = arguments;
        savedThis = this;
        return;
      }
      func.apply(this, arguments);
      isThrottled = true;
      setTimeout(function() {
        isThrottled = false;
        if (savedArgs) {
          wrapper.apply(savedThis, savedArgs);
          savedArgs = savedThis = null;
        }
      }, ms);
    }
    return wrapper;
  }

  /**
   * @param {object} opts - observer options
   * @param {Number} opts.idleTime - fire callback on user inactivity time in ms
   * @param {Function} opts.cb - callback that will triger after opts.idleTime of user's IDLE
   * @example 
   * | userIDLEObserver({
   * |  idleTime: 3000,
   * |  cb: function () {...},
   * |  listeners: ["mousemove", "mousedown", "keydown"]
   * | });
   */
  function observer (_opts) {
    var _currentIDLETime = 0;
    var interval = null;
    var opts = {
      cb: _opts.cb || console.log,
      idleTime: _opts.idleTime || 2000,
      listeners: _opts.listeners || LISTENERS_NAMES
    };

    function refreshIDLEInterval() {
      _clearInterval(interval);
      interval = setInterval(() => {
        _currentIDLETime += opts.idleTime;
        opts.cb(_currentIDLETime);
      }, opts.idleTime);
    }

    // Using throttle for performance reasons
    var throttledStartInterval = throttle(refreshIDLEInterval, THROTTLE_DELAY)

    function _initListeners () {
      // Create listeners for each user action
      for (var i = 0; i < opts.listeners.length; i++) {
        window.addEventListener(opts.listeners[i], throttledStartInterval);
      }
    }

    function _clearInterval() {
      _currentIDLETime = 0;
      clearInterval(interval);
      interval = null;
    }

    function destroy () {
      _clearInterval();
      // Destroy listeners for each user action
      for (var i = 0; i < opts.listeners.length; i++) {
        window.removeEventListener(opts.listeners[i], throttledStartInterval);
      }
    }

    // Init action listeners
    _initListeners();
  
    // Start first interval on init
    refreshIDLEInterval();

    return {
      destroy
    }
  }

  if (typeof module !== "undefined" && module.exports) {
		observer.default = observer;
		module.exports = observer;
	} else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
		define("user-idle-observer", [], function () {
			return observer;
		});
	} else {
		window.userIDLEObserver = observer;
  }
}());