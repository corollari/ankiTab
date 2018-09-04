require.register("options.js", function(t, require, canCreateDiscussions) {
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default" : obj
      };
    }
    Object.defineProperty(t, "__esModule", {
      value : true
    });
    var _larouxAjaxJs = require("jquery");
    var _larouxAjaxJs2 = _interopRequireDefault(_larouxAjaxJs);
    var val = {
      confs : [],
      deck : null,
      idx : null,
      init : function() {
        var sawsKnob = this;
        this.drawConfs();
        this.readOpts();
        (0, _larouxAjaxJs2["default"])("#confs").change(function() {
          return sawsKnob.onChange();
        });
      },
      drawConfs : function() {
        var result = (0, _larouxAjaxJs2["default"])("#confs");
        result.empty();
        /** @type {number} */
        var idx = 0;
        /** @type {boolean} */
        var _n = true;
        /** @type {boolean} */
        var n = false;
        var i = void 0;
        try {
          var $__6;
          var _i = Array.from(this.confs)[Symbol.iterator]();
          for (; !(_n = ($__6 = _i.next()).done); _n = true) {
            var item = $__6.value;
            (0, _larouxAjaxJs2["default"])("<option value=" + idx + ">" + item.name + "</option>").appendTo(result);
            if (item.id.toString() === this.deck.conf.toString()) {
              /** @type {number} */
              this.idx = idx;
            }
            idx++;
          }
        } catch (contactCapacity) {
          /** @type {boolean} */
          n = true;
          i = contactCapacity;
        } finally {
          try {
            if (!_n && _i["return"]) {
              _i["return"]();
            }
          } finally {
            if (n) {
              throw i;
            }
          }
        }
        result.val(this.idx);
      },
      readOpts : function() {
        var opts = this.confs[this.idx];
        (0, _larouxAjaxJs2["default"])("#newDay").val(opts["new"].perDay);
        (0, _larouxAjaxJs2["default"])("#revDay").val(opts.rev.perDay);
      },
      writeOpts : function(opts) {
        var req_group = {
          revDay : (0, _larouxAjaxJs2["default"])("#revDay").val(),
          newDay : (0, _larouxAjaxJs2["default"])("#newDay").val()
        };
        _larouxAjaxJs2["default"].post("saveOpts", {
          data : JSON.stringify(req_group)
        }, function(canCreateDiscussions) {
          if (opts) {
            opts();
          }
        });
      },
      save : function() {
        return this.writeOpts(function() {
          /** @type {string} */
          window.location = "/study/";
        }), false;
      }
    };
    (0, _larouxAjaxJs2["default"])(function() {
      return val.init();
    });
    t["default"] = val;
  });

