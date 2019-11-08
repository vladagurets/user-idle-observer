(function () {
  "use strict";

  function observer (opts) {

  }

  if (typeof module !== "undefined" && module.exports) {
		observer.default = observer;
		module.exports = observer;
	} else if (typeof define === "function" && typeof define.amd === "object" && define.amd) {
		// register as "observer", consistent with npm package name
		define("user-idle-observer", [], function () {
			return observer;
		});
	} else {
		window.userIDLEObserver = observer;
  }
}());