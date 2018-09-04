  require.register("sharedlist.js", function(exports, require, canCreateDiscussions) {
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default" : obj
      };
    }
    Object.defineProperty(exports, "__esModule", {
      value : true
    });
    var _prepareStyleProperties = require("jquery");
    var _prepareStyleProperties2 = _interopRequireDefault(_prepareStyleProperties);
    var plugin = {
      init : function() {
        this.sortStars();
      },
      cmp : function(b, a) {
        return b > a ? 1 : b < a ? -1 : 0;
      },
      sortStars : function() {
        var _ = this;
        /**
         * @param {number} s
         * @param {number} n
         * @return {?}
         */
        var f = function(s, n) {
          if (0 === n) {
            return 0;
          }
          /** @type {number} */
          var sum = 1.96;
          /** @type {number} */
          var k = 1 * s / n;
          return (k + sum * sum / (2 * n) - sum * Math.sqrt((k * (1 - k) + sum * sum / (4 * n)) / n)) / (1 + sum * sum / n);
        };
        this.files.sort(function(values, keys) {
          var value = values[2];
          var key = value + values[3];
          var o = keys[2];
          var i = o + keys[3];
          var a = f(value, key);
          var b = f(o, i);
          return a || b ? _.cmp(b, a) : _.cmp(values[3], keys[3]);
        });
        this.render();
      },
      sortMod : function() {
        var res = this;
        this.files.sort(function(values, a) {
          return res.cmp(a[4], values[4]);
        });
        this.render();
      },
      sortTitle : function() {
        var treo = this;
        this.files.sort(function(lookupArray, explicitType) {
          return treo.cmp(lookupArray[1].toLowerCase(), explicitType[1].toLowerCase());
        });
        this.render();
      },
      render : function() {
        if (this.files.length) {
          /** @type {string} */
          var dots = "";
          /** @type {boolean} */
          var _n = true;
          /** @type {boolean} */
          var r = false;
          var n = void 0;
          try {
            var $__4;
            var _i = Array.from(this.files)[Symbol.iterator]();
            for (; !(_n = ($__4 = _i.next()).done); _n = true) {
              var s;
              var l;
              var dataWorkedMinutes;
              var value = $__4.value;
              if (this.decks) {
                dataWorkedMinutes = value[5];
                s = value[6] ? value[6] : "<font color='#eee'>0</span>";
                l = value[7] ? value[7] : "<font color='#eee'>0</span>";
              }
              /** @type {string} */
              dots = dots + ('<tr><td></td><td class=decktitle><a href="/shared/info/' + value[0] + '">' + value[1] + "</a></td>\n<td align=left>" + this.stars(value) + '</td>\n<td class="hidden-sm-down" align=left>' + this.mod(value[4]) + "</td>");
              if (this.decks) {
                /** @type {string} */
                dots = dots + ("<td align=right>" + dataWorkedMinutes + '</td>\n<td align=right class="hidden-sm-down">' + s + '</td>\n<td align=right class="hidden-sm-down">' + l + "</td>");
              }
            }
          } catch (numInternals) {
            /** @type {boolean} */
            r = true;
            n = numInternals;
          } finally {
            try {
              if (!_n && _i["return"]) {
                _i["return"]();
              }
            } finally {
              if (r) {
                throw n;
              }
            }
          }
          /** @type {string} */
          dots = dots + "</tr>";
          /** @type {string} */
          var message = '<table width=100%\ncellspacing=4><tr><th></th>\n<th align=left><a href="#" onclick="shared.sortTitle();return false;">Title</a></th>\n<th align=left><a href="#" onclick="shared.sortStars();return false;">Ratings</a></th>\n<th class="hidden-sm-down modcol"><a href="#" onclick="shared.sortMod();return false;">Modified</a></th>';
          if (this.decks) {
            /** @type {string} */
            message = message + '<th align=right>Notes</th><th align=right class="hidden-sm-down">Audio</th>\n<th align=right class="hidden-sm-down">Images</th>';
          }
          /** @type {string} */
          message = message + "</tr>";
          /** @type {string} */
          dots = message + dots + "</table>";
          if (1E3 === this.files.length) {
            /** @type {string} */
            dots = dots + "<p>More that 1000 matches found; please narrow your search.";
          }
          (0, _prepareStyleProperties2["default"])("#list").html(dots);
        }
      },
      stars : function(params) {
        var originalWidth = params[2] + params[3];
        /** @type {number} */
        var r = Math.round(params[2] / originalWidth * 25);
        return '<table><tr><td><div class="likebar dislike"><div class="likebar like" style="width: ' + r + 'px;"></div></div></td><td>' + originalWidth + "</td></tr></table>";
      },
      mod : function(n) {
        /** @type {!Date} */
        var dCurrent = new Date(n = n * 1E3);
        /** @type {number} */
        var objName = dCurrent.getMonth() + 1;
        if (objName < 10) {
          /** @type {string} */
          objName = "0" + objName;
        }
        /** @type {number} */
        var i = dCurrent.getDate();
        return i < 10 && (i = "0" + i), dCurrent.getFullYear() + "-" + objName + "-" + i;
      },
      search : function() {
        window.location = "/shared/decks/" + (0, _prepareStyleProperties2["default"])("#q").val();
      }
    };
    (0, _prepareStyleProperties2["default"])(function() {
      return plugin.init();
    });
    exports["default"] = plugin;
  });

