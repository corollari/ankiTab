require.register("tools.js", function(__webpack_exports__, require, canCreateDiscussions) {
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default" : obj
      };
    }
    Object.defineProperty(__webpack_exports__, "__esModule", {
      value : true
    });
    var _prepareStyleProperties = require("jquery");
    var _prepareStyleProperties2 = _interopRequireDefault(_prepareStyleProperties);
    var addLifecycleMethods = {
      renderTimestamps : function() {
        (0, _prepareStyleProperties2["default"])(".timestamp").each(function(canCreateDiscussions, isSlidingUp) {
          (0, _prepareStyleProperties2["default"])(this).text((new Date(1E3 * (0, _prepareStyleProperties2["default"])(this).text())).toLocaleDateString());
        });
      }
    };
    __webpack_exports__["default"] = addLifecycleMethods;
  });

