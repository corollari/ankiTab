require.register("decks.js", function(obj, require, canCreateDiscussions) {
    /**
     * @param {!Object} obj
     * @return {?}
     */
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default" : obj
      };
    }
    Object.defineProperty(obj, "__esModule", {
      value : true
    });
    var _larouxAjaxJs = require("jquery");
    var _larouxAjaxJs2 = _interopRequireDefault(_larouxAjaxJs);
    var proto = {
      init : function() {
        this.updateTimezone();
      },
      actOn : function(id) {
        var top_vals_el = (0, _larouxAjaxJs2["default"])("#did" + id);
        top_vals_el.append('<img id=act src="/static/activity.gif">');
      },
      actOff : function() {
        (0, _larouxAjaxJs2["default"])("#act").remove();
      },
      select : function(value) {
        var e = this;
        this.actOn(value);
        /** @type {string} */
        var ajax_url = "select/" + value;
        _larouxAjaxJs2["default"].post(ajax_url, {}, function(canCreateDiscussions) {
          e.actOff();
          window.location = _host + "/study/";
        });
      },
      deckok : function(timespan) {
        return !/::$|^::|::::/.test(timespan);
      },
      rem : function(value) {
        var e = this;
        return "1" === value ? void alert("The default deck can not be removed at the moment. You can delete cards that are inside it with the computer version.") : void(confirm("Delete all cards in deck? This can not be undone.") && (this.actOn(value), _larouxAjaxJs2["default"].getJSON("delete", {
          id : value
        }, function(canCreateDiscussions) {
          e.actOff();
          window.location.reload();
        })));
      },
      share : function(type) {
        if ("1" === type) {
          /** @type {string} */
          var anonUsersRooms = "Unfortunately the default deck can't be shared at the moment. Please move your cards into a new deck using the computer version, and then try again.";
          return void alert(anonUsersRooms);
        }
        /** @type {string} */
        window.location = "/decks/share/" + type;
      },
      rename : function(id) {
        var e = this;
        var stash = (0, _larouxAjaxJs2["default"])("#did" + id);
        var current = stash.data("full");
        /** @type {(null|string)} */
        var val = prompt("Enter new name", current);
        if (val && current !== val) {
          if (!this.deckok(val)) {
            return void alert("Invalid name");
          }
          this.actOn(id);
          _larouxAjaxJs2["default"].getJSON("rename", {
            id : id,
            "new" : val
          }, function(testsStatus) {
            e.actOff();
            if ("ok" === testsStatus.status) {
              window.location.reload();
            } else {
              if ("exists" === testsStatus.status) {
                alert("The provided deck already exists.");
              }
            }
          });
        }
      },
      updateTimezone : function() {
        /** @type {number} */
        var dx_start = (new Date).getTimezoneOffset();
        _larouxAjaxJs2["default"].post("/decks/updateTimezone", {
          offset : dx_start
        }, function(result) {
          if (result.needRefresh) {
            location.reload(true);
          }
        }).fail(function() {
          return window.alert("Error communicating with server.");
        });
      }
    };
    (0, _larouxAjaxJs2["default"])(function() {
      return proto.init();
    });
    obj["default"] = proto;
  });

