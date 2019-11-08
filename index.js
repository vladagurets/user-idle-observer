(function () {
  "use strict";

  var THROTTLE_DELAY = 100;
  var INTERVAL_PERIOD = 500;
  var LISTENERS_NAMES = ["mousemove", "mousedown", "keydown", "scroll", "touchstart"]

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
   * @param {Array} opts.fireCbOn - fire callback on each IDLE time, each time should be in ms
   * @param {Function} opts.cb - callback that will triger after opts.fireCbOn of user's IDLE
   * @example 
   * | userIDLEObserver({
   * |  fireCbOn: [500, 10000, 60500],
   * |  cb: function () {...}
   * | });
   */
  function observer (_opts) {
    var interval = null;
    var idleTime = 0;
    var opts = {
      fireCbOn: _opts.fireCbOn || [],
      cb: (_opts || {}).cb || function () {}
    };

    function refreshIDLEInterval() {
      _clearInterval(interval);
      interval = setInterval(() => {
        idleTime += INTERVAL_PERIOD;

        for (var i = 0; i < opts.fireCbOn.length; i++) {
          var idleCursor = opts.fireCbOn[i];
          // Call opt.cb on specified IDLE time
          if (idleTime <= idleCursor && idleCursor < idleTime + INTERVAL_PERIOD) {
            opts.cb({idle: idleCursor})
          }
        }
      }, INTERVAL_PERIOD);
    }

    function _clearInterval() {
      clearInterval(interval);
      interval = null;
      idleTime = 0;
    }

    // Using throttle for performance reasons
    var throttledStartInterval = throttle(refreshIDLEInterval, THROTTLE_DELAY)

    // Create listeners for each user action
    for (var i = 0; i < LISTENERS_NAMES.length; i++) {
      window.addEventListener(LISTENERS_NAMES[i], throttledStartInterval);
    }

    // Start first interval on init
    refreshIDLEInterval();
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