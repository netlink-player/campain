let aiactivAppsAd = null;
let aiactivAppsIosWorkAroundEl = null;
let aiactivAppsIosWorkAroundCounter = 0;
let aiactivAppsIsBannerLoad = false;
/**
 * Only set to TRUE if required orientation.
 * @type Boolean
 */
let aiactivAppsIsOrientationEnable = false;
let aiactivAppsIsVersionDifferentWarned = false;
let aiactivAppsPlatform = null;
let aiactivAppsVersion = "6.0.0";

window.addEventListener("load", aiactivAppsInitSpinPlusInv, false);

function aiactivAppsInitSpinPlusInv() {
  aiactivAppsGenerateMainContent(
    document.getElementById("aiactiv-apps-ad-invitation")
  );

  window.addEventListener("message", aiactivAppsMessageHandler, false);
  window.addEventListener("resize", aiactivAppsResizeHandler, false);

  aiactivAppsPostReadyToProxy();
}

function aiactivAppsIosAppendText() {
  aiactivAppsIosWorkAroundEl.innerHTML += ".";
  aiactivAppsIosWorkAroundCounter++;

  if (aiactivAppsIosWorkAroundCounter >= 100) {
    aiactivAppsIosWorkAroundCounter = 0;
    aiactivAppsIosWorkAroundEl.innerHTML = "";
  }
}

function aiactivAppsMessageHandler(event) {
  let supportedMsg = event.data;
  if (
    typeof supportedMsg.owner === "undefined" ||
    supportedMsg.owner !== "AiActiv" ||
    typeof supportedMsg.adType === "undefined"
  ) {
    return;
  }

  if (supportedMsg.version != aiactivAppsVersion) {
    if (aiactivAppsIsVersionDifferentWarned === false) {
      console.warn(
        "Proxy and ad version is different! Proxy v" +
          supportedMsg.version +
          " vs Ad v" +
          aiactivAppsVersion
      );
      aiactivAppsIsVersionDifferentWarned = true;
    }
  }

  switch (supportedMsg.action) {
    case "bannerReady":
      aiactivAppsRunSpinInv(supportedMsg.data);
      break;
    default:
      break;
  }
}

function aiactivAppsPostReadyToProxy() {
  parent.postMessage(
    {
      owner: "AiActiv",
      adType: "aiactiv-apps-mobile-spin-inv",
      action: "adReady",
      data: {},
      version: aiactivAppsVersion,
    },
    "*"
  );
}

function aiactivAppsPostSectorClickToProxy(sector, direction) {
  parent.postMessage(
    {
      owner: "AiActiv",
      adType: "aiactiv-apps-mobile-spin-inv",
      action: "clicked",
      data: {
        sector: sector,
        direction: direction,
      },
      version: aiactivAppsVersion,
    },
    "*"
  );
}

function aiactivAppsResizeHandler() {
  let invitationEl = document.getElementById("aiactiv-apps-ad-invitation");
  invitationEl.style.height = invitationEl.clientWidth + "px";
}

function aiactivAppsRunSpinInv(proxyData) {
  aiactivAppsPlatform = new AiActivAppsMobilePlatform();

  if (typeof initSpinCreative === "function") {
    initSpinCreative(proxyData.country, proxyData.salesModel);
  }
  aiactivAppsSetIOSWorkaround();
}

/**
 * This is a workaround to enable iOS Safari touch events after user scroll the page.
 */
function aiactivAppsSetIOSWorkaround() {
  if (aiactivAppsPlatform.getOS() === "ios") {
    aiactivAppsIosWorkAroundEl = document.getElementById(
      "aiactiv-apps-ios-workaround"
    );
    setInterval(aiactivAppsIosAppendText, 500);
  }
}

let aiactivAppsImageSuffix = "_2x";
let aiactivAppsImagesToLoad = 0;
let aiactivAppsMaterialGeneratorVersion = "5.0.0";

function aiactivAppsDimensionRatioImageRename(elementType, materialEl) {
  if (elementType !== "img") {
    return;
  }

  let extension = ".png";

  if (materialEl.src.match(/.png/i)) {
    extension = ".png";
  } else if (materialEl.src.match(/.jpg/i)) {
    extension = ".jpg";
  } else if (materialEl.src.match(/.jpeg/i)) {
    extension = ".jpeg";
  }

  // Change image source based on the device pixel ratio.
  materialEl.src = materialEl.src.replace(
    /.png|.jpg|.jpeg/i,
    aiactivAppsImageSuffix + extension
  );
  aiactivAppsImagesToLoad++;
  materialEl.addEventListener("load", aiactivAppsImageLoadCompletedHandler);
}

function aiactivAppsGenerateMainContent(container, isDimensionRatio = false) {
  aiactivAppsGetDevicePixelRatio();

  for (let i = 0; i < aiactivAppsMaterials.length; i++) {
    aiactivAppsMaterialGenerator(
      aiactivAppsMaterials[i],
      container,
      isDimensionRatio
    );
  }

  aiactivAppsImageLoadDelay();
}

function aiactivAppsGetDevicePixelRatio() {
  let ratio = 1;

  // To account for zoom, change to use deviceXDPI instead of systemXDPI
  if (
    window.screen.systemXDPI !== undefined &&
    window.screen.logicalXDPI !== undefined &&
    window.screen.systemXDPI > window.screen.logicalXDPI
  ) {
    // Only allow for values > 1
    ratio = window.screen.systemXDPI / window.screen.logicalXDPI;
  } else if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  }

  if (ratio > 2.0 || document.documentElement.clientWidth >= 768) {
    aiactivAppsImageSuffix = "_3x";
  }
}

function aiactivAppsImageLoadCompletedHandler() {
  aiactivAppsImagesToLoad--;
}

function aiactivAppsImageLoadDelay() {
  if (aiactivAppsImagesToLoad > 0) setTimeout(aiactivAppsImageLoadDelay, 100);
  else {
    if (typeof bannerAnimationStart === "function") {
      setTimeout(bannerAnimationStart, 100);
    }

    if (typeof aiactivAppsBannerLoaded === "function") {
      setTimeout(aiactivAppsBannerLoaded, 100);
    }
  }
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
 * @param {boolean} isDimensionRatio Default is FALSE, set TRUE will generate image with _2x & _3x.
 */
function aiactivAppsMaterialGenerator(
  elementData,
  container,
  isDimensionRatio = false
) {
  let elementType =
    typeof elementData.elType === "undefined" ? "div" : elementData.elType;
  let materialEl = document.createElement(elementType);

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
        aiactivAppsTriggerClickTag(elementData.clickTag);
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
    typeof elementData.attrs !== "undefined" &&
    typeof elementData.attrs === "object"
  ) {
    for (let attrName in elementData.attrs) {
      materialEl.setAttribute(attrName, elementData.attrs[attrName]);
    }
  }

  if (
    typeof elementData.childs !== "undefined" &&
    typeof elementData.childs === "object"
  ) {
    for (let i = 0; i < elementData.childs.length; i++) {
      aiactivAppsMaterialGenerator(
        elementData.childs[i],
        materialEl,
        isDimensionRatio
      );
    }
  }

  if (isDimensionRatio === true) {
    aiactivAppsDimensionRatioImageRename(elementType, materialEl);
  }

  container.appendChild(materialEl);
}

function AiActivAppsMobilePlatform() {
  this.debug = debug;
  this.getBrowserName = getBrowserName;
  this.getBrowserVersion = getBrowserVersion;
  this.getOS = getOS;
  this.getOSVersion = getOSVersion;
  this.getVersion = getVersion;
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
   * Detect iOS Skype in app browser.
   * @returns {Boolean} TRUE if is iOS Skype in app browser, else FALSE.
   */
  function isIosSkype() {
    return os_ === "ios" && browserName_ === "other";
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
      var v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
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

function AiActivAppsSpinPlus(id, options) {
  this.startAutoAnimation = startAutoAnimation;

  let spinObj = null;
  let spinEl = null;
  let extraOptions = mergeObject(
    {
      sector: 3,
      // clockwise & counter-clockwise string following TweenMax library.
      autoSpinDirection: "clockwise",
      sectorClickedCallback: null,
      sectorChangedCallback: null,
      autoSpinEnded: null,
      country: "MY",
      salesModel: "CPM",
    },
    options,
    "extraOptions"
  );
  let anglePerSector = 360 / extraOptions.sector;
  let sectorClicked = 0;
  let spinDirection = "clockwise";
  let dragStartSector = -100;
  let dragStartDeg = 0;
  let timeline = null;

  initClass();

  function initClass() {
    spinEl = document.getElementById(id);
    spinObj = Draggable.create("#" + id, {
      type: "rotation",
      throwProps: true,
      snap: snapHandler,
      onDragStart: dragStartHandler,
      onDragEnd: dragEndHandler,
    });

    new CustomSamsungBrowserHandler();
  }

  // Public function section ===================================================

  // Private function section ==================================================

  function calcDesignerIndex_() {
    let tmpIndex = sectorClicked % extraOptions.sector;

    if (tmpIndex > 0) {
      tmpIndex = Math.abs(tmpIndex) + 1;
    } else if (tmpIndex < 0) {
      tmpIndex = extraOptions.sector - tmpIndex + 1;
    } else {
      tmpIndex = 1;
    }

    return tmpIndex;
  }

  function calcSectorSnaped(snapAngle, direction) {
    sectorClicked = calcSectorClicked(snapAngle);

    if (sectorClicked <= 0) {
      sectorClicked = Math.abs(sectorClicked);
    } else {
      sectorClicked = extraOptions.sector - sectorClicked;
    }

    if (typeof extraOptions.sectorChangedCallback === "function") {
      extraOptions.sectorChangedCallback(calcDesignerIndex_(), direction);
    }
  }

  function calcSectorClicked(snapAngle) {
    return Math.floor(Math.round(snapAngle % 360) / anglePerSector);
  }

  function clickOnSector() {
    if (typeof extraOptions.sectorClickedCallback === "function") {
      extraOptions.sectorClickedCallback(calcDesignerIndex_(), spinDirection);
    }
  }

  function snapHandler(angle) {
    let snapAngle = snapCalc(angle);
    calcSectorSnaped(snapAngle, this.getDirection());

    return snapAngle;
  }

  function snapCalc(angle) {
    return Math.round(angle / anglePerSector) * anglePerSector;
  }

  function dragStartHandler() {
    cancelAutoAnimation();
    dragStartDeg = this.rotation;
    dragStartSector = calcSectorClicked(snapCalc(this.rotation));
    if (dragStartSector <= 0) {
      dragStartSector = Math.abs(dragStartSector);
    } else {
      dragStartSector = extraOptions.sector - dragStartSector;
    }
  }

  function dragEndHandler() {
    if (extraOptions.salesModel === "CPE") {
      // CPE only expand banner when at least 1 sector is spined.
      // Spin a circle around back to the same sector checking.
      if (dragStartSector === sectorClicked) {
        let degDiff = Math.abs(dragStartDeg - this.rotation);
        if (degDiff < anglePerSector) {
          return;
        }
      }
    } else if (extraOptions.salesModel === "CPM") {
      // CPM expand banner when any touch/spin is triggered.
      if (extraOptions.country === "TW") {
        // TW need at least 20 degree spin to trigger expand.
        let degDiff = Math.abs(dragStartDeg - this.rotation);
        if (degDiff < 20) {
          return;
        }
      }
    }

    spinDirection = this.getDirection();
    setTimeout(clickOnSector, 300);
  }

  function startAutoAnimation() {
    let rotationValue = "-360deg";
    if (extraOptions.autoSpinDirection === "clockwise") {
      rotationValue = "360deg";
    }

    timeline = new TimelineMax({
      onComplete: autoAnimationComplete,
    });
    timeline.to(spinEl, 3, {
      rotation: rotationValue,
      ease: Back.easeOut.config(1.4),
      delay: 1,
    });
  }

  function autoAnimationComplete() {
    if (typeof extraOptions.autoSpinEnded === "function") {
      extraOptions.autoSpinEnded();
    }
  }

  function cancelAutoAnimation() {
    timeline.kill();
  }

  function mergeObject(defaultObj, overrideObject, reference) {
    for (let attributeKey in overrideObject) {
      if (defaultObj.hasOwnProperty(attributeKey)) {
        defaultObj[attributeKey] = overrideObject[attributeKey];
      } else {
        console.warn(
          "Key [" + attributeKey + "] not found in object merging process.",
          reference
        );
      }
    }

    return defaultObj;
  }

  function CustomSamsungBrowserHandler() {
    let clickEl;
    let initX = 0;
    let touchTime = 0;

    initClass();

    function initClass() {
      if (
        typeof aiactivAppsPlatform === "undefined" ||
        typeof aiactivAppsPlatform !== "object"
      ) {
        return console.error(
          "platform library unavailable! This can be fix by include MobilePlatform.js"
        );
      }

      if (aiactivAppsPlatform.isSamsungBrowser() === false) {
        return;
      }

      clickEl = document.getElementById("aiactiv-apps-ad-invitation");
      bindTouchEvent();
    }

    function bindTouchEvent() {
      clickEl.addEventListener("touchstart", samsungTouchstart, false);
      clickEl.addEventListener("touchend", samsungTouchend, false);
    }

    function samsungTouchstart(e) {
      initX = e.changedTouches[0].clientX;
      touchTime = new Date().getTime();
    }

    function samsungTouchend(e) {
      let xDiff = Math.abs(initX - e.changedTouches[0].clientX);
      if (xDiff < 5) {
        let timeDiff = new Date().getTime() - touchTime;
        if (timeDiff < 600) {
          clickOnSector();
        }
      }
    }
  }
}
