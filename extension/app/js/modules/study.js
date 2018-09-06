var _host = "https://ankiweb.net";
var _ihost = "https://ankiuser.net";

import rotateDeck from "../extended/rotateDeck.js";

    /**
     * @param {!Object} obj
     * @return {?}
     */
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        "default" : obj
      };
    }
    var _larouxAjaxJs = window.$; //require("jquery");
    var _larouxAjaxJs2 = _interopRequireDefault(_larouxAjaxJs);
    /**
     * @return {?}
     * @this {!String}
     */
    String.prototype.format = function() {
      /** @type {!RegExp} */
      var trimRegex = /\{\d+\}/g;
      /** @type {!Arguments} */
      var PL$23 = arguments;
      return this.replace(trimRegex, function(_testModuleName) {
        return PL$23[_testModuleName.match(/\d+/)];
      });
    };
    var defaults = {
      state : "initial",
      lastCardShown : 0,
      currentCard : null,
      activityCount : 0,
      CID : 0,
      CQUESTION : 1,
      CANSWER : 2,
      CQUEUE : 3,
      CNID : 4,
      CINTS : 5,
      CORD : 6,
      deck : {
        stats : [0, 0, 0],
        cards : [],
        answers : []
      },
      targetURL : null,
      zoom : 1,
      cacheBust : 1,
      initStudy : function() {
        var self = this;
        (0, _larouxAjaxJs2["default"])("#overview").hide();
        (0, _larouxAjaxJs2["default"])("#quiz").show();
        /**
         * @return {?}
         */
        window.onbeforeunload = function() {
          return self.deck.answers.length ? "Please save first." : null;
        };
        (0, _larouxAjaxJs2["default"])(document).keyup(function(event) {
          if (event.which >= 49 && event.which <= 52) {
            self.answerCard(event.which - 48);
          }
        });
        (0, _larouxAjaxJs2["default"])("content").addClass("contentAjax");
        this.checkForNextCard();
      },
      getNextCard : function() {
        this.currentCard = this.deck.cards.shift();
      },
      getCards : function(options) {
        var self = this;
        if (null == options && (options = false), 0 !== this.deck.cards.length && !options) {
          return this.drawQuestion();
        }
        if (0 === this.deck.cards.length) {
          this.showWaiting();
        }
        var answers = this.deck.answers;
        /** @type {!Array} */
        this.deck.answers = [];
        var slug = {
          answers : answers
        };
        if (options) {
          /** @type {boolean} */
          slug.force = true;
        }
        this.getJSON(_ihost + "/study/getCards", slug, function(data) {
          if (self.targetURL) {
            return void(window.parent.location = self.targetURL);
          }
          if (self.hideWaiting(), options) {
            return void self.updateStatus();
          }
          if (data.error) {
            alert("Your collection is in an inconsistent state. Please use Tools>Check Database on the computer version.");
          }
          self.deck.stats = data.counts;
          /** @type {boolean} */
          var _n = true;
          /** @type {boolean} */
          var i = false;
          var a = void 0;
          try {
            var $__6;
            var _i = Array.from(data.cards)[Symbol.iterator]();
            for (; !(_n = ($__6 = _i.next()).done); _n = true) {
              var item = $__6.value;
              self.deck.cards.push(item);
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
          if (self.deck.cards.length) {
            (function() {
              rotateDeck();
              self.drawQuestion();
            })();
          } else {
            rotateDeck(window.location.reload.bind(window.location));
          }
        });
      },
      saveThenGoto : function(_) {
        this.targetURL = _host + _;
        this.getCards(true);
      },
      checkForNextCard : function() {
        /** @type {string} */
        this.state = "initial";
        (0, _larouxAjaxJs2["default"])("#qa").html("");
        this.vhide("#easebuts");
        this.vshow("#quiz");
        this.getCards();
      },
      save : function() {
        if (this.deck.answers.length) {
          this.getCards(true);
        }
      },
      drawQuestion : function() {
        if ("initial" === this.state) {
          this.getNextCard();
          /** @type {string} */
          this.state = "questionShown";
          /** @type {number} */
          this.lastCardShown = (new Date).getTime();
          this.updateStatus();
          var feedbackicons = (0, _larouxAjaxJs2["default"])("#qa_box");
          /** @type {string} */
          feedbackicons[0].className = "card card" + (this.currentCard[this.CORD] + 1);
          this.wrappedQA("q");
          this._resizeFonts();
          this.vshow("#ansbut");
          (0, _larouxAjaxJs2["default"])("#ansbuta").focus();
          document.getElementById("quiz").scrollIntoView();
        }
      },
      drawAnswer : function() {
        var name = void 0;
        if ("questionShown" !== this.state) {
          return false;
        }
        var value = this._getButtons();
        /** @type {string} */
        var miss_badge = "<center><table><tr>";
        /** @type {boolean} */
        var _n = true;
        /** @type {boolean} */
        var i = false;
        var o = void 0;
        try {
          var $__6;
          var _i = Array.from(value)[Symbol.iterator]();
          for (; !(_n = ($__6 = _i.next()).done); _n = true) {
            var item = $__6.value;
            var _class = void 0;
            if ("Good" === item[1]) {
              /** @type {string} */
              _class = "btn-primary";
              name = item[0];
            } else {
              /** @type {string} */
              _class = "btn-secondary";
            }
            /** @type {string} */
            miss_badge = miss_badge + ("<td valign=top align=center>\n" + item[2] + "<br><button id=ease" + item[0] + ' class="btn ' + _class + ' btn-lg"\n>' + item[1] + "</button></td>");
          }
        } catch (tObj) {
          /** @type {boolean} */
          i = true;
          o = tObj;
        } finally {
          try {
            if (!_n && _i["return"]) {
              _i["return"]();
            }
          } finally {
            if (i) {
              throw o;
            }
          }
        }
        /** @type {string} */
        miss_badge = miss_badge + "</tr></table></center>";
        this.vhide("#ansbut");
        (0, _larouxAjaxJs2["default"])("#easebuts").html(miss_badge);
        /** @type {string} */
        this.state = "answerShown";
        this.vshow("#easebuts");
        this.wrappedQA("a");
        this._resizeFonts();
        (0, _larouxAjaxJs2["default"])("#ease" + name).focus();
        /** @type {(Element|null)} */
        var elem = document.getElementById("answer");
        return elem && setTimeout(function() {
          elem.scrollIntoView();
        }, 10), false;
      },
      _getButtons : function() {
        var expRecords = this.currentCard[this.CINTS];
        return 4 === expRecords.length ? [[1, "Again", expRecords[0]], [2, "Hard", expRecords[1]], [3, "Good", expRecords[2]], [4, "Easy", expRecords[3]]] : 3 === expRecords.length ? [[1, "Again", expRecords[0]], [2, "Good", expRecords[1]], [3, "Easy", expRecords[2]]] : [[1, "Again", expRecords[0]], [2, "Good", expRecords[1]]];
      },
      answerCard : function(ease) {
        if ("answerShown" === this.state) {
          if (!(ease > this.currentCard[this.CINTS].length)) {
            /** @type {string} */
            this.state = "initial";
            this.deck.answers.push([this.currentCard[this.CID], ease, (new Date).getTime() - this.lastCardShown]);
            /** @type {null} */
            this.currentCard = null;
            this.checkForNextCard();
          }
        }
      },
      updateStatus : function() {
        var id = void 0;
        var e = void 0;
        var count = void 0;
        var data = this.deck.stats;
        if (this.currentCard) {
          var i = this.currentCard[this.CQUEUE];
          e = "<font color=#990000>{0}</font>".format(data[1]);
          count = "<font color=#009900>{0}</font>".format(data[2]);
          id = "<font color=#0000ff>{0}</font>".format(data[0]);
          if (0 === i) {
            id = "<u>{0}</u>".format(id);
          } else {
            if (1 === i) {
              e = "<u>{0}</u>".format(e);
            } else {
              count = "<u>{0}</u>".format(count);
            }
          }
          (0, _larouxAjaxJs2["default"])("#rightStudyMenu").html("{0} + {1} + {2}".format(id, e, count));
        } else {
          /** @type {number} */
          e = 0;
          /** @type {number} */
          count = 0;
          /** @type {number} */
          id = 0;
          (0, _larouxAjaxJs2["default"])("#rightStudyMenu").html("");
        }
        /** @type {string} */
        var html = "";
        if (this.currentCard) {
          var s = void 0;
          /** @type {string} */
          html = "<a class='btn btn-secondary' onclick='study.saveThenGoto(\"/edit/{0}\")'>Edit</a> ".format(this.currentCard[this.CNID]) + html;
          /** @type {string} */
          s = this.deck.answers.length ? "btn btn-secondary" : "btn btn-secondary disabled";
          /** @type {string} */
          html = html + (" <a class='" + s + "' title=\"Save recent answers\" onclick='return study.save();'>Save</a>");
          /** @type {string} */
          html = html + '\n  <button class="btn btn-secondary" type="button" title="Bigger text" onclick="study.bigger();">+</button>\n  <button class="btn btn-secondary" type="button" title="Smaller text" onclick="study.smaller();">-</button>\n';
        }
        (0, _larouxAjaxJs2["default"])("#leftStudyMenu").html(html);
      },
      randomUniform : function(min, max) {
        return Math.random() * (max - min) + min;
      },
      vshow : function(type) {
        return (0, _larouxAjaxJs2["default"])(type).removeClass("invisible");
      },
      vhide : function(className) {
        return (0, _larouxAjaxJs2["default"])(className).addClass("invisible");
      },
      showWaiting : function() {
        return; //this.vshow("#activity");
      },
      hideWaiting : function() {
        return; //this.vhide("#activity");
      },
      showQuiz : function() {
        return this.vshow("#quiz");
      },
      getJSON : function(method, params, callback, options) {
        var img = this;
        if (null == options) {
          /** @type {boolean} */
          options = false;
        }
        /** @type {boolean} */
        var _n = true;
        /** @type {boolean} */
        var s = false;
        var l = void 0;
        try {
          var $__6;
          var _i = Object.keys(params || {})[Symbol.iterator]();
          for (; !(_n = ($__6 = _i.next()).done); _n = true) {
            var item = $__6.value;
            /** @type {string} */
            params[item] = JSON.stringify(params[item]);
          }
        } catch (lightThemeBackground) {
          /** @type {boolean} */
          s = true;
          l = lightThemeBackground;
        } finally {
          try {
            if (!_n && _i["return"]) {
              _i["return"]();
            }
          } finally {
            if (s) {
              throw l;
            }
          }
        }
        /** @type {number} */
        params.ts = (new Date).getTime();
        if (!options) {
          this.showWaiting();
        }
        var jqXHR = _larouxAjaxJs2["default"].post(method, params, function(identifierPositions) {
          try {
            callback(identifierPositions);
          } catch (e) {
            console.warn(e);
            try {
              console.warn(e.stack);
            } catch (e) {
            }
          }
        }, "json");
        jqXHR.fail(function(canCreateDiscussions, isSlidingUp, dontForceConstraints) {
          img.hideWaiting();
          alert("Error while sending a request to the server. This may happen if a lot of new tabs have been opened at once or several questions have been reviewed really quickly. If this keeps happening, you may increase the interleaving number on the options page or contact the dev at ankitab@albert.sh. Reloading...");
          window.location.reload();
        });
      },
      wrappedQA : function(upper) {
        var l1i = "q" === upper ? this.CQUESTION : this.CANSWER;
        var r1 = this.currentCard[l1i];
        /** @type {string} */
        var c2 = "";
        /** @type {number} */
        var targetIndex = 1;
        /**
         * @param {?} wordVal
         * @param {string} str
         * @return {?}
         */
	let scripts=[];
        var opening_ellipsis = function(wordVal, str) {
          if (/.mp3/i.test(str)) {
            /** @type {string} */
            var node = '<div style="display: inline-block;" id="_player_' + targetIndex + '"></div>\n<div style="display: inline-block; font-size: 20px !important;" id="jp_container_' + targetIndex + '">\n <a href="#" class="jp-play">Play</a>\n <a href="#" class="jp-pause">Pause</a>\n</div>'; 
            scripts.push({targetIndex, str});
            targetIndex = targetIndex + 1;
            return node;
          }
          return "";
        };
        r1 = r1.replace(/\[sound:(.+?)\]/g, opening_ellipsis);
	r1 = r1.replace(/\[\[type:.+?\]\]/g, "");
	r1 = r1 + c2;
        (0, _larouxAjaxJs2["default"])("#qa").html(r1);
	for(let i=0; i<scripts.length; i++){
		let targetIndex=scripts[i].targetIndex;
		let str=scripts[i].str;

		(0, _larouxAjaxJs2["default"])("#_player_"+targetIndex).jPlayer({
			ready: function () {
				(0, _larouxAjaxJs2["default"])(this).jPlayer("setMedia", {
					mp3: str
				});
			},
			ended: function () {
				(0, _larouxAjaxJs2["default"])(this).jPlayer("setMedia", {
					mp3: str
				});
			},
			error: function (event) {
				if (event.jPlayer.error.type == (0, _larouxAjaxJs2["default"]).jPlayer.error.URL) {
					(0, _larouxAjaxJs2["default"])("#jp_container_"+targetIndex+" .jp-play").text("(missing audio)");
				} else {
					console.warn("Error playing file: "+event.jPlayer.error.type);
				}
			},
			cssSelectorAncestor: "#jp_container_"+targetIndex,
			swfPath: "/static/",
			supplied: "mp3",
			errorAlerts: true,
			preload:"none"
		});
	}
      },
      showDesc : function() {
        return (0, _larouxAjaxJs2["default"])("#shortdesc").hide(), (0, _larouxAjaxJs2["default"])("#fulldesc").show(), false;
      },
      bigger : function() {
        this._adjSize(.1);
      },
      smaller : function() {
        this._adjSize(-.1);
      },
      _adjSize : function(a) {
        this.zoom += a;
        this._resizeFonts();
      },
      _resizeFonts : function() {
        (0, _larouxAjaxJs2["default"])("#qa, #qa *").css("zoom", this.zoom);
      }
    };
    (0, _larouxAjaxJs2["default"])(function() {
      return (0, _larouxAjaxJs2["default"])("#studynow").focus();
    });
    export default defaults;
