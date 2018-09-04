require.register("editor.js", function(exports, require, canCreateDiscussions) {
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
    var calculateBonus = function() {
      /**
       * @param {?} set
       * @param {number} value
       * @return {?}
       */
      function get(set, value) {
        /** @type {!Array} */
        var p = [];
        /** @type {boolean} */
        var _n = true;
        /** @type {boolean} */
        var i = false;
        var a = void 0;
        try {
          var info;
          var _i = set[Symbol.iterator]();
          for (; !(_n = (info = _i.next()).done) && (p.push(info.value), !value || p.length !== value); _n = true) {
          }
        } catch (nativeObjectObject) {
          /** @type {boolean} */
          i = true;
          a = nativeObjectObject;
        } finally {
          try {
            if (!_n && _i["return"]) {
              _i["return"]();
            }
          } finally {
            if (i) {
              throw a;
            }
          }
        }
        return p;
      }
      return function(arr, format) {
        if (Array.isArray(arr)) {
          return arr;
        }
        if (Symbol.iterator in Object(arr)) {
          return get(arr, format);
        }
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      };
    }();
    var _larouxAjaxJs = require("jquery");
    var _larouxAjaxJs2 = _interopRequireDefault(_larouxAjaxJs);
    var options = {
      version : "20170111",
      data : [],
      init : function() {
        if ("add" === this.mode) {
          this.setupModels();
          this.setupDecks();
        } else {
          (0, _larouxAjaxJs2["default"])("#modelarea").hide();
          (0, _larouxAjaxJs2["default"])("#save2").show();
          this.drawFields();
          this.fillFields();
        }
      },
      setupModels : function() {
        var component = this;
        /** @type {string} */
        var scrolltable = "";
        /** @type {number} */
        var rot = 0;
        this.models.sort(function(a, termB) {
          return a.name.localeCompare(termB.name);
        });
        /** @type {boolean} */
        var _n = true;
        /** @type {boolean} */
        var i = false;
        var a = void 0;
        try {
          var $__6;
          var _i = Array.from(this.models)[Symbol.iterator]();
          for (; !(_n = ($__6 = _i.next()).done); _n = true) {
            var BgnChannelSelected;
            var item = $__6.value;
            if (item.id.toString() === this.curModelID.toString()) {
              /** @type {string} */
              BgnChannelSelected = "selected";
              this.curModel = item;
            } else {
              /** @type {string} */
              BgnChannelSelected = "";
            }
            /** @type {string} */
            scrolltable = scrolltable + ("<option " + BgnChannelSelected + " value=" + rot + ">" + item.name + "</option>");
            /** @type {number} */
            rot = rot + 1;
          }
        } catch (nativeObjectObject) {
          /** @type {boolean} */
          i = true;
          a = nativeObjectObject;
        } finally {
          try {
            if (!_n && _i["return"]) {
              _i["return"]();
            }
          } finally {
            if (i) {
              throw a;
            }
          }
        }
        (0, _larouxAjaxJs2["default"])("#models").html(scrolltable);
        (0, _larouxAjaxJs2["default"])("#models").change(function() {
          return component.onModelChange();
        });
        this.onModelChange();
      },
      setupDecks : function() {
        /** @type {!Array} */
        var results = [];
        var index;
        for (index in this.decks) {
          var entry = this.decks[index];
          results.push(entry.name);
        }
        results.sort();
        (0, _larouxAjaxJs2["default"])("#deck").completer({
          source : results,
          suggest : true
        });
      },
      onModelChange : function() {
        var i = (0, _larouxAjaxJs2["default"])("#models").val();
        this.curModel = this.models[i];
        var inCase = this.decks[this.curModel.did];
        if (inCase) {
          (0, _larouxAjaxJs2["default"])("#deck").val(inCase.name);
        } else {
          (0, _larouxAjaxJs2["default"])("#deck").val("Default");
        }
        this.drawFields();
      },
      drawFields : function() {
        /** @type {string} */
        var scrolltable = "";
        /** @type {number} */
        var st = 0;
        /** @type {!Array} */
        var streams = [];
        /** @type {boolean} */
        var _n = true;
        /** @type {boolean} */
        var a = false;
        var s = void 0;
        try {
          var $__6;
          var _i = Array.from(this.curModel.flds)[Symbol.iterator]();
          for (; !(_n = ($__6 = _i.next()).done); _n = true) {
            var item = $__6.value;
            streams.push([item.name, st]);
            st++;
          }
        } catch (seocounter_meta) {
          /** @type {boolean} */
          a = true;
          s = seocounter_meta;
        } finally {
          try {
            if (!_n && _i["return"]) {
              _i["return"]();
            }
          } finally {
            if (a) {
              throw s;
            }
          }
        }
        streams.push(["Tags", -1]);
        /** @type {boolean} */
        var _iteratorNormalCompletion = true;
        /** @type {boolean} */
        var h = false;
        var v = void 0;
        try {
          var $__6;
          var _iterator = Array.from(streams)[Symbol.iterator]();
          for (; !(_iteratorNormalCompletion = ($__6 = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var v3LineColour = calculateBonus($__6.value, 2);
            var b = v3LineColour[0];
            var g = v3LineColour[1];
            /** @type {string} */
            scrolltable = scrolltable + ('\n<div class="form-group row">\n    <label for="f' + g + '" class="col-2 col-form-label">' + b + '</label>\n    <div class="col-10"><div class="form-control" id="f' + g + '" contentEditable></div></div>\n</div>\n');
          }
        } catch (ngAppScriptsVer) {
          /** @type {boolean} */
          h = true;
          v = ngAppScriptsVer;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (h) {
              throw v;
            }
          }
        }
        (0, _larouxAjaxJs2["default"])("#fields").html(scrolltable);
        this.setFonts();
      },
      setFonts : function() {
        /** @type {number} */
        var channelId = 0;
        Array.from(this.curModel.flds).map(function(attrs) {
          return (0, _larouxAjaxJs2["default"])("#f" + channelId).css("font-family", attrs.font).css("font-size", attrs.size), channelId++;
        });
      },
      fillFields : function() {
        /** @type {number} */
        var i = 0;
        for (; i < this.curModel.flds.length; i++) {
          (0, _larouxAjaxJs2["default"])("#f" + i).html(this.note[0][i]);
        }
        (0, _larouxAjaxJs2["default"])("#f-1").html(this.note[1].join(" "));
      },
      getFields : function() {
        /** @type {!Array} */
        var newNodeLists = [];
        /** @type {number} */
        var oo = 0;
        for (; oo < this.curModel.flds.length; oo++) {
          newNodeLists.push((0, _larouxAjaxJs2["default"])("#f" + oo).html());
        }
        return [newNodeLists, (0, _larouxAjaxJs2["default"])("#f-1").text()];
      },
      save : function() {
        var $scope = this;
        var fields = this.getFields();
        /** @type {boolean} */
        var _n = true;
        /** @type {boolean} */
        var n = false;
        var i = void 0;
        try {
          var $__6;
          var _i = Array.from(fields)[Symbol.iterator]();
          for (; !(_n = ($__6 = _i.next()).done); _n = true) {
            var item = $__6.value;
            if (/src="data:/.test(item) || /webkit-fake-url/.test(item)) {
              return void alert("Sorry, adding embedded images via AnkiWeb is not currently supported. Please use the computer version or a mobile client.");
            }
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
        var data = {
          nid : this.nid,
          data : JSON.stringify(fields),
          csrf_token : this.csrf_token2
        };
        if (!this.nid) {
          data.mid = this.curModel.id;
          data.deck = (0, _larouxAjaxJs2["default"])("#deck").val();
        }
        _larouxAjaxJs2["default"].post("/edit/save", data, function(canCreateDiscussions) {
          if ($scope.nid) {
            return void(window.location = "/study/");
          }
          if (0 === canCreateDiscussions) {
            return void alert("No cards could be created with the provided fields.");
          }
          $scope.showMsg("Added.");
          /** @type {number} */
          var i = 0;
          return function() {
            /** @type {!Array} */
            var arrN = [];
            /** @type {boolean} */
            var _n = true;
            /** @type {boolean} */
            var i = false;
            var a = void 0;
            try {
              var _step4;
              var _i = Array.from($scope.curModel.flds)[Symbol.iterator]();
              for (; !(_n = (_step4 = _i.next()).done); _n = true) {
                item = _step4.value;
                if (0 === i) {
                  (0, _larouxAjaxJs2["default"])("#f" + i).focus();
                }
                if (!item.sticky) {
                  (0, _larouxAjaxJs2["default"])("#f" + i).html("");
                }
                arrN.push(i++);
              }
            } catch (nativeObjectObject) {
              /** @type {boolean} */
              i = true;
              a = nativeObjectObject;
            } finally {
              try {
                if (!_n && _i["return"]) {
                  _i["return"]();
                }
              } finally {
                if (i) {
                  throw a;
                }
              }
            }
            return arrN;
          }();
        }).fail(function() {
          return window.alert("Error saving.");
        });
      },
      showMsg : function(data) {
        window.scrollTo(0, 1);
        (0, _larouxAjaxJs2["default"])("#msg").show().text(data).fadeOut(3E3);
      }
    };
    exports["default"] = options;
  });

