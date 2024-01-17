//html5.js@

// Staging
InnityAd = function (id, host, level) {
  console.log("Ad " + id + " registered to host: " + host);
};
InnityAd.prototype.log = function (event, status) {
  this.trace(event + ": " + status);
};
InnityAd.prototype.trace = function (msg) {
  try {
    console.log(msg);
  } catch (e) {}
};
InnityVideo = function (eid, video, logger) {
  this.pauseTracker = function () {
    this.video.isTracking = false;
  };
  this.resumeTracker = function () {
    this.video.isTracking = true;
  };
  this.isTracking = true;
  this.video = video;
  this.video.eid = eid;
  this.video.view = false;
  this.video.started = false;
  this.video.playing = false;
  this.video.finished = false;
  this.video.played_00 = false;
  this.video.played_25 = false;
  this.video.played_50 = false;
  this.video.played_75 = false;
  this.video.logger = logger;
  this.video.mute = this.video.defaultMuted;
  this.video.addEventListener("play", this.videoHandler, false);
  this.video.addEventListener("pause", this.videoHandler, false);
  this.video.addEventListener("ended", this.videoHandler, false);
  this.video.addEventListener("timeupdate", this.onTimeupdate, false);
  this.video.addEventListener("volumechange", this.onVolumechange, false);
  this.video.addEventListener(
    "fullscreenchange",
    this.onFullscreenChange,
    false
  );
  this.video.addEventListener(
    "webkitfullscreenchange",
    this.onFullscreenChange,
    false
  );
  document.addEventListener(
    "mozfullscreenchange",
    this.onFullscreenChange,
    false
  );
  document.addEventListener(
    "MSFullscreenChange",
    this.onFullscreenChange,
    false
  );
  this.video.pm = function (msg, target) {
    try {
      parent.postMessage(msg, target);
    } catch (e) {}
  };
  try {
    console.log(
      "Video obj:" +
        video.id +
        ", id:" +
        eid +
        ", registered to logger: " +
        logger
    );
  } catch (e) {}
};
InnityVideo.prototype.videoHandler = function (e) {
  if (this.isTracking === false) {
    return;
  }
  if (this.started && e.type == "pause" && this.currentTime < this.duration) {
    this.logger.log(this.eid, "p");
    this.logger.log(this.eid + "_Pause", "c");
    this.logger.log(this.eid + "_Audio", "p");
    this.pm("interaction|" + this.eid + ",p", "*");
    this.pm("interaction|" + this.eid + "_Pause,c", "*");
    this.pm("interaction|" + this.eid + "_Audio,p", "*");
    this.playing = false;
  }
  if (this.started && e.type == "play") {
    this.logger.log(this.eid, "r");
    this.logger.log(this.eid + "_Play", "c");
    this.pm("interaction|" + this.eid + ",r", "*");
    this.pm("interaction|" + this.eid + "_Play,c", "*");
    if (this.volume > 0 && !this.mute) {
      this.logger.log(this.eid + "_Audio", "s");
      this.pm("interaction|" + this.eid + "_Audio,s", "*");
    }
    this.playing = true;
  }
  if (e.type == "play") {
    if (this.finished) {
      this.logger.log(this.eid + "_Replay", "c");
      this.pm("interaction|" + this.eid + "_Replay,c", "*");
      this.finished = false;
    }
  }
  if (e.type == "ended") {
    this.logger.log(this.eid, "f");
    this.pm("interaction|" + this.eid + ",f", "*");
    if (this.volume > 0 && !this.mute) {
      this.logger.log(this.eid + "_Audio", "f");
      this.pm("interaction|" + this.eid + "_Audio,f", "*");
    }
    this.started = false;
    this.playing = false;
    this.finished = true;
    this.played_25 = false;
    this.played_50 = false;
    this.played_75 = false;
    this.pm(InnityHTMLAd.trackingId + "_videoEnded", "*");
    this.pm("interaction|" + this.eid + "_100,c", "*");
  }
};
InnityVideo.prototype.onTimeupdate = function () {
  if (this.isTracking === false) {
    return;
  }
  if (this.currentTime >= 0 && !this.played_00) {
    this.played_00 = true;
    this.pm("interaction|" + this.eid + "_00,c", "*");
  }
  if (this.currentTime > 0 && !this.started) {
    if (this.volume > 0 && !this.mute) {
      this.logger.log(this.eid + "_Audio", "s");
      this.pm("interaction|" + this.eid + "_Audio,s", "*");
    }
    this.started = true;
    this.playing = true;
    this.logger.log(this.eid, "s");
    this.pm("interaction|" + this.eid + ",s", "*");
  }
  if (this.currentTime > this.duration * 0.25 && !this.played_25) {
    this.played_25 = true;
    this.logger.log(this.eid + "_25", "c");
    this.pm("interaction|" + this.eid + "_25,c", "*");
  }
  if (this.currentTime > this.duration * 0.5 && !this.played_50) {
    this.played_50 = true;
    this.logger.log(this.eid + "_50", "c");
    this.pm("interaction|" + this.eid + "_50,c", "*");
  }
  if (this.currentTime > this.duration * 0.75 && !this.played_75) {
    this.played_75 = true;
    this.logger.log(this.eid + "_75", "c");
    this.pm("interaction|" + this.eid + "_75,c", "*");
  }
  this.pm(
    InnityHTMLAd.id + "_current_time|" + Math.ceil(this.currentTime),
    "*"
  );
  this.pm(
    InnityHTMLAd.id +
      "_" +
      InnityHTMLAd.cb +
      "_current_time|" +
      Math.ceil(this.currentTime),
    "*"
  );
};
InnityVideo.prototype.onVolumechange = function () {
  if (this.muted) {
    this.mute = true;
    this.logger.log(this.eid + "_Mute", "c");
    this.pm("interaction|" + this.eid + "_Mute,c", "*");
    if (this.playing) {
      this.logger.log(this.eid + "_Audio", "p");
      this.pm("interaction|" + this.eid + "_Audio,p", "*");
    }
  }
  if (this.mute && !this.muted && this.volume > 0) {
    this.mute = false;
    this.logger.log(this.eid + "_Unmute", "c");
    this.pm("interaction|" + this.eid + "_Unmute,c", "*");
    if (this.playing) {
      this.logger.log(this.eid + "_Audio", "s");
      this.pm("interaction|" + this.eid + "_Audio,s", "*");
    }
  }
};
InnityVideo.prototype.onFullscreenChange = function () {
  InnityHTMLAd.pm(InnityHTMLAd.id + "_fullscreenChange", "*");
  InnityHTMLAd.pm(
    InnityHTMLAd.id + "_" + InnityHTMLAd.cb + "_fullscreenChange",
    "*"
  );
};

var InnityHTMLAd = {
  id: "test",
  host: "http://",
  urls: [],
  clickTrackings: [],
  vids: [],
  InnityVideos: [],
  dco: "",
  get cb() {
    if (typeof this.getParam === "function") {
      return this.getParam("cb");
    }
    if (typeof innityAd_getURLParameterData === "function") {
      return innityAd_getURLParameterData("cb");
    }
    return "";
  },
  init: function (initOnLoad) {
    this.initOnLoad = initOnLoad;
    if (this.initOnLoad) {
      this.InnityAd = new InnityAd(this.id, this.host, {
        pid: "ad-staging",
        autostart: this.autostart,
        intervalTracking: InnityHTMLAd.intervalTracking,
      });
    }
    var self = this;
    self.isReady = false;
    self.isLoaded = false;
    function _setAdReady() {
      if (!self.isReady) {
        self.setAdReady();
        self.isReady = true;
      }
    }
    function _setAdLoaded() {
      if (!self.isLoaded) {
        self.setAdLoaded();
        self.resizeHandler();
        self.isLoaded = true;
      }
    }
    try {
      window.addEventListener("DOMContentLoaded", _setAdReady, false);
      window.addEventListener("load", _setAdReady, false);
      window.addEventListener("load", _setAdLoaded, false);
    } catch (e) {}
    window.addEventListener("message", this.messageHandler, false);
    window.addEventListener("resize", this.resizeHandler, false);
  },
  track: function (event) {
    this.InnityAd.log(event, "c");
    this.pm("interaction|" + event + ",c", "*");
    this.pm(this.id + "_" + this.cb + "_track", "*");
  },
  startTimer: function (event) {
    this.InnityAd.log(event, "s");
    this.pm("interaction|" + event + ",s", "*");
    this.pm(this.id + "_" + this.cb + "_startTimer", "*");
  },
  stopTimer: function (event) {
    this.InnityAd.log(event, "p");
    this.pm("interaction|" + event + ",p", "*");
    this.pm(this.id + "_" + this.cb + "_stopTimer", "*");
  },
  resumeTimer: function (event) {
    this.InnityAd.log(event, "r");
    this.pm("interaction|" + event + ",r", "*");
    this.pm(this.id + "_" + this.cb + "_resumeTimer", "*");
  },
  attachVideo: function (obj) {
    this.vids.push(obj);
    // this.InnityVideo = new InnityVideo("_Video" + this.vids.length, obj, this.InnityAd);
    // this.InnityVideos.push(this.InnityVideo);

    /** update 20/Apr/2023 to support continue watch video button */
    let parsedVideoID = "_" + obj.id.charAt(0).toUpperCase() + obj.id.slice(1);
    this.InnityVideo = new InnityVideo(parsedVideoID, obj, this.InnityAd);
  },
  endVideo: function (event) {
    this.InnityAd.log(event, "f");
    this.pm("interaction|" + event + ",f", "*");
    this.pm(this.id + "_videoEnded", "*");
    this.pm(this.id + "_" + this.cb + "_videoEnded", "*");
  },
  impact: function () {
    this.pm(this.id + "_impact", "*");
    this.pm(this.id + "_" + this.cb + "_impact", "*");
  },
  engage: function () {
    this.pm(this.id + "_" + this.cb + "_engage", "*");
  },
  engaged: function () {
    this.pm(this.id + "_" + this.cb + "_engaged", "*");
  },
  expand: function () {
    this.pm(this.id + "_expand", "*");
    this.pm(this.id + "_" + this.cb + "_expand", "*");
  },
  expanded: function () {
    if (!this.initOnLoad) {
      this.InnityAd = new InnityAd(this.trackingId, this.host, {
        pid: auth_322386,
        autostart: true,
        intervalTracking: InnityHTMLAd.intervalTracking,
      });
    }
    this.pm(this.id + "_expanded", "*");
    this.pm(this.id + "_" + this.cb + "_expanded", "*");
    if (InnityHTMLAd.adFormat == 57) {
      //Mobile Pull Up
      InnityHTMLAd.moatApi.dispatch(
        InnityHTMLAd.isTeaser,
        false,
        InnityHTMLAd.moatApi.fullTrackableElement
      );
    }
  },
  subExpand: function () {
    this.pm(this.id + "_subExpand", "*");
    this.pm(this.id + "_" + this.cb + "_subExpand", "*");
  },
  subExpanded: function () {
    this.pm(this.id + "_subExpanded", "*");
    this.pm(this.id + "_" + this.cb + "_subExpanded", "*");
  },
  subShrink: function () {
    this.pm(this.id + "_subShrink", "*");
    this.pm(this.id + "_" + this.cb + "_subShrink", "*");
  },
  subShrinked: function () {
    this.pm(this.id + "_subShrinked", "*");
    this.pm(this.id + "_" + this.cb + "_subShrinked", "*");
  },
  shrink: function () {
    this.pm(this.id + "_shrink", "*");
    this.pm(this.id + "_" + this.cb + "_shrink", "*");
  },
  shrinked: function () {
    this.pm(this.id + "_shrinked", "*");
    this.pm(this.id + "_" + this.cb + "_shrinked", "*");
  },
  clearRM: function () {},
  close: function () {
    this.pm(this.id + "_close", "*");
    this.pm(this.id + "_" + this.cb + "_close", "*");
  },
  closed: function () {
    this.pm(this.id + "_closed", "*");
    this.pm(this.id + "_" + this.cb + "_closed", "*");
  },
  pauseTracker: function () {
    for (let i = 0; i < this.InnityVideos.length; i++) {
      this.InnityVideos[i].pauseTracker();
    }
  },
  resumeTracker: function () {
    for (let i = 0; i < this.InnityVideos.length; i++) {
      this.InnityVideos[i].resumeTracker();
    }
  },
  click: function (options) {
    // Customize for staging.
    if (
      typeof DesignerClickTag[options.clickTAG + this.creative] !== "undefined"
    ) {
      this.trace(options);
      window.open(DesignerClickTag[options.clickTAG + this.creative]);
    } else if (typeof options.url == "string") {
      this.trace(options);
      window.open(options.url);
    } else {
      console.log("ClickTAG Not Found: " + options.clickTAG + this.creative);
    }

    //		if(typeof options == "object") {
    //			if(typeof options.clickTAG != "undefined" && typeof this.urls[options.clickTAG] != "undefined") {
    //				var lnk = this.dco != "" ? this.urls[options.clickTAG] + "&type=" + this.dco : this.urls[options.clickTAG];
    //			} else if(typeof options.url == "string") {
    //				var lnk = options.url;
    //			}
    //		}else if(typeof options == "string") {
    //			if(typeof this.urls[options] != "undefined") {
    //				var lnk = this.dco != "" ? this.urls[options] + "&type=" + this.dco : this.urls[options];
    //			}
    //		}
    //		if(typeof lnk != "undefined" && lnk != "") {
    //			window.open(lnk);
    //		} else {
    //			this.trace(options);
    //		}
  },
  resize: function (width, height) {
    InnityHTMLAd.pm(
      InnityHTMLAd.id + "_resized[" + width + "x" + height + "]",
      "*"
    );
    InnityHTMLAd.pm(
      InnityHTMLAd.id +
        "_" +
        InnityHTMLAd.cb +
        "_resized[" +
        width +
        "x" +
        height +
        "]",
      "*"
    );
  },
  setAdReady: function () {
    this.pm(this.id + "_adReady", "*");
    this.pm(this.id + "_" + this.cb + "_adReady", "*");
  },
  setAdLoaded: function () {
    this.pm(this.id + "_adLoaded", "*");
    this.pm(this.id + "_" + this.cb + "_adLoaded", "*");
  },
  setDCO: function (dco) {
    this.dco = dco;
    var data =
      this.host +
      "/dco/?c=" +
      this.id.split("c")[1] +
      "&d=" +
      dco +
      "&cb=" +
      this.cb;
    this.dispatch(data);
  },
  getParam: function (param) {
    return (
      decodeURIComponent(
        (new RegExp("[?|&]" + param + "=" + "([^&;]+?)(&|#|;|$)").exec(
          self.location.href
        ) || [, ""])[1].replace(/\+/g, "%20")
      ) || ""
    );
  },
  dispatch: function (data) {
    if (data instanceof Array) {
      for (var i = 0; i < data.length; i++) {
        new Image().src = data[i];
      }
    } else {
      new Image().src = data;
    }
  },
  trace: function (msg) {
    try {
      console.log(msg);
    } catch (e) {}
  },
  pm: function (msg, target) {
    try {
      parent.postMessage(msg, target);
    } catch (e) {}
  },
  messageHandler: function (event) {
    if (event.data == InnityHTMLAd.id + "_expandAd") {
      if (!InnityHTMLAd.initOnLoad) {
        InnityHTMLAd.InnityAd = new InnityAd(
          InnityHTMLAd.trackingId,
          InnityHTMLAd.host,
          {
            pid: "",
            autostart: true,
            intervalTracking: InnityHTMLAd.intervalTracking,
          }
        );
      }
      if (!InnityHTMLAd.autostart) {
        InnityHTMLAd.startTimer("_ad_display");
      }
    } else if (event.data == InnityHTMLAd.id + "_closeAd") {
      // Clear ad body to mute all audio
      document.getElementsByTagName("body")[0].innerHTML = "";
      setTimeout(function () {
        // Clear Rich Media queue
        InnityHTMLAd.clearRM();
      }, 50);
    }
  },
  resizeHandler: function (event) {
    height = Math.max(document.body.scrollHeight, document.body.offsetHeight);
    width = Math.max(document.body.scrollWidth, document.body.offsetWidth);
    InnityHTMLAd.pm(
      InnityHTMLAd.id + "_resized[" + width + "x" + height + "]",
      "*"
    );
    InnityHTMLAd.pm(
      InnityHTMLAd.id +
        "_" +
        InnityHTMLAd.cb +
        "_resized[" +
        width +
        "x" +
        height +
        "]",
      "*"
    );
  },
};

// For Staging Purposes Only

function innityAd_getURLParameterData(name) {
  if (location.href.indexOf("?") > 1) {
    var elem = {};
    var params = location.href.split("?")[1].split("&");

    for (i in params) elem[params[i].split("=")[0]] = params[i].split("=")[1];

    if (name in elem) return elem[name];
  }
}

InnityHTMLAd.id =
  typeof innityAd_getURLParameterData("adid") == "undefined"
    ? "ad-staging"
    : innityAd_getURLParameterData("adid");
if (typeof innityAd_getURLParameterData("init") !== "undefined") {
  InnityHTMLAd.init(innityAd_getURLParameterData("init"));
} else {
  InnityHTMLAd.init(true);
}

InnityHTMLAd.socialhub = false;
InnityHTMLAd.creative = innityAd_getURLParameterData("creative") || "";

DesignerClickTag = {
  clickTAG: "https://www.acontent.io",
  clickTAG1: "https://www.acontent.io",
  clickTAG2: "https://www.acontent.io",
  clickTAG3: "https://www.acontent.io",
  clickTAG4: "https://www.acontent.io",
  clickTAG5: "https://www.acontent.io",
};

//app.js@
let innityAppsCountry = "MY";
let innityAppsCards = null;

function innityAppsBannerLoaded() {
  if (innityAppsCards === null) {
    setCardBackgroundImg(innityAppsGenericBackground);
    innityAppsCards = new InnityAppsMrecCards("card-container", {
      callbackWhenCardSwipe: whenUserSwipeCard,
      callbackAfterCardAppear: startFirstCard,
    });
  }
  innityAppsCards.showCards();
  registerClickTagEvent();

  if (
    innityAppsPlatform.getOS() === "ios" ||
    innityAppsPlatform.getOS() === "android"
  ) {
    return;
  }

  document.getElementById("innity-apps-ad").classList.add("desktop");
}

function setCardBackgroundImg(bgImgSrc) {
  let cardContentWrappers = document.getElementsByClassName(
    "card-content-wrapper"
  );

  for (let i = 0; i < cardContentWrappers.length; i++) {
    cardContentWrappers[i].style.backgroundImage = "url(" + bgImgSrc + ")";
  }
}

function whenUserSwipeCard(el) {
  currentActivePost = el.id;

  switch (el.id) {
    case "card-a":
    case "card-c":
      break;
  }
}

function bannerShownAtPhoneScreen() {}

function bannerHideFromPhoneScreen() {}

function startFirstCard() {}
//material.js@
var innityAppsGenericBackground = "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/bg.jpg";
var innityAppsMaterials = [
  // { elType: "img", cssClass: ["card-background"], attrs: { src: "bg.jpg" } },
  {
    id: "card-container",
    childs: [
      {
        id: "card-a",
        cssClass: [
          "innity-apps-cards",
          "innity-apps-card-transition",
          "innity-apps-card-1",
          "innity-apps-hide-card",
        ],
        attrs: { "data-track": "card_a" },
        childs: [
          {
            cssClass: ["card-content-wrapper"],
            childs: [
              {
                cssClass: ["card-fades-wrapper"],
                childs: [
                  {
                    elType: "img",
                    cssClass: ["card-image"],
                    attrs: { src: "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/card_1.png", "data-clicktag": "clickTAG" },
                  },
                  {
                    elType: "img",
                    cssClass: ["card-image", "cta"],
                    attrs: { src: "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/cta1.png", "data-clicktag": "clickTAG" },
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: "card-b",
        cssClass: [
          "innity-apps-cards",
          "innity-apps-card-transition",
          "innity-apps-card-2",
          "innity-apps-hide-card",
        ],
        attrs: { "data-track": "card_b" },
        childs: [
          {
            cssClass: ["card-content-wrapper"],
            childs: [
              {
                cssClass: ["card-fades-wrapper"],
                childs: [
                  {
                    elType: "img",
                    cssClass: ["card-image"],
                    attrs: { src: "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/card_2.png", "data-clicktag": "clickTAG1" },
                  },
                  {
                    elType: "img",
                    cssClass: ["card-image", "cta"],
                    attrs: { src: "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/cta2.png", "data-clicktag": "clickTAG1" },
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: "card-c",
        cssClass: [
          "innity-apps-cards",
          "innity-apps-card-transition",
          "innity-apps-card-3",
          "innity-apps-hide-card",
        ],
        attrs: { "data-track": "card_c" },
        childs: [
          {
            cssClass: ["card-content-wrapper"],
            childs: [
              {
                cssClass: ["card-fades-wrapper"],
                childs: [
                  {
                    elType: "img",
                    cssClass: ["card-image"],
                    attrs: { src: "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/card_3.png", "data-clicktag": "clickTAG2" },
                  },
                  {
                    elType: "img",
                    cssClass: ["card-image", "cta"],
                    attrs: { src: "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/cta3.png", "data-clicktag": "clickTAG2" },
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },

  {
    id: "card-front-overlay",
    childs: [
      {
        id: "educator",
        cssClass: ["card-education"],
        childs: [
          { cssClass: ["small-dot"] },
          {
            cssClass: ["text"],
            childs: [{ elType: "img", attrs: { src: "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/swipeedu.png" } }],
          },
        ],
      },
    ],
  },
  {
    id: "desktop-navigation",
    cssClass: ["innity-apps-desktop-navigation", "within-desktop"],
  },
];
//InnityAppsCreative.js@
function InnityAppsMobilePlatform() {
  this.debug = debug;
  this.getBrowserName = getBrowserName;
  this.getBrowserVersion = getBrowserVersion;
  this.getOS = getOS;
  this.getOSVersion = getOSVersion;
  this.getVersion = getVersion;
  /**
   * @deprecated This function is not valid due to we support mobile SDK which will return true same condition.
   */
  this.isIosSkype = isIosSkype;
  this.isIosWeChat = isIosWeChat;
  this.isSamsungBrowser = isSamsungBrowser;

  /**
   * Consist of <b>chrome</b>, <b>safari</b>, <b>samsungbrowser</b>,
   * <b>facebook</b>, <b>wechat</b>, <b>crios</b>, <b>line</b>,
   * <b>other</b>
   * @type String
   */
  var browserName_ = "other";
  var browsersVersion_ = {
    chrome: "0",
    samsungbrowser: "0",
    safari: "0",
    crios: "0", // ios Chrome
  };
  /**
   * Consist of <b>ios</b>, <b>android</b> & <b>other</b>
   * @type String
   */
  var os_ = "other";
  var osVersion_ = "0";
  var ua_ = null;
  /**
   * A checking to determine is the library latest.
   * @type String
   */
  var version_ = "5.0.0";

  initClass();

  // Public Function Section =================================================

  /**
   * For debug purpose.
   * @returns {String}
   */
  function debug() {
    var stringValue = "";
    if (os_ === "ios") {
      stringValue =
        os_ + " Version " + osVersion_.join(".") + " with " + browserName_;
    } else {
      stringValue = os_ + " Version " + osVersion_ + " with " + browserName_;
    }
    return stringValue;
  }

  function getBrowserName() {
    return browserName_;
  }

  function getBrowserVersion() {
    return browsersVersion_;
  }

  function getOS() {
    return os_;
  }

  function getOSVersion() {
    return osVersion_;
  }

  function getVersion() {
    return version_;
  }

  /**
   * @deprecated This function is not valid due to we support mobile SDK which will return true same condition.
   * Please remove this function after 10 April 2021.
   * @returns {Boolean} always FALSE.
   */
  function isIosSkype() {
    return false;
  }

  /**
   * Detect iOS WeChat in app browser.
   * @returns {Boolean} TRUE if is iOS WeChat in app browser, else FALSE.
   */
  function isIosWeChat() {
    return os_ === "ios" && browserName_ === "wechat";
  }

  function isSamsungBrowser() {
    return browsersVersion_.samsungbrowser > 0;
  }

  // Proctected Function Section =============================================

  // Private Function Section ================================================

  function androidBrowserDetection_() {
    if (!!window.chrome && ua_.toLowerCase().indexOf("chrome") > -1) {
      browserName_ = "chrome";
      androidChromeVersionDetection_();
    }

    if (ua_.toLowerCase().indexOf("samsungbrowser") > -1) {
      browserName_ = "samsung";
      samsungBrowserVersionDetection_();
    }

    if (ua_.toLowerCase().indexOf("firefox") > -1) {
      browserName_ = "firefox";
    }
  }

  function androidChromeVersionDetection_() {
    var analysis = ua_.match(/(chrome(?=\/))\/?\s*(\d+)/i) || [];
    if (analysis[1].toLowerCase() === "chrome") {
      browsersVersion_["chrome"] = analysis[2];
    }
  }

  function browserDetection_() {
    if (os_ === "ios") {
      iosBrowserDetection_();
    } else if (os_ === "android") {
      androidBrowserDetection_();
    }
  }

  function iosBrowserDetection_() {
    var standalone = window.navigator.standalone;
    var isSafariKeyExist = /safari/i.test(ua_);
    var isChrome = /CriOS/i.test(ua_);

    if (!standalone && isSafariKeyExist === true) {
      if (isChrome === true) {
        browserName_ = "chrome";
        iosChromeVersionDetection_();
        return;
      }

      var isLine = /Line/i.test(ua_);
      if (isLine === true) {
        browserName_ = "line";
        return;
      }

      browserName_ = "safari";
      browsersVersion_["safari"] = osVersion_.join(".");
    } else if (standalone && isSafariKeyExist === false) {
      // Standalone, homepage icon page
    } else {
      // In app browser
      if (/\bFB[\w_]+\//i.test(ua_) === true) {
        browserName_ = "facebook";
      } else if (/\bMicroMessenger\//i.test(ua_) === true) {
        browserName_ = "wechat";
      } else if (/\bInstagram\b/i.test(ua_) === true) {
        browserName_ = "instagram";
      } else {
        // So far Skype don't have any key to detect.
        browserName_ = "other";
      }
    }
  }

  function iosChromeVersionDetection_() {
    var analysis = ua_.match(/(crios(?=\/))\/?\s*(\d+)/i) || [];
    if (analysis[1].toLowerCase() === "crios") {
      browsersVersion_["crios"] = analysis[2];
    }
  }

  function initClass() {
    ua_ = window.navigator.userAgent;

    osDetection_();
    browserDetection_();
  }

  function osDetection_() {
    if (/(iPhone|iPod|iPad)/i.test(ua_)) {
      os_ = "ios";
      var v = navigator.userAgent.match(/OS (\d+)_(\d+)_?(\d+)?/);
      osVersion_ = [
        parseInt(v[1], 10),
        parseInt(v[2], 10),
        parseInt(v[3] || 0, 10),
      ];
    } else if (ua_.toLowerCase().indexOf("android") > -1) {
      os_ = "android";
      var v = ua_.match(/Android (\d+(?:\.\d+){0,2})/i);
      if (v !== null) {
        osVersion_ = v[v.length - 1];
      }
    }
  }

  function samsungBrowserVersionDetection_() {
    var analysis = ua_.match(/(samsungbrowser(?=\/))\/?\s*(\d+)/i) || [];
    if (analysis[1].toLowerCase() === "samsungbrowser") {
      browsersVersion_["samsungbrowser"] = analysis[2];
    }
  }
}

let innityAppsTimerTrackingID = null;
let innityAppsAdTimerTrackingID = null;
/**
 * For reference purpose only.
 * @type String
 */
let innityAppsTrackerVersion = "5.0.0";

function innityAppsTrackerReset() {
  innityAppsTriggerTimerStop();
  innityAppsTrackerPauseVideo();
}

function innityAppsTriggerClickTag(clickTag) {
  innityAppsTrackerPauseVideo();
  InnityHTMLAd.click({ clickTAG: clickTag });
}

function innityAppsTriggerUrl(urlToLand) {
  innityAppsTrackerPauseVideo();
  InnityHTMLAd.click({ url: urlToLand });
}

function innityAppsTriggerAdTimerStartWithoutStop(id) {
  if (innityAppsAdTimerTrackingID === id) {
    return;
  }

  InnityHTMLAd.startTimer(id);
  innityAppsAdTimerTrackingID = id;
}

function innityAppsTriggerTimerStart(id) {
  if (innityAppsTimerTrackingID === id) {
    return;
  }

  innityAppsTriggerTimerStop();
  InnityHTMLAd.startTimer(id);
  innityAppsTimerTrackingID = id;
}

function innityAppsTriggerAdTimerStop() {
  if (innityAppsAdTimerTrackingID !== null) {
    InnityHTMLAd.stopTimer(innityAppsAdTimerTrackingID);
    innityAppsAdTimerTrackingID = null;
  }
}

function innityAppsTriggerTimerStop() {
  if (innityAppsTimerTrackingID !== null) {
    InnityHTMLAd.stopTimer(innityAppsTimerTrackingID);
    innityAppsTimerTrackingID = null;
  }
}

function innityAppsTriggerTrack(track) {
  InnityHTMLAd.track(track);
}

function innityAppsTrackerPauseVideo() {
  if (typeof innityAppsPauseAllVideo === "function") {
    // Helper function to pause all video.
    innityAppsPauseAllVideo();
  }
}

function innityAppsResponsiveTriggerTimerStart(id) {
  innityAppsTriggerTimerStart(innityAppsGetResponsiveID(id));
}

function innityAppsResponsiveTriggerTrack(track) {
  innityAppsTriggerTrack(innityAppsGetResponsiveID(track));
}

function innityAppsGetResponsiveID(id) {
  if (innityAppsPlatform === undefined || innityAppsPlatform === null) {
    console.error(
      "Missing innityAppsPlatform library! Please include InnityAppsMobilePlatform class"
    );
    return;
  }

  let responsiveID = "";
  switch (innityAppsPlatform.getOS()) {
    case "android":
    case "ios":
      responsiveID = "mobile_" + id;
      break;
    default:
      responsiveID = "nonmobile_" + id;
      break;
  }

  return responsiveID;
}

let innityAppsMaterialGeneratorVersion = "6.0.0";
let innityAppsTotalImage = 0;

function innityAppsGenerateMainContent(container, waitForImageLoad = false) {
  for (let i = 0; i < innityAppsMaterials.length; i++) {
    innityAppsMaterialGenerator(
      innityAppsMaterials[i],
      container,
      waitForImageLoad
    );
  }

  if (waitForImageLoad === false || innityAppsTotalImage === 0) {
    innityAppsMaterialsLoadedCompleted();
  }
}

function innityAppsGifToMp4(elementData) {
  if (elementData.elType !== "img") {
    return;
  }

  if (typeof elementData.isGifConverted !== "boolean") {
    return;
  }

  if (elementData.isGifConverted === false) {
    return;
  }

  let imgSrc = elementData.attrs.src;
  if (elementData.attrs["data-src"] !== undefined) {
    // Some template is using data-src to load image source before user engaged.
    imgSrc = elementData.attrs["data-src"];
  }

  if (imgSrc === undefined) {
    return;
  }

  if (imgSrc.toLowerCase().indexOf("gif") === -1) {
    return;
  }

  elementData.elType = "video";
  elementData.attrs.src = imgSrc.toLowerCase().replace("gif", "mp4");
  if (elementData.attrs["data-src"] !== undefined) {
    // Some template is using data-src to load image source before user engaged.
    elementData.attrs.src = "";
    elementData.attrs["data-src"] = imgSrc.toLowerCase().replace("gif", "mp4");
  }
  elementData.attrs.preload = "metadata";
  elementData.attrs.autoplay = "";
  elementData.attrs.muted = "";
  elementData.attrs.loop = "";
  elementData.attrs.playsinline = "";

  if (elementData.cssClass === undefined) {
    elementData.cssClass = [];
  }
  elementData.cssClass.push("innity-apps-animated-gif-video");
}

function innityAppsGetWebpParentEl(elementData, materialEl) {
  if (typeof elementData.isWebp !== "boolean") {
    return null;
  }

  if (elementData.isWebp === false) {
    return null;
  }

  if (elementData.elType !== "img") {
    return null;
  }

  if (
    typeof elementData.attrs === "undefined" ||
    typeof elementData.attrs !== "object"
  ) {
    return null;
  }

  let childEl = materialEl;
  let parentEl = document.createElement("picture");

  if (
    typeof elementData.cssClass === "object" &&
    typeof elementData.cssClass.length === "number"
  ) {
    for (let i = 0; i < elementData.cssClass.length; i++) {
      parentEl.classList.add(elementData.cssClass[i]);
    }
  }

  let fileSrc = elementData.attrs.src;
  fileSrc = fileSrc.substr(0, fileSrc.lastIndexOf(".")) + ".webp";
  let attrChildData = innityAppsImagePreviewCacheBuster(fileSrc, "src");

  let sourceEl = document.createElement("source");
  sourceEl.setAttribute("srcset", attrChildData);
  sourceEl.setAttribute("type", "image/webp");

  parentEl.appendChild(sourceEl);
  parentEl.appendChild(childEl);

  return parentEl;
}

function innityAppsImagePreviewCacheBuster(attrData, attrName) {
  let attrChildData = attrData;

  if (typeof innityAppsIsPreview === "undefined") {
    return attrChildData;
  }

  if (attrName === "src" || attrName === "data-src") {
    attrChildData += "?t=" + new Date().getTime();
  }

  return attrChildData;
}

/**
 * Generate HTML element based on elementData attribute. <br />
 * elementData.elType => type of created element <br/>
 * elementData.id => id of created element <br/>
 * elementData.cssClass => CSS classes of created element, is an array of string <br/>
 * elementData.innerHTML => direct content of created element <br/>
 * elementData.clickFunc => function called when created element is clicked, must be function name <br/>
 * elementData.clickTag => clickTag trigger by created element <br/>
 * elementData.cssStyle => inline CSS style of created element, object of cssStyleAttributeName => value <br/> eg:{'backgroundColor': 'rgba(255, 0, 148, 1)} <br/>
 * elementData.attrs => Attributes of created element, object of attributeName => value <br/> eg:{src: 'my_image.png'} <br/>
 * elementData.childs => children inside created element, array of elementData object <br/>
 * @param {object} elementData
 * @param {element} container
 * @param {boolean} waitForImageLoad Default is FALSE, set TRUE will wait for image loaded before call innityAppsBannerLoaded.
 */
function innityAppsMaterialGenerator(
  elementData,
  container,
  waitForImageLoad = false
) {
  innityAppsGifToMp4(elementData);

  let elementType =
    typeof elementData.elType === "undefined" ? "div" : elementData.elType;
  let materialEl = document.createElement(elementType);
  let parentEl = innityAppsGetWebpParentEl(elementData, materialEl);

  innityAppsWaitForImageHandler(waitForImageLoad, materialEl, elementType);

  if (elementType === "svg" || elementType === "path") {
    materialEl = document.createElementNS(
      "http://www.w3.org/2000/svg",
      elementType
    );
  }

  if (typeof elementData.id !== "undefined") {
    materialEl.setAttribute("id", elementData.id);
  }

  if (
    typeof elementData.cssClass === "object" &&
    typeof elementData.cssClass.length === "number"
  ) {
    for (let i = 0; i < elementData.cssClass.length; i++) {
      materialEl.classList.add(elementData.cssClass[i]);
    }
  }

  if (typeof elementData.innerHTML !== "undefined") {
    materialEl.innerHTML = elementData.innerHTML;
  }

  if (
    typeof elementData.impressionTag !== "undefined" &&
    typeof elementData.impressionTag === "object"
  ) {
    if (typeof innityAppsAddImpressionTag !== "function") {
      console.error(
        "impressionTag exist but innityAppsAddImpressionTag function doesnt exist"
      );
      return;
    }

    innityAppsAddImpressionTag(elementData.impressionTag);
  }

  if (typeof elementData.clickFunc === "function") {
    materialEl.addEventListener(
      "click",
      function (e) {
        e.stopPropagation();
        elementData.clickFunc(materialEl);
      },
      false
    );
  }

  if (typeof elementData.clickTag !== "undefined") {
    materialEl.addEventListener(
      "click",
      function (e) {
        e.stopPropagation();
        innityAppsTriggerClickTag(elementData.clickTag);
      },
      false
    );
  }

  if (
    typeof elementData.cssStyle !== "undefined" &&
    typeof elementData.cssStyle === "object"
  ) {
    for (let cssKey in elementData.cssStyle) {
      materialEl.style[cssKey] = elementData.cssStyle[cssKey];
    }
  }

  if (
    typeof elementData.androidAR !== "undefined" &&
    typeof elementData.androidAR === "string"
  ) {
    let currentUrl = window.location.href;
    let curArFilePath =
      currentUrl.substr(0, currentUrl.lastIndexOf("/") + 1) +
      elementData.androidAR;
    let curArPath = `intent://arvr.google.com/scene-viewer/1.0?file=${curArFilePath}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
    materialEl.setAttribute("rel", "ar");
    materialEl.setAttribute("href", curArPath);
  }

  if (
    typeof elementData.iosAR !== "undefined" &&
    typeof elementData.iosAR === "string"
  ) {
    materialEl.setAttribute("rel", "ar");
    materialEl.setAttribute("href", elementData.iosAR);
  }

  if (
    typeof elementData.attrs !== "undefined" &&
    typeof elementData.attrs === "object"
  ) {
    for (let attrName in elementData.attrs) {
      if (elementType === "svg" || elementType === "path") {
        materialEl.setAttributeNS(null, attrName, elementData.attrs[attrName]);
      } else {
        let attrChildData = innityAppsImagePreviewCacheBuster(
          elementData.attrs[attrName],
          attrName
        );
        materialEl.setAttribute(attrName, attrChildData);
      }
    }
  }

  if (
    typeof elementData.childs !== "undefined" &&
    typeof elementData.childs === "object"
  ) {
    for (let i = 0; i < elementData.childs.length; i++) {
      innityAppsMaterialGenerator(
        elementData.childs[i],
        materialEl,
        waitForImageLoad
      );
    }
  }

  if (parentEl !== null) {
    materialEl = parentEl;
  }

  container.appendChild(materialEl);
}

function innityAppsPlayGifVideo() {
  let gifVideos = document.getElementsByClassName(
    "innity-apps-animated-gif-video"
  );
  [...gifVideos].forEach((gifVid) => {
    gifVid.muted = true;
    gifVid.play().catch((e) => {});
  });
}

function innityAppsWaitForImageHandler(waitForImageLoad, element, elementType) {
  if (waitForImageLoad === false) {
    return;
  }

  if (elementType.toLowerCase() !== "img") {
    return;
  }

  innityAppsTotalImage++;

  element.addEventListener("load", imageLoaded_);
  element.addEventListener("error", imageError_);

  function imageError_() {
    imageCompleted_();
  }

  function imageLoaded_() {
    imageCompleted_();
  }

  function imageCompleted_() {
    innityAppsTotalImage--;

    if (innityAppsTotalImage === 0) {
      innityAppsMaterialsLoadedCompleted();
    }
  }
}

function innityAppsMaterialsLoadedCompleted() {
  if (typeof bannerAnimationStart === "function") {
    setTimeout(bannerAnimationStart, 100);
  }

  if (typeof innityAppsBannerLoaded === "function") {
    setTimeout(innityAppsBannerLoaded, 100);
  }

  setInterval(innityAppsPlayGifVideo, 1000);
}

let innityAppsAd = null;
let innityAppsIsAdShown = null;
/**
 * Only set to TRUE if required orientation.
 * @type Boolean
 */
let innityAppsIosWorkAroundEl = null;
let innityAppsIosWorkAroundCounter = 0;
let innityAppsIsBannerLoad = false;
let innityAppsIsOrientationEnable = false;
let innityAppsIsVersionDifferentWarned = false;
let innityAppsPlatform = null;
let innityAppsVersion = "4.6.38";
let innityAppsIsTriggerClickTagEnable = true;

window.addEventListener("load", innityAppsInitStandardCreative, false);

function innityAppsBindEvents() {
  window.addEventListener("message", innityAppsMessageHandler, false);
}

function innityAppsInitStandardCreative() {
  innityAppsPlatform = new InnityAppsMobilePlatform();
  innityAppsBindEvents();
  innityAppsSetupCreative();
  innityAppsPostReadyToProxy();
  innityAppsSetIOSWorkaround();
}

function innityAppsIosAppendText() {
  // innityAppsIosWorkAroundEl.innerHTML += ".";
  innityAppsIosWorkAroundCounter++;

  if (innityAppsIosWorkAroundCounter >= 100) {
    // innityAppsIosWorkAroundCounter = 0;
    innityAppsIosWorkAroundEl.innerHTML = "";
  }
}

function innityAppsMessageHandler(event) {
  let supportedMsg = event.data;
  if (
    typeof supportedMsg.owner === "undefined" ||
    supportedMsg.owner !== "Innity" ||
    typeof supportedMsg.adType === "undefined"
  ) {
    return;
  }

  if (supportedMsg.version != innityAppsVersion) {
    if (innityAppsIsVersionDifferentWarned === false) {
      console.warn(
        "Proxy and ad version is different! Proxy v" +
          supportedMsg.version +
          " vs Ad v" +
          innityAppsVersion
      );
      innityAppsIsVersionDifferentWarned = true;
    }
  }

  switch (supportedMsg.action) {
    case "shown":
      if (innityAppsIsAdShown === null || innityAppsIsAdShown === false) {
        innityAppsIsAdShown = true;
        innityAppsCountry = supportedMsg.data.country;
        if (typeof bannerShownAtPhoneScreen === "function") {
          bannerShownAtPhoneScreen();
        }
      }
      break;
    case "hide":
      if (innityAppsIsAdShown === null || innityAppsIsAdShown === true) {
        innityAppsIsAdShown = false;
        if (typeof bannerHideFromPhoneScreen === "function") {
          bannerHideFromPhoneScreen();
        }
      }
      break;
  }

  switch (supportedMsg.data.eventType) {
    case "deviceorientation":
      if (typeof cardsDeviceOrientation === "function") {
        cardsDeviceOrientation(supportedMsg.data);
      }
      break;
    case "orientationchange":
      if (typeof cardsOrientationChange === "function") {
        cardsOrientationChange(supportedMsg.data);
      }
      break;
    default:
      break;
  }
}

function innityAppsPauseAllVideo() {
  let allVid = document.getElementsByTagName("video");
  for (let i = 0; i < allVid.length; i++) {
    allVid[i].pause();
  }

  if (typeof innityAppsPlayGifVideo === "function") {
    innityAppsPlayGifVideo();
  }
}

function innityAppsPostReadyToProxy() {
  parent.postMessage(
    {
      owner: "Innity",
      adType: "innity-apps-mobile-overlay-cube",
      action: "adReady",
      data: { orientation: innityAppsIsOrientationEnable },
      containerHeight: 250,
      version: innityAppsVersion,
    },
    "*"
  );
}

function innityAppsPostTotalCardsToProxy(total) {
  parent.postMessage(
    {
      owner: "Innity",
      adType: "innity-apps-mobile-overlay-cube",
      action: "totalCards",
      data: { totalCards: total },
      containerHeight: 250,
      version: innityAppsVersion,
    },
    "*"
  );
}

/**
 * This is a workaround to enable iOS Safari touch events after user scroll the page.
 */
function innityAppsSetIOSWorkaround() {
  if (innityAppsPlatform.getOS() === "ios") {
    innityAppsIosWorkAroundEl = document.getElementById(
      "innity-apps-ios-workaround"
    );
    setInterval(innityAppsIosAppendText, 500);
  }
}

function innityAppsSetupCreative() {
  if (innityAppsIsBannerLoad === true) {
    return;
  }

  innityAppsGenerateMainContent(
    document.getElementById("innity-apps-banner-content")
  );
  innityAppsIsBannerLoad = true;
}

function registerClickTagEvent() {
  let cardImgEls = document.getElementsByClassName("card-image");
  for (let i = 0; i < cardImgEls.length; i++) {
    let curCardImgEl = cardImgEls[i];

    curCardImgEl.addEventListener("click", function (e) {
      e.stopPropagation();

      if (innityAppsIsTriggerClickTagEnable === false) {
        return false;
      }

      innityAppsTriggerClickTag(this.getAttribute("data-clicktag"));
    });
  }
}
function InnityAppsMrecCards(elID, opts) {
  this.hideCards = hideCards;
  this.showCards = showCards;
  this.swipeToNext = swipeToNext;

  const CARD_SEQUENCE_CSS_CLASS = "innity-apps-card-";
  const CARD_TRANSITION_CSS_CLASS = "innity-apps-card-transition";
  const FOLLOW_FINGER_CSS_CLASS = "innity-apps-cards-follow-finger";
  const INIT_HIDING_CSS_CLASS = "innity-apps-hide-card";
  const ANIMATED_TO_LEFT_CSS_CLASS = "innity-apps-moving-to-left";
  const ANIMATED_TO_RIGHT_CSS_CLASS = "innity-apps-moving-to-right";

  const OVERFLOW_CARD_CSS_CLASS = "innity-apps-hidding-cards";

  let extraOptions = mergeObject_(
    {
      callbackWhenCardSwipe: null,
      callbackAfterCardAppear: null,
    },
    opts,
    "extraOptions"
  );

  let animationDuration = 500;
  let cardCssClasses = [];
  let cardEls = [];
  let cardEdu = null;
  let cardLeftPosition = 0.06;
  let cardIndexForDisplay = 0;
  let cardStillAnimate = false;
  let containerEl = null;
  let curActiveCardEl = null;
  let curCardIndex = 0;
  let initX = 0;
  let isTouch = false;
  let isFirstSwipe = true;
  let mobileSupport_ = false;
  let parentCardWrapper = null;
  let updatedLeft = 0;

  let defaultTracker = new InnityAppsCardsDefaultTracking();
  let innityAppsPlatform = new InnityAppsMobilePlatform();

  initClass_();

  function initClass_() {
    containerEl = document.getElementById(elID);
    parentCardWrapper =
      document.getElementById("innity-apps-ad") !== null
        ? document.getElementById("innity-apps-ad")
        : document.getElementById(elID).parentNode;

    if (
      innityAppsPlatform.getOS() === "ios" ||
      innityAppsPlatform.getOS() === "android"
    ) {
      mobileSupport_ = true;
    }

    setCardElIntoArrAndBindCardEvents_();
    bindEventListeners_();
    onResize_();

    innityAppsPostTotalCardsToProxy(cardIndexForDisplay + 1);

    if (mobileSupport_ === true) {
      cardEdu = new CardsSwipeEduMessage_();
    } else {
      new CardsNavigatorEduMessage_({
        toLeftCallback: cardDesktopNext_,
        toRightCallback: cardDesktopPrev_,
      });
    }
  }

  // Public function section =================================================

  function hideCards() {
    for (let i = 0; i < cardEls.length; i++) {
      cardEls[i].classList.add(INIT_HIDING_CSS_CLASS);
    }
  }

  function showCards() {
    setTimeout(displayCards_, 600);
  }

  function swipeToNext() {
    if (cardStillAnimate === true) {
      return;
    }
    cardStillAnimate = true;
    curActiveCardEl = cardEls[curCardIndex];
    runCardAnimation_(ANIMATED_TO_LEFT_CSS_CLASS);
  }

  // Private function section ================================================

  function bindEventListeners_() {
    window.addEventListener("resize", onResize_, false);
  }

  function bindCardEventListeners_(curCardEl) {
    curCardEl.addEventListener("touchstart", onTouchStart_, false);
    curCardEl.addEventListener("touchmove", onTouchMove_, false);
    curCardEl.addEventListener("touchend", onTouchEnd_, false);

    curCardEl.addEventListener("mousedown", onMouseStart_, false);
    curCardEl.addEventListener("mousemove", onMouseMove_, false);
    curCardEl.addEventListener("mouseup", onMouseRelease_, false);
    curCardEl.addEventListener("mouseout", onMouseRelease_, false);
  }

  function cardAppearEvent_() {
    defaultTracker.trackTimer(cardEls[curCardIndex].getAttribute("data-track"));

    if (typeof extraOptions.callbackWhenCardSwipe === "function") {
      extraOptions.callbackWhenCardSwipe(cardEls[curCardIndex]);
    }
  }

  function cardDesktopNext_() {
    if (cardStillAnimate === true) {
      return;
    }

    curActiveCardEl = cardEls[curCardIndex];
    cardStillAnimate = true;
    runCardAnimation_(ANIMATED_TO_RIGHT_CSS_CLASS);
  }

  function cardDesktopPrev_() {
    if (cardStillAnimate === true) {
      return;
    }

    let _last = curCardIndex;
    _last--;
    if (_last < 0) {
      _last = cardEls.length - 1;
    }
    curActiveCardEl = cardEls[_last];
    cardStillAnimate = true;
    runBackwardCardAnimation_(ANIMATED_TO_LEFT_CSS_CLASS);
  }

  function cardFirstShowAllEvent_() {
    if (typeof extraOptions.callbackAfterCardAppear === "function") {
      extraOptions.callbackAfterCardAppear();
    }

    if (mobileSupport_ === false || isFirstSwipe === false) {
      return;
    }

    isFirstSwipe = false;
    setTimeout(cardEdu.add, 1250);
  }

  function displayCards_() {
    cardEls[cardIndexForDisplay].classList.remove(INIT_HIDING_CSS_CLASS);
    cardIndexForDisplay--;

    if (cardIndexForDisplay < 0) {
      cardIndexForDisplay = cardEls.length - 1;
      if (innityAppsTimerTrackingID === null) {
        defaultTracker.trackTimer(
          cardEls[curCardIndex].getAttribute("data-track") + "_default"
        );
      }
      cardFirstShowAllEvent_();
      return;
    }

    setTimeout(displayCards_, 80);
  }

  function decreaseCurCardIndex_() {
    curCardIndex--;
    if (curCardIndex < 0) {
      curCardIndex = cardEls.length - 1;
    }
  }

  function increaseCurCardIndex_() {
    curCardIndex++;
    if (curCardIndex > cardEls.length - 1) {
      curCardIndex = 0;
    }
  }

  function mergeObject_(defaultObj, overrideObject, reference) {
    for (let attributeKey in overrideObject) {
      if (defaultObj.hasOwnProperty(attributeKey)) {
        defaultObj[attributeKey] = overrideObject[attributeKey];
      } else {
        console.warn(
          "[Version " +
            version +
            "] Key [" +
            attributeKey +
            "] not found in object merging process.",
          reference
        );
      }
    }

    return defaultObj;
  }

  function onMouseMove_(e, curXPost = e.clientX) {
    e.preventDefault();

    if (isTouch === false) {
      return;
    }

    updatedLeft = window.innerWidth * cardLeftPosition + curXPost - initX;

    curActiveCardEl.classList.add(FOLLOW_FINGER_CSS_CLASS);
    curActiveCardEl.classList.remove(CARD_TRANSITION_CSS_CLASS);

    if (curXPost === 0) {
      return;
    }

    innityAppsIsTriggerClickTagEnable = false;
  }

  function onMouseRelease_(e) {
    if (isTouch === false) {
      return;
    }

    isTouch = false;

    let xMovement = e.clientX - initX;
    if (xMovement < -containerEl.offsetWidth * 0.25) {
      cardStillAnimate = true;
      runCardAnimation_(ANIMATED_TO_LEFT_CSS_CLASS);
      defaultTracker.trackToLeft();

      removeCardEdu();
    } else if (xMovement > containerEl.offsetWidth * 0.25) {
      cardStillAnimate = true;
      runCardAnimation_(ANIMATED_TO_RIGHT_CSS_CLASS);
      defaultTracker.trackToRight();

      removeCardEdu();
    } else {
      curActiveCardEl.style.left = "";
    }

    updatedLeft = 0;
    curActiveCardEl.classList.remove(FOLLOW_FINGER_CSS_CLASS);
    curActiveCardEl.classList.add(CARD_TRANSITION_CSS_CLASS);
  }

  function onMouseStart_(e) {
    if (cardStillAnimate === true) {
      return;
    }

    isTouch = true;
    initX = e.clientX;
    innityAppsIsTriggerClickTagEnable = true;
    updatedLeft = window.innerWidth * cardLeftPosition;
    curActiveCardEl = cardEls[curCardIndex];

    slideFingerWithAnimationFrame_();
  }

  function onResize_() {
    let newLeft =
      ((parentCardWrapper.clientWidth - containerEl.clientWidth) /
        2 /
        parentCardWrapper.clientWidth) *
      100;
    if (newLeft < 0) {
      newLeft = 0;
    }
    containerEl.style.left = newLeft + "%";

    let newTop =
      ((parentCardWrapper.clientHeight - containerEl.clientHeight) /
        2 /
        parentCardWrapper.clientHeight) *
      100;
    if (newTop < 0) {
      newTop = 0;
    }
    containerEl.style.top = newTop + "%";
  }

  function onTouchEnd_(e) {
    onMouseRelease_(e.changedTouches[0]);
  }

  function onTouchMove_(e) {
    onMouseMove_(e, e.changedTouches[0].clientX);
  }

  function onTouchStart_(e) {
    onMouseStart_(e.changedTouches[0]);
  }

  function removeCardEdu() {
    if (cardEdu === null) {
      return;
    }

    cardEdu.remove();
  }

  function runBackwardCardAnimation_(cssClass) {
    curActiveCardEl.classList.add(cssClass);

    setTimeout(function () {
      curActiveCardEl.style.left = "";
      swapBackwardCardPosition_();
      decreaseCurCardIndex_();
    }, animationDuration / 2.5);

    setTimeout(function () {
      curActiveCardEl.classList.remove(cssClass);
      cardStillAnimate = false;
      cardAppearEvent_();
    }, animationDuration);
  }

  function runCardAnimation_(cssClass) {
    if (curActiveCardEl.classList.contains("innity-apps-last-card") === true) {
      return;
    }
    curActiveCardEl.classList.add(cssClass);

    setTimeout(function () {
      curActiveCardEl.style.left = "";
      swapCardPosition_();
      increaseCurCardIndex_();
    }, animationDuration / 2.5);

    setTimeout(function () {
      curActiveCardEl.classList.remove(cssClass);
      cardStillAnimate = false;
      cardAppearEvent_();
    }, animationDuration);
  }

  function setCardElIntoArrAndBindCardEvents_() {
    let cards = document.getElementsByClassName("innity-apps-cards");
    for (let i = 0; i < cards.length; i++) {
      let curCard = cards[i];
      let curCardIndex = i + 1;

      cardCssClasses.push(CARD_SEQUENCE_CSS_CLASS + curCardIndex);
      cardEls.push(curCard);
      bindCardEventListeners_(curCard);
    }

    cardIndexForDisplay = cardEls.length - 1;
  }

  function slideFingerWithAnimationFrame_() {
    if (isTouch === false) {
      return;
    }

    curActiveCardEl.style.left = updatedLeft + "px";
    window.requestAnimFrame(slideFingerWithAnimationFrame_);
  }

  function swapBackwardCardPosition_() {
    for (let i = cardEls.length - 1; i >= 0; i--) {
      let curEl = cardEls[i];

      for (let j = cardCssClasses.length; j >= 0; j--) {
        if (
          curEl.classList.contains(cardCssClasses[cardCssClasses.length - 1])
        ) {
          curEl.classList.remove(cardCssClasses[cardCssClasses.length - 1]);
          curEl.classList.remove(OVERFLOW_CARD_CSS_CLASS);
          curEl.classList.add(cardCssClasses[0]);
          break;
        } else if (curEl.classList.contains(cardCssClasses[j])) {
          curEl.classList.remove(cardCssClasses[j]);
          if (curEl.classList.contains(OVERFLOW_CARD_CSS_CLASS)) {
            curEl.classList.remove(OVERFLOW_CARD_CSS_CLASS);
          }
          if (j > 3) {
            curEl.classList.add(OVERFLOW_CARD_CSS_CLASS);
          }
          curEl.classList.add(cardCssClasses[j + 1]);
          break;
        }
      }
    }
  }

  function swapCardPosition_() {
    for (let i = 0; i < cardEls.length; i++) {
      let curEl = cardEls[i];

      for (let j = 0; j < cardCssClasses.length; j++) {
        if (curEl.classList.contains(cardCssClasses[0])) {
          curEl.classList.remove(cardCssClasses[0]);
          curEl.classList.add(cardCssClasses[cardCssClasses.length - 1]);
          if (cardCssClasses.length > 4) {
            curEl.classList.add(OVERFLOW_CARD_CSS_CLASS);
          }
          break;
        } else if (curEl.classList.contains(cardCssClasses[j])) {
          curEl.classList.remove(cardCssClasses[j]);
          if (curEl.classList.contains(OVERFLOW_CARD_CSS_CLASS)) {
            curEl.classList.remove(OVERFLOW_CARD_CSS_CLASS);
          }
          curEl.classList.add(cardCssClasses[j - 1]);
          break;
        }
      }
    }
  }

  // Private class function section ==========================================

  function CardsNavigatorEduMessage_(_opts) {
    const CSSCLASS_NAV_EDU_ = "innity-app-desktop-navigation-edu";
    const CSSCLASS_NAV_CLICKED = "innity-apps-navigation-clicked";
    const CSSCLASS_NAV_FOCUS = "innity-apps-navigation-focus";
    const CSSCLASS_NAV_NOFOCUS = "innity-apps-navigation-nofocus";
    const HTML_NAV_ARROW =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="innity-apps-edu-arrow" d="M8.12,3.39,4.61,6.9h0a1.55,1.55,0,0,0,0,2.2h0l3.51,3.51a1.56,1.56,0,0,0,2.19,0h0a1.55,1.55,0,0,0,0-2.2L7.9,8l2.41-2.41a1.55,1.55,0,0,0,0-2.2h0A1.56,1.56,0,0,0,8.12,3.39Z"/></svg>';

    let leftCallback_ = _opts.toLeftCallback;
    let isIninitially_ = true;
    let navEl_ = null;
    let nextBtnEl_ = null;
    let prevBtnEl_ = null;
    let rightCallback_ = _opts.toRightCallback;
    let userHovered_ = false;

    initClass_();

    function initClass_() {
      navEl_ = document.getElementById("desktop-navigation");
      navEl_.classList.add(CSSCLASS_NAV_EDU_);

      for (let i = 0; i < renderClass_().length; i++) {
        innityAppsMaterialGenerator(renderClass_()[i], navEl_);
      }

      setTimeout(() => {
        nextBtnEl_ = document.getElementById("innityAppsBtnRevLitenNext");
        prevBtnEl_ = document.getElementById("innityAppsBtnRevLitePrev");
        bindBtnListeners_(
          nextBtnEl_,
          onClicked_.bind({
            fn: leftCallback_,
            trackingName: "btn_next",
          })
        );
        bindBtnListeners_(
          prevBtnEl_,
          onClicked_.bind({
            fn: rightCallback_,
            trackingName: "btn_prev",
          })
        );
      }, 100);
    }

    // Public function section =============================================

    // Private function section ============================================

    function bindBtnListeners_(curBtnEl, onClickFunc) {
      curBtnEl.addEventListener("mousedown", onDownEffect_, false);
      curBtnEl.addEventListener("mouseover", onOverToggleEffect_, false);
      curBtnEl.addEventListener("mouseout", onOverToggleEffect_, false);
      curBtnEl.addEventListener("mouseup", onUpEffect_, false);
      curBtnEl.addEventListener("click", onClickFunc, false);
    }

    function onClicked_(event) {
      event.stopPropagation();

      innityAppsTriggerTrack(this.trackingName);
      this.fn(event);
    }

    function onDownEffect_(event) {
      event.stopPropagation();

      if (isIninitially_ === true) {
        navEl_.classList.remove(CSSCLASS_NAV_EDU_);
        prevBtnEl_.classList.add(CSSCLASS_NAV_NOFOCUS);
        nextBtnEl_.classList.add(CSSCLASS_NAV_NOFOCUS);
        isIninitially_ = false;
      }
      this.classList.add(CSSCLASS_NAV_FOCUS);
      this.classList.add(CSSCLASS_NAV_CLICKED);
    }

    function onOverToggleEffect_(event) {
      event.stopPropagation();

      if (userHovered_ === false) {
        userHovered_ = true;
        this.classList.add(CSSCLASS_NAV_FOCUS);
      } else {
        userHovered_ = false;
        this.classList.remove(CSSCLASS_NAV_FOCUS);
      }
    }

    function onUpEffect_(event) {
      event.stopPropagation();

      this.classList.remove(CSSCLASS_NAV_FOCUS);
      this.classList.remove(CSSCLASS_NAV_CLICKED);
    }

    function renderClass_() {
      return [
        {
          id: "innityAppsBtnRevLitePrev",
          cssClass: [
            "innity-apps-desktop-navigation-btn",
            "innity-apps-desktop-prev-btn",
          ],
          innerHTML: HTML_NAV_ARROW,
        },
        {
          id: "innityAppsBtnRevLitenNext",
          cssClass: [
            "innity-apps-desktop-navigation-btn",
            "innity-apps-desktop-next-btn",
          ],
          innerHTML: HTML_NAV_ARROW,
        },
      ];
    }
  }

  function CardsSwipeEduMessage_() {
    this.add = addEduMessage;
    this.remove = removeEduMessage;

    const ACTIVE_EDU_MSG = "need-educate";

    let eduCard_ = null;
    let eduContainer_ = null;
    let delayAddClass_ = null;
    let doSlightSwipe_ = null;
    let loopTime = 4;
    let reqEduAnim_ = null;
    let showEducationMessage_ = null;
    let slightCardDelay_ = null;
    let slightSlideSpeed_ = 1;
    let startX = 0;

    initClass_();

    function initClass_() {
      eduContainer_ = document.getElementById("educator");
      bindVisibility_();
    }

    // Public function section =============================================

    function addEduMessage() {
      if (showEducationMessage_ === false) {
        return;
      }
      clearTimeout(slightCardDelay_);
      pauseSlightCardSwipe_();
      slightCardDelay_ = setTimeout(cardSlightSwipe_, 600);
      eduMessageAnimation_();
      toggleSlightSwipe_(true);
    }

    function removeEduMessage() {
      showEducationMessage_ = false;
      toggleSlightSwipe_(false);
    }

    // Private function section ============================================

    function bindVisibility_() {
      eduCard_ = document.getElementsByClassName(
        CARD_SEQUENCE_CSS_CLASS + 1
      )[0];
      document.addEventListener("visibilitychange", function () {
        if (document.visibilityState == "hidden") {
          toggleSlightSwipe_(false);
        } else {
          if (showEducationMessage_ === true) {
            addEduMessage();
          }
        }
      });
      window.addEventListener(
        "blur",
        function () {
          toggleSlightSwipe_(false);
        },
        false
      );
      document.addEventListener(
        "blur",
        function () {
          toggleSlightSwipe_(false);
        },
        false
      );
    }

    function cardSlightSwipe_() {
      if (startX > containerEl.offsetWidth * 0.32) {
        window.cancelAnimFrame(reqEduAnim_);
        eduCard_.style.left = "";
        startX = 0;
        updatedLeft = 0;
        eduCard_.classList.remove(FOLLOW_FINGER_CSS_CLASS);
        eduCard_.classList.add(CARD_TRANSITION_CSS_CLASS);
      } else {
        eduCard_.classList.add(FOLLOW_FINGER_CSS_CLASS);
        eduCard_.classList.remove(CARD_TRANSITION_CSS_CLASS);

        startX += slightSlideSpeed_;
        updatedLeft = window.innerWidth * cardLeftPosition - startX;
        eduCard_.style.left = updatedLeft + "px";
        reqEduAnim_ = window.requestAnimFrame(cardSlightSwipe_);
      }
    }

    function eduMessageAnimation_() {
      clearTimeout(delayAddClass_);
      eduContainer_.classList.remove(ACTIVE_EDU_MSG);
      delayAddClass_ = setTimeout(() => {
        eduContainer_.classList.add(ACTIVE_EDU_MSG);
      }, 100);
    }

    function pauseSlightCardSwipe_() {
      window.cancelAnimFrame(reqEduAnim_);
      startX = 0;
      updatedLeft = 0;
      eduCard_.classList.remove(FOLLOW_FINGER_CSS_CLASS);
      eduCard_.classList.add(CARD_TRANSITION_CSS_CLASS);
    }

    function toggleSlightSwipe_(isAdVisible) {
      window.cancelAnimFrame(reqEduAnim_);
      if (isAdVisible === true) {
        startX = 0;
        updatedLeft = 0;
        doSlightSwipe_ = setInterval(() => {
          clearTimeout(slightCardDelay_);
          slightCardDelay_ = setTimeout(cardSlightSwipe_, 600);
          eduMessageAnimation_();
        }, loopTime * 1000);
        showEducationMessage_ = true;
      } else {
        clearInterval(doSlightSwipe_);
        clearTimeout(slightCardDelay_);
        clearTimeout(delayAddClass_);
        pauseSlightCardSwipe_();
        eduContainer_.classList.remove(ACTIVE_EDU_MSG);
      }
    }
  }
}

function InnityAppsCardsDefaultTracking() {
  this.trackToLeft = trackToLeft;
  this.trackToRight = trackToRight;
  this.trackTimer = trackTimer;

  function trackToLeft() {
    innityAppsTriggerTrack("btn_card_left");
  }
  function trackToRight() {
    innityAppsTriggerTrack("btn_card_right");
  }
  function trackTimer(id) {
    innityAppsTriggerTimerStart(id);
  }
}

window.requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 60);
    }
  );
})();

window.cancelAnimFrame =
  window.cancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  function (requestID) {
    clearTimeout(requestID);
  }; //fall back
