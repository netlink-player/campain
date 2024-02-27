adStudioTemplateName = 'revolver';
innity_protocol = (location.protocol == "https:") ? "https:" : "http:";
innity_domain   = (typeof innity_domain == "undefined") ? "" : innity_domain;
innity_assets   = (typeof innity_assets == "undefined") ? "" : innity_assets;
// @ Proxy Config 
var customAdProxy = function(attrName) {
	if(typeof innity_json === 'undefined') { return false; }
	if(typeof innity_json[attrName] !== 'undefined') {
		return innity_json[attrName];
	} else {
		return false;
	}
};
// Campaign ID
var campaignid_177002 = "11612";
// Cache buster
var cb_177002   = ''; //new Date().getTime();
var auth_177002 = Math.random().toString(36).substring(7) + "-" + cb_177002;

innity_pub = "something";
zone_177002 = "something";
pcu_177002 = "something";

if (typeof sdk !== 'undefined' && sdk !== null && sdk instanceof InnityAdSdk) {
  checkForSdk();
}

// Main file source
ad_177002 = {};
ad_177002.id = "innity_adslot_177002-" + cb_177002;
ad_177002.adid   = "177002";
ad_177002.zindex = "2147483645";
ad_177002.base = innity_domain;
ad_177002.assets = innity_assets;
ad_177002.src = `https://cdn.jsdelivr.net/gh/netlink-player/campain@master/vib/revolver/revolver/index.html`;
// ad_177002.src = ad_177002.base + `${ad_177002.assets}${adStudioTemplateName}/index.html?adid=c177002&init=true`;
 console.log(ad_177002.src);
function c177002_classReadyCallback() {
  console.log('%cClass is ready', 'background:lightgreen;');
}
function c177002_adReadyCallback(adMsg) {
  // adReady --> when ad is loaded & ready.
  // pubError --> Cannot find innity-in-post element.
  console.log('%cAd is ready (' + adMsg.adMessage + ')', 'color:white; background:darkblue;');
}
function c177002_adClosedCallback() {
  console.log('%cAd is CLOSED!', 'color:white; background:red;');
}
function c177002_bannerAdExpandedCallback() {
  console.log('%cBanner ad is expanded!', 'color:white; background:green;');
}
function c177002_bannerAdShrinkedCallback() {
  console.log('%cBanner ad is CLOSED!', 'color:white; background:black;');
}

var c177002_innityAppsOpts = {
  adID: '177002-' + cb_177002,
  containerID: ad_177002.id,
  iframeSrc: ad_177002.src,
//  country: 'TW',
//  closePosition: 'left', // right|left Default right
  classReadyCallback: c177002_classReadyCallback,
  adReadinessCallback: c177002_adReadyCallback,
  adClosedCallback: c177002_adClosedCallback,
  bannerAdExpandedCallback: c177002_bannerAdExpandedCallback,
  bannerAdClosedCallback: c177002_bannerAdShrinkedCallback,
//  tagGuarantee: true, // default will be true (boolean).
//  tagGuaranteeCallback: function() { console.log('tagGuaranteeCallback') }, // default will be null.
  accessibleWindow: null,
  accessibleDocument: null,
  currentScript: document.currentScript
};

if (top.location.href.indexOf('posttoday.com') > -1) {
  c177002_innityAppsOpts.posttoday = true;
} else if (top.location.href.indexOf('sportsv.net') > -1) {
  c177002_innityAppsOpts.sportsv = true;
} else if (top.location.href.indexOf('business-cambodia.com') > -1) {
  c177002_innityAppsOpts.businesscambodia = true;
} else if (top.location.href.indexOf('viva.co.id') > -1) {
  c177002_innityAppsOpts.vivaid = true;
} else if (top.location.href.indexOf('guangming.com.my') > -1) {
  c177002_innityAppsOpts.guangming = true;
} else if (top.location.href.indexOf('idntimes.com') > -1) {
  c177002_innityAppsOpts.idntimes = true;
} else if (top.location.href.indexOf('pixnet.net') > -1) {
  c177002_innityAppsOpts.pixnettw = true;
} else if (top.location.href.indexOf('sabay.com.kh') > -1) {
  c177002_innityAppsOpts.sabay = true;
} else if (top.location.href.indexOf('cen-news.com') > -1) {
  c177002_innityAppsOpts.cennews = true;
}

var c177002_innityAppsMobileAdObj = new c177002_InnityAppsRevolver(c177002_innityAppsOpts);
function c177002_InnityAppsRevolver(options) {
  this.cleanDebugMessage = cleanDebugMessage;
  this.getDebugMessage = getDebugMessage;
  this.getVersion = getVersion;

  // ========== Order dependency variable ==========
  let curDoc_ = document;
  let curWin_ = window;
  let debugMessage_ = '';
  let extraOptions_ = mergeObject_({
    adID: null,
    containerID: null,
    iframeSrc: null,
    closePosition: 'right', // right|left
    country: 'MY',
    // Events callback.
    classReadyCallback: null,
    adReadinessCallback: null,
    adClosedCallback: null,
    bannerAdExpandedCallback: null,
    bannerAdClosedCallback: null,
    // Publisher custom handler
    businesscambodia: false,
    cennews: false,
    guangming: false,
    idntimes: false,
    pixnettw: false,
    posttoday: false,
    sabay: false,
    sportsv: false,
    vivaid: false,
    // Publisher custom handler
    versionWarning: null,
    tagGuarantee: false,
    tagGuaranteeCallback: null,
    accessibleWindow: null,
    accessibleDocument: null,
    currentScript: curDoc_.currentScript,
    enableDebug: true
  }, options, 'extraOptions');
  let timeForDebug_ = new Date();
  let version_ = '4.6.35';
  // ========== Order dependency variable ==========

  let adSdkHelper_ = new InnityAppsAdSdkHelper();
  let carolBanner_ = null;
  let customPub_ = null;
  let iframeBreaker_ = new InnityAppsIframeBreaker();
  let isClassInit_ = false;
  let platform_ = null;
  let scrollHandler_ = null;
  let supportedMaxHeight_ = 850;
  let supportedMaxWidth_ = 450;

  if (curDoc_.readyState !== 'loading') {
    initClass_();

    log_('DOM is ready, direct execute the class.');
  } else {
    curDoc_.addEventListener('DOMContentLoaded', initClass_, false);

    log_('DOM isn\'t ready, listen to DOMContentLoaded event.');
  }

  function initClass_() {
    if (isClassInit_ === true) {
      return;
    }

    isClassInit_ = true;

    platform_ = new InnityAppsMobilePlatform();
    if (isSupported_() === false) {
      log_('Device not supported.');

      if (typeof extraOptions_.adReadinessCallback === 'function') {
        extraOptions_.adReadinessCallback({adMessage: 'Unsupported'});
      }

      return;
    }

    if (extraOptions_.tagGuarantee === true) {
      if (typeof extraOptions_.tagGuaranteeCallback === 'function') {
        extraOptions_.tagGuaranteeCallback();
        return;
      }
    }

    setupStyle_();
    carolBanner_ = new InnityAppsCarolBanner();
    customPub_ = new InnityAppsCustomPubs_();

    if (typeof extraOptions_.classReadyCallback === 'function') {
      extraOptions_.classReadyCallback();
    }
  }

  // Public function ===========================================================

  function cleanDebugMessage() {
    debugMessage_ = '';
  }

  function getDebugMessage() {
    return debugMessage_;
  }

  function getVersion() {
    return version_;
  }

  // Private function ==========================================================

  function log_(msg) {
    if (extraOptions_.enableDebug === true) {
      debugMessage_ += 'v' + version_ + ' [' + timeForDebug_.toGMTString() + '] ' + msg + '\n';
    }
  }

  function mergeObject_(defaultObj, overrideObject, reference) {
    for (let attributeKey_ in overrideObject) {
      if (defaultObj.hasOwnProperty(attributeKey_)) {
        defaultObj[attributeKey_] = overrideObject[attributeKey_];
      } else {
        console.warn('Key [' + attributeKey_ + '] not found in object merging process.', reference);
      }
    }

    return defaultObj;
  }

  function destroyAd() {    
    try {
      // remove adslot
      carolBanner_.getAdContainer().remove();
      
      // remove event listener
      carolBanner_.removeEventListener();
      scrollHandler_.removeScrollEvent();
      
      // remove script
      currentScript = getCurrentScript();
      currentScript.remove();

      // remove styling
      removeStyling();

      if (typeof extraOptions_.adClosedCallback === 'function') {
        extraOptions_.adClosedCallback();
      }
  
    } catch (e) {
      console.log(e);
    }
  }

  function getCurrentScript() {
    try {
      // check if currentSript exist
      if (typeof document.currentScript !== 'undefined' && document.currentScript !== null) {
        document.currentScript.id = 'innity_proxy_' + ad_177002.adid;
        return document.currentScript;
      }

      // search of script exist by using script id
      // Demo Purposes
      // let scriptEl = document.getElementById('innity_proxy_' + ad_177002.adid);
      // if (scriptEl !== null) {
      //   return document.getElementById('innity_proxy_' + ad_177002.adid);
      // }

      // try to look for using script src
      // for advenue the name usually proxy_177002.js
      // for test script the name usually ad.js
      let scripts = document.scripts;
      for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].src.indexOf('proxy_revolver.js') > 0) {
          scripts[i].id   = ad_177002.adid;
          return scripts[i];
        }
      }

    } catch(e) {
      console.log(e);
      return null;
    }
  };
  function removeStyling() {
    let containerStyling = document.getElementById(`innity-container-styling-${ad_177002.adid}`);

    containerStyling.remove();
  }
  function setupStyle_() {
    let styleElement = curDoc_.createElement('style');
    styleElement.id = 'innity-container-styling-' + ad_177002.adid;
    styleElement.setAttribute('data-owner', 'Innity');
    styleElement.innerHTML = '.innity-apps-reset{border:0;margin:0;padding:0}.innity-apps-mobile-carol-ad{height: calc(100vh + 1px);left:0;position:fixed;transition:bottom 1s ease-in-out;-moz-transition:bottom 1s ease-in-out;-webkit-transition:bottom 1s ease-in-out;width:100vw;z-index:2147483645}.innity-apps-mobile-carol-ad.innity-apps-invitation{bottom:calc(-100vh + (100vw / 9 * 4))}.innity-apps-mobile-carol-ad.innity-apps-expanded{bottom:0px}.innity-apps-mobile-carol-ad.innity-apps-expanded.innity-apps-ios{bottom:0px}.innity-apps-mobile-carol-ad-iframe{border:none;height:100%;width:100%}.innity-apps-mobile-carol-close-container{opacity:1;position:absolute;transition:opacity .5s ease-in-out,bottom .5s ease-in-out,top .5s ease-in-out;-moz-transition:opacity .5s ease-in-out,bottom .5s ease-in-out,top .5s ease-in-out;-webkit-transition:opacity .5s ease-in-out,bottom .5s ease-in-out,top .5s ease-in-out;width:44px;z-index:2147483647}.innity-apps-mobile-carol-close-container.innity-apps-invitation{top:0}.innity-apps-mobile-carol-close-container.innity-apps-left{left:0}.innity-apps-mobile-carol-close-container.innity-apps-right{right:0}.innity-apps-mobile-carol-close-btn{left:0;position:absolute;top:0;width:100%}.innity-apps-mobile-carol-close-container.smaller-ver{left:0px!important;opacity:0.5!important;top:70px!important;width:30px!important;}.innity-apps-expanded .innity-apps-mobile-carol-close-container.smaller-ver{top:unset!important;}.innity-apps-mobile-carol-close-btn.innity-apps-hide{display:none!important}';

    curDoc_.getElementsByTagName('body')[0].appendChild(styleElement);

    log_('style element creation completed.');
  }

  function isSupported_() {
    return isPlatformSupported_() && isScreenSizeSupported_();

    function isPlatformSupported_() {
      let isSupported_ = true;
      if (platform_.getOS() !== 'ios' && platform_.getOS() !== 'android') {
        isSupported_ = false;
        log_('Not mobile platform, platform detected is '+platform_.getOS());
      }

      return isSupported_;
    }

    function isScreenSizeSupported_() {
      let isSupported_ = true;
      if (curWin_.innerWidth * curWin_.innerHeight > supportedMaxWidth_ * supportedMaxHeight_) {
        isSupported_ = false;
        log_('Screen size too big. width='+curWin_.innerWidth+' height='+curWin_.innerHeight+' dimension='+(curWin_.innerWidth * curWin_.innerHeight));
      }

      return isSupported_;
    }
  }

  function versionDifferentCallback_(adVersion) {
    if (typeof extraOptions_.versionWarning === 'function') {
      extraOptions_.versionWarning(version_, adVersion);
    }
  }

  // [MobileSDKOverrideStart]
  function InnityAppsAdSdkHelper(opts) {
    this.closeAd = closeAd;
    this.expandAd = expandAd;
    this.getCloseBtnExtraOffset = getCloseBtnExtraOffset;
    this.getTimeoutTime = getTimeoutTime;
    this.isSdk = isSdk;
    this.shrink = shrink;

    let adSdk_ = null;
    let closeBtnExtraOffset_ = 0;
    let sdkOptions_ = mergeObject_({
      onNotchCompleted: null,
    }, opts, 'InnityAppsAdSdkHelper');

    initClass_();

    function initClass_() {
      if (typeof sdk !== 'undefined' && sdk !== null && sdk instanceof InnityAdSdk) {
        adSdk_ = sdk;
      } else {
        adSdk_ = new WebAdSdkDummy_();
      }

      notchChecking_();
    }

    // Public function =========================================================

    function closeAd() {
      adSdk_.unload();
    }

    function expandAd() {
      adSdk_.expand();
    }

    function getCloseBtnExtraOffset() {
      return closeBtnExtraOffset_;
    }

    function getTimeoutTime() {
      return 700;
    }

    function isSdk() {
      return adSdk_.isAdSdk();
    }

    function shrink() {
      adSdk_.close();
    }

    // Private function ========================================================

    function mergeObject_(defaultObj, overrideObject, reference) {
      for (let attributeKey_ in overrideObject) {
        if (defaultObj.hasOwnProperty(attributeKey_)) {
          defaultObj[attributeKey_] = overrideObject[attributeKey_];
        } else {
          console.warn('Key [' + attributeKey_ + '] not found in object merging process.', reference);
        }
      }

      return defaultObj;
    }

    function notchChecking_() {
      adSdk_.checkNotch()
          .then(notchCheckSolved_)
          .catch(function(error) {
            console.error('Something weird happen while checking notch.', error);
            notchCheckSolved_(false);
          });
    }

    async function notchCheckSolved_(isNotch) {
      if (isNotch === true) {
      
      	var screenSize = await adSdk_.getScreenSize();
      	if (screen.height - screenSize.height < 40)
        	closeBtnExtraOffset_ = screen.height > 800 ? 44 : 20;
      }

      if (typeof sdkOptions_.onNotchCompleted === 'function') {
        sdkOptions_.onNotchCompleted();
      }
    }

    // Private class =============================================================

    function WebAdSdkDummy_() {
      this.close = close;
      this.expand = expand;
      this.isAdSdk = isAdSdk;
      this.checkNotch = checkNotch;
      this.unload = unload;

      // Public function =======================================================

      function close() {}

      function expand() {}

      function isAdSdk() {
        return false;
      }

      function checkNotch() {
        return new Promise(function(resolve, reject) {
          resolve(false);
        });
      }

      function unload() {}

    }

  }
  // [MobileSDKOverrideEnd]

  /**
   * Iframe breaker module.
   */
  function InnityAppsIframeBreaker() {
    this.isInsideIframe = isInsideIframe;

    initClass_();

    // Public function =========================================================

    function isInsideIframe() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    }

    // Private function ========================================================

    function handleDocumentAndWindow_() {
      if (isInsideIframe() === true) {
        curWin_ = (extraOptions_.accessibleWindow === null) ? top.window : extraOptions_.accessibleWindow;
        curDoc_ = (extraOptions_.accessibleDocument === null) ? top.document : extraOptions_.accessibleDocument;
        log_('Proxy is within DFP or IFRAME.');
      } else {
        curWin_ = (extraOptions_.accessibleWindow === null) ? window : extraOptions_.accessibleWindow;
        curDoc_ = (extraOptions_.accessibleDocument === null) ? document : extraOptions_.accessibleDocument;
        log_('Proxy is same layer with publisher.');
      }
    }

    function initClass_() {
      if (extraOptions_.accessibleWindow !== null && extraOptions_.accessibleDocument !== null) {
        curWin_ = extraOptions_.accessibleWindow;
        curDoc_ = extraOptions_.accessibleDocument;
        log_('Window & Document were pass in by Proxy.');
      } else {
        handleDocumentAndWindow_();
      }
    }
  }

  function InnityAppsCarolBanner() {
    this.getAdContainer = getAdContainer;
    this.removeEventListener = removeEventListener;

    let adContainer_ = null;
    let adIframe_ = null;
    let closeBtn_ = null;
    let isExpand_ = false;

    initClass_();

    // Public function =========================================================

    function getAdContainer() {
      return adContainer_;
    }

    function removeEventListener() {
      window.removeEventListener('message', messageHandler_, false);
      curWin_.removeEventListener('message', messageHandler_, false);

      curWin_.removeEventListener('resize', resizeHandler_, {passive: true});
    }

    // Private function ========================================================

    function bindEvents_() {
      window.addEventListener('message', messageHandler_, false);
      curWin_.addEventListener('message', messageHandler_, false);

      curWin_.addEventListener('resize', resizeHandler_, {passive: true});
    }

    function closeBanner_() {
      adSdkHelper_.closeAd();

      isExpand_= false;
      destroyAd();
    }

    function expandBanner_() {
      adContainer_.classList.remove('innity-apps-invitation');
      adContainer_.classList.add('innity-apps-expanded');

      isExpand_ = true;

      // SDK need to hide close button instantly.
      if (adSdkHelper_.isSdk() === true) {
        closeBtn_.hide();
        // SDK only show expanded banner after a delay due to iframe resize required small amount of time.
        setTimeout(() => {
          adSdkHelper_.expandAd();
          closeBtn_.switchToShrink();
        }, adSdkHelper_.getTimeoutTime());
      } else {
        closeBtn_.switchToShrink();
      }

      updateCloseBtnPosition_();
      postWindowHeightToIframe_();

      if (typeof extraOptions_.bannerAdExpandedCallback === 'function') {
        extraOptions_.bannerAdExpandedCallback();
      }
    }

    function initClass_() {
      setupContainer_();
      closeBtn_ = new InnityAppsCloseShrinkButton(adContainer_, shrinkBanner_, closeBanner_);
      bindEvents_();
      resizeHandler_();
    }

    function initOrientationHandler_() {
      new InnityAppsOrientation(postMsgToIframe_);
    }

    function InnityAppsScrollEventHandler_() {
      this.removeScrollEvent = removeScrollEvent;

      let scrollInit = 0;

      initClass__();

      function initClass__() {
        window.addEventListener('scroll', onScroll__, {passive: true});
      }

      function removeScrollEvent() {
        window.removeEventListener('scroll', onScroll__, {passive: true});
      }

      function onScroll__() {
        let yDiff = scrollInit - window.scrollY;

        postMsgToIframe_('scroll', {isScrollingBottom: yDiff > 0});
        scrollInit = window.scrollY;
      }
    }

    function interactionHandler_(data) {
      if (data.interaction === 'expand-banner') {
        expandBanner_();
      }
    }

    function messageHandler_(event) {
      let supportedMsg = event.data;
      if (typeof (supportedMsg.owner) === 'undefined' || supportedMsg.owner !== 'Innity') {
        return;
      }

      if (supportedMsg.version !== version_) {
        versionDifferentCallback_(supportedMsg.version);
        log_('Proxy and ad version is different! v' + supportedMsg.version);
      }

      if (supportedMsg.action === 'close_overlay') {
        destroyAd();
        return;
      }

      if (typeof (supportedMsg.adType) === 'undefined' || supportedMsg.adType !== 'innity-apps-mobile-carol') {
        return;
      }

      switch (supportedMsg.action) {
        case 'adReady':
          if (typeof extraOptions_.adReadinessCallback === 'function') {
            extraOptions_.adReadinessCallback({adMessage: supportedMsg.action});
          }

          if (supportedMsg.data.orientation === true) {
            initOrientationHandler_();
          }

          scrollHandler_ = new InnityAppsScrollEventHandler_();

          postMsgToIframe_('shown', {country: extraOptions_.country});

          break;
        case 'interaction':
          interactionHandler_(supportedMsg.data);
          break;
        case 'adDidExpand':
          setTimeout(closeBtn_.switchToShrink, 500);
          break;
        default:
          break;
      }
    }

    function postMsgToIframe_(actionToPost, dataToPost = {}) {
      if (adIframe_ === null) {
        return;
      }

      adIframe_.contentWindow.postMessage({owner: 'Innity', adType: 'innity-apps-mobile-carol', action: actionToPost, data: dataToPost, version: version_}, '*');
    }

    function postWindowHeightToIframe_() {
      postMsgToIframe_('resize', {windowHeight: curWin_.innerHeight});
    }

    function resizeHandler_() {
      if (isExpand_ === true) {
        postWindowHeightToIframe_();
        updateCloseBtnPosition_();
        return;
      }

      if (closeBtn_ !== null) {
        closeBtn_.setToInvitationPosition(0);
      }

      if (adSdkHelper_.isSdk() === false) {
        if (curWin_.innerWidth > curWin_.innerHeight) {
          adContainer_.classList.add('innity-apps-hide');
        } else {
          adContainer_.classList.remove('innity-apps-hide');
        }
      }
    }

    function setupContainer_() {
      adContainer_ = curDoc_.createElement('div');
      adContainer_.setAttribute('id', extraOptions_.containerID);
      adContainer_.classList.add('innity-apps-reset');
      adContainer_.classList.add('innity-apps-mobile-carol-ad');
      adContainer_.classList.add('innity-apps-invitation');
      resizeHandler_();

      if (platform_.getOS() === 'ios') {
        adContainer_.classList.add('innity-apps-ios');
      }

      setupIframe_();

      curDoc_.body.append(adContainer_);
    }

    function setupIframe_() {
      adIframe_ = curDoc_.createElement('iframe');
      adIframe_.setAttribute('id', 'innity_iframe_' + extraOptions_.adID);
      adIframe_.classList.add('innity-apps-mobile-carol-ad-iframe');
      adIframe_.src = extraOptions_.iframeSrc;
      adIframe_.setAttribute('allowfullscreen', 'true');
      adIframe_.setAttribute('webkitallowfullscreen', 'true');
      adIframe_.setAttribute('scrolling', 'no');

      adContainer_.appendChild(adIframe_);
    }

    function shrinkBanner_() {
      adSdkHelper_.shrink();

      adContainer_.classList.remove('innity-apps-expanded');
      adContainer_.classList.add('innity-apps-invitation');

      isExpand_ = false;
      resizeHandler_();

      closeBtn_.switchToClose();

      if (typeof extraOptions_.bannerAdClosedCallback === 'function') {
        extraOptions_.bannerAdClosedCallback();
      }

      postMsgToIframe_('shrink-banner');
    }

    function updateCloseBtnPosition_() {
      let closeBtnNewBottom = curWin_.innerHeight - adSdkHelper_.getCloseBtnExtraOffset();
      closeBtn_.updateBottom(closeBtnNewBottom);
    }
  }

  function InnityAppsCloseShrinkButton(container, shrinkCallback, closeCallback) {
    this.hide = hide;
    this.setToInvitationPosition = setToInvitationPosition;
    this.switchToClose = switchToClose;
    this.switchToShrink = switchToShrink;
    this.updateBottom = updateBottom;
    let closeContainer_ = null;
    let closeImg_ = null;
    let shrinkImg_ = null;

    initClass_();

    // Public function =========================================================

    function hide() {
      closeImg_.classList.add('innity-apps-hide');
      shrinkImg_.classList.add('innity-apps-hide');
    }

    function setToInvitationPosition() {
      closeContainer_.style.bottom = '';
      closeContainer_.classList.add('innity-apps-invitation');
    }

    function switchToClose() {
      closeImg_.classList.remove('innity-apps-hide');
      shrinkImg_.classList.add('innity-apps-hide');
    }

    function switchToShrink() {
      closeImg_.classList.add('innity-apps-hide');
      shrinkImg_.classList.remove('innity-apps-hide');
    }

    function updateBottom(newBottom) {
      closeContainer_.classList.remove('innity-apps-invitation');
      closeContainer_.style.bottom = newBottom + 'px';
    }

    // Private function ========================================================

    function closeBtnClickHandler_(e) {
      e.stopPropagation();

      if (typeof closeCallback === 'function') {
        closeCallback();
      }
    }

    function initClass_() {
      closeContainer_ = curDoc_.createElement('div');
      closeContainer_.classList.add('innity-apps-reset');
      closeContainer_.classList.add('innity-apps-mobile-carol-close-container');
      closeContainer_.classList.add('innity-apps-invitation');

      if (extraOptions_.country === 'TW') {
        closeContainer_.classList.add('smaller-ver');
      }

      setClosePosition_();
      setupImages_();

      container.appendChild(closeContainer_);
    }

    function setClosePosition_() {
      let closePositionCssName = 'innity-apps-right';
      switch (extraOptions_.closePosition.toLowerCase()) {
        case 'left':
          closePositionCssName = 'innity-apps-left';
          break;
      }

      closeContainer_.classList.add(closePositionCssName);
    }

    function setupImages_() {
      closeImg_ = new Image();
      closeImg_.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAMAAAAOusbgAAAAz1BMVEUAAAAICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAj///8LCwv+/v7s7OwqKiocHBz6+vqoqKgSEhL29vbl5eXLy8tTU1MzMzN+fn5ubm5gYGBZWVk9PT0jIyMXFxfd3d3U1NTBwcGVlZWMjIx4eHhzc3Px8fG5ubm0tLSamppISEguLi7w8PDa2trQ0NCwsLCfn59tbW1DQ0Pg4OCLi4uKiopiYmI3Nzenc6M6AAAAFnRSTlMA+sMK17iYjU4x6eXRyoRsaD47KgQPeiv7RQAAA09JREFUaN7t2utS4kAQBWAmEsJFQES7AwKKgOIFL6y64nV1ff9nWmqL2k4zyZCkQ9VizfdXq05NMkNOZpKzLMuyLMuyDLYa9YKbLysAUOW8W6g3tnLrt1urKlimqrXd3Do1vQpEqXjN3JoUHTBzirk1KG7DatuZR5cciMcpZTqPPQVxKW8ru+HmIYl8VoPeUZCM2skidq8AyRX25LfXhTRc6Y3edyAdZ182XgfSciRj3nMhPVdwnwsgUUi/jkAm7aoqKZBRpXQTKw9S+VQTzAPG/5x1XzpgNPzygfHkF9rv4dzzBUTrHCM+HYgvtqPnzh0fQpTzS5zr82Qn+XMfmB4uXEUlH/xCDElO3Ax43xjgP3c+hHns40L/nHUS2YA/kNyHJQ/b9A/XkiE7wLxhQE9PPpshuRPc5SZwh08Y8ApL3n9gwCcwzdRrmKYsXUzm5xEGTC4Ea7miT9o+BtywmdfFgOMOcJUk7ylhy6WNASP6w5jn6j8xCd5uahAxccktLJy2kIQu81r84CqEOWNT6AT+OsGge8ol1fjPJQXhyWwS/Ya5W5b74kMIFfsZ1QASPX1bY4AR6gtc14gbXAcmagJ3Bzcs94FyuXoGVWvcCo6Z5V7Ly5ehW/JJzJd2JDdusLHzvGGokakBxQ0ug8kUQ0zBoBw3WIHRSIttnYCJihsMK3ws556CmTCYXLPc7hjWHUx1MqjfySpYrcidIDdZkazEs5o6AaG6HaksXsdUYwnVbfk6doHRa6zuypTsyn6rqQ0QU90mBfnT6YzlttBUt0ld/DzmNfbya2J6GpOGqIHoNbYDHWPdpgYi7FyDI15jtaX1AKGqspap11hz3SY1Wa/Wa6y5bpNd0ZuEXmPNdZtUBO9Oeo011m3Bu1PTmNvzzXWbawrej8+7vMYa6/YAGEeyIzDgNdZct5+BKUr2QIZ8yZjr9oyfy8h2fV5pways23eCAWt32e9RjV1Rt9uPgjtMO3uUvKrGThe5Q/E2qgcs+QHxyFhjR3oueFns3h68X4DRtI1Xj4LdW8F+tb+8X71hO/TiM4kNPIWRnTtt5Emb4GxxY09T050fb/iJeeJvBL7BVxGJvwP5Fl++pPnWZ/O/bor+nsuyLMuyLMv6H/0BsGbNC0rD7cQAAAAASUVORK5CYII=';
      closeImg_.classList.add('innity-apps-mobile-carol-close-btn');
      closeImg_.addEventListener('click', closeBtnClickHandler_, false);

      closeContainer_.appendChild(closeImg_);

      shrinkImg_ = new Image();
      shrinkImg_.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAHgAAAB4CAYAAAA5ZDbSAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzI2QzFERTZGRjJFMTFFNzkxQTM5OTg5RTc2MjY3RkEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzI2QzFERTdGRjJFMTFFNzkxQTM5OTg5RTc2MjY3RkEiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MjZDMURFNEZGMkUxMUU3OTFBMzk5ODlFNzYyNjdGQSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MjZDMURFNUZGMkUxMUU3OTFBMzk5ODlFNzYyNjdGQSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PpLO9yIAAAgKSURBVHja7J3vS1RZ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';
      shrinkImg_.classList.add('innity-apps-mobile-carol-close-btn');
      shrinkImg_.classList.add('innity-apps-hide');
      shrinkImg_.addEventListener('click', shrinkBtnClickHandler_, false);

      closeContainer_.appendChild(shrinkImg_);
    }

    function shrinkBtnClickHandler_(e) {
      e.stopPropagation();

      if (typeof shrinkCallback === 'function') {
        shrinkCallback();
      }
    }
  }

  function InnityAppsCustomPubs_() {
    initClass__();

    function initClass__() {
      injectStyle__();
    }

    // Public Function Section =================================================

    // Private Function Section ================================================

    function injectStyle__() {
      if (extraOptions_.posttoday === true) {
        posttodayStyle___();
      } else if (extraOptions_.sportsv === true) {
        sportsvStyle___();
      } else if (extraOptions_.businesscambodia === true) {
        businesscambodiaStyle___();
      } else if (extraOptions_.vivaid === true) {
        vivaIdStyle___();
      } else if (extraOptions_.guangming === true) {
        guangmingStyle___();
      } else if (extraOptions_.idntimes === true) {
        idntimesStyle___();
      } else if (extraOptions_.pixnettw === true) {
        pixnetTwStyle___();
      } else if (extraOptions_.sabay === true) {
        sabayStyle___();
      } else if (extraOptions_.cennews === true) {
        cenNewsStyle___();
      }

      function businesscambodiaStyle___() {
        let customePubStyleElement = curDoc_.createElement('style');
        customePubStyleElement.setAttribute('data-owner', 'Innity');
        customePubStyleElement.setAttribute('data-purpose', 'PostToday custom');
        customePubStyleElement.innerHTML = '.innity-apps-mobile-carol-ad.innity-apps-invitation{bottom:calc(-100vh + (100vw / 9 * 4) + 37px)}';

        curDoc_.getElementsByTagName('body')[0].appendChild(customePubStyleElement);

        log_('Custom for businesscambodia');
      }

      function cenNewsStyle___() {
        let customePubStyleElement = curDoc_.createElement('style');
        customePubStyleElement.setAttribute('data-owner', 'Innity');
        customePubStyleElement.setAttribute('data-purpose', 'CenNews custom');
        customePubStyleElement.innerHTML = '.innity-apps-mobile-carol-ad.innity-apps-invitation{bottom:calc(-100vh + (100vw / 9 * 4) + 40px)}';

        curDoc_.getElementsByTagName('body')[0].appendChild(customePubStyleElement);

        log_('Custom for CenNews');
      }

      function guangmingStyle___() {
        let customePubStyleElement = curDoc_.createElement('style');
        customePubStyleElement.setAttribute('data-owner', 'Innity');
        customePubStyleElement.setAttribute('data-purpose', 'Guang Ming custom');
        customePubStyleElement.innerHTML = '.innity-apps-mobile-carol-ad.innity-apps-invitation{bottom:calc(-100vh + (100vw / 9 * 4) + 55px)}';

        curDoc_.getElementsByTagName('body')[0].appendChild(customePubStyleElement);

        log_('Custom for guangming');
      }

      function idntimesStyle___() {
        let customePubStyleElement = curDoc_.createElement('style');
        customePubStyleElement.setAttribute('data-owner', 'Innity');
        customePubStyleElement.setAttribute('data-purpose', 'Idn Times custom');
        customePubStyleElement.innerHTML = '.innity-apps-mobile-carol-ad.innity-apps-invitation{bottom:calc(-100vh + (100vw / 9 * 4) + 35px)}';

        curDoc_.getElementsByTagName('body')[0].appendChild(customePubStyleElement);

        log_('Custom for idntimes');
      }

      function pixnetTwStyle___() {
        let customePubStyleElement = curDoc_.createElement('style');
        customePubStyleElement.setAttribute('data-owner', 'Innity');
        customePubStyleElement.setAttribute('data-purpose', 'Pixnet TW custom');
        customePubStyleElement.innerHTML = '.innity-apps-mobile-carol-ad.innity-apps-invitation{bottom:calc(-100vh + (100vw / 9 * 4));z-index:99990;}.innity-apps-mobile-carol-close-container{z-index:99999;}';

        let bottomNav = document.getElementsByClassName('pixnet-happix-pilot__launcher-bar')[0];
				if (bottomNav !== undefined) {
					customePubStyleElement.innerHTML += '.innity-apps-mobile-carol-ad.innity-apps-invitation{bottom:calc(-100vh + (100vw / 9 * 4) + 45px);'
				}
        
        curDoc_.getElementsByTagName('body')[0].appendChild(customePubStyleElement);

        log_('Custom for pixnet');
      }

      function posttodayStyle___() {
        let customePubStyleElement = curDoc_.createElement('style');
        customePubStyleElement.setAttribute('data-owner', 'Innity');
        customePubStyleElement.setAttribute('data-purpose', 'PostToday custom');
        customePubStyleElement.innerHTML = '.innity-apps-mobile-carol-ad.innity-apps-invitation{bottom:calc(-100vh + (100vw / 9 * 4) + 55px)}';

        curDoc_.getElementsByTagName('body')[0].appendChild(customePubStyleElement);

        log_('Custom for posttoday');
      }

      function sabayStyle___() {
        let customePubStyleElement = curDoc_.createElement('style');
        customePubStyleElement.setAttribute('data-owner', 'Innity');
        customePubStyleElement.setAttribute('data-purpose', 'Sabay custom');
        customePubStyleElement.innerHTML = '.innity-apps-mobile-carol-ad{z-index:99998}.innity-apps-mobile-carol-close-container{z-index:100000}';

        curDoc_.getElementsByTagName('body')[0].appendChild(customePubStyleElement);

        log_('Custom for sabay');
      }

      function sportsvStyle___() {
        let customePubStyleElement = curDoc_.createElement('style');
        customePubStyleElement.setAttribute('data-owner', 'Innity');
        customePubStyleElement.setAttribute('data-purpose', 'SportSV custom');
        customePubStyleElement.innerHTML = '.innity-apps-mobile-carol-ad.innity-apps-invitation{background: grey;}';

        curDoc_.getElementsByTagName('body')[0].appendChild(customePubStyleElement);

        log_('Custom for sportsv');
      }

      function vivaIdStyle___() {
        let customePubStyleElement = curDoc_.createElement('style');
        customePubStyleElement.setAttribute('data-owner', 'Innity');
        customePubStyleElement.setAttribute('data-purpose', 'Viva ID custom');
        customePubStyleElement.innerHTML = '.innity-apps-mobile-carol-ad.innity-apps-invitation{bottom:calc(-100vh + (100vw / 9 * 4) + 85px)}';

        curDoc_.getElementsByTagName('body')[0].appendChild(customePubStyleElement);

        log_('Custom for sportsv');
      }

    }

  }

  // [MobileSupportOverrideStart]
  function InnityAppsMobilePlatform() {
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
    var browserName_ = 'other';
    var browsersVersion_ = {
      'chrome': '0',
      'samsungbrowser': '0',
      'safari': '0',
      'crios': '0' // ios Chrome
    };
    /**
     * Consist of <b>ios</b>, <b>android</b> & <b>other</b>
     * @type String
     */
    var os_ = 'other';
    var osVersion_ = '0';
    var ua_ = null;
    /**
     * A checking to determine is the library latest.
     * @type String
     */
    var version_ = '5.0.0';

    initClass();

    // Public function =========================================================

    /**
     * For debug purpose.
     * @returns {String}
     */
    function debug() {
      var stringValue = '';
      if (os_ === 'ios') {
        stringValue = os_ + ' Version ' + osVersion_.join('.') + ' with ' + browserName_;
      } else {
        stringValue = os_ + ' Version ' + osVersion_ + ' with ' + browserName_;
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
      return os_ === 'ios' && browserName_ === 'other';
    }

    /**
     * Detect iOS WeChat in app browser.
     * @returns {Boolean} TRUE if is iOS WeChat in app browser, else FALSE.
     */
    function isIosWeChat() {
      return os_ === 'ios' && browserName_ === 'wechat';
    }

    function isSamsungBrowser() {
      return browsersVersion_.samsungbrowser > 0;
    }

    // Private function ========================================================

    function androidBrowserDetection_() {
      if (!!window.chrome && ua_.toLowerCase().indexOf('chrome') > -1) {
        browserName_ = 'chrome';
        androidChromeVersionDetection_();
      }

      if (ua_.toLowerCase().indexOf('samsungbrowser') > -1) {
        browserName_ = 'samsung';
        samsungBrowserVersionDetection_();
      }

      if (ua_.toLowerCase().indexOf('firefox') > -1) {
        browserName_ = 'firefox';
      }
    }

    function androidChromeVersionDetection_() {
      var analysis = ua_.match(/(chrome(?=\/))\/?\s*(\d+)/i) || [];
      if (analysis[1].toLowerCase() === 'chrome') {
        browsersVersion_['chrome'] = analysis[2];
      }
    }

    function browserDetection_() {
      if (os_ === 'ios') {
        iosBrowserDetection_();
      } else if (os_ === 'android') {
        androidBrowserDetection_();
      }
    }

    function iosBrowserDetection_() {
      var standalone = window.navigator.standalone;
      var isSafariKeyExist = /safari/i.test(ua_);
      var isChrome = /CriOS/i.test(ua_);

      if (!standalone && isSafariKeyExist === true) {
        if (isChrome === true) {
          browserName_ = 'chrome';
          iosChromeVersionDetection_();
          return;
        }

        var isLine = /Line/i.test(ua_);
        if (isLine === true) {
          browserName_ = 'line';
          return;
        }

        browserName_ = 'safari';
        browsersVersion_['safari'] = osVersion_.join('.');
      } else if (standalone && isSafariKeyExist === false) {
        // Standalone, homepage icon page
      } else {
        // In app browser
        if (/\bFB[\w_]+\//i.test(ua_) === true) {
          browserName_ = 'facebook';
        } else if (/\bMicroMessenger\//i.test(ua_) === true) {
          browserName_ = 'wechat';
        } else {
          // So far Skype don't have any key to detect.
          browserName_ = 'other';
        }
      }
    }

    function iosChromeVersionDetection_() {
      var analysis = ua_.match(/(crios(?=\/))\/?\s*(\d+)/i) || [];
      if (analysis[1].toLowerCase() === 'crios') {
        browsersVersion_['crios'] = analysis[2];
      }
    }

    function initClass() {
      ua_ = window.navigator.userAgent;

      osDetection_();
      browserDetection_();
    }

    function osDetection_() {
      if (/(iPhone|iPod|iPad)/i.test(ua_)) {
        os_ = 'ios';
        var v = (navigator.userAgent).match(/OS (\d+)_(\d+)_?(\d+)?/);
        osVersion_ = [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      } else if (ua_.toLowerCase().indexOf('android') > -1) {
        os_ = 'android';
        var v = ua_.match(/Android (\d+(?:\.\d+){0,2})/i);
        if (v !== null) {
          osVersion_ = v[v.length - 1];
        }
      }
    }

    function samsungBrowserVersionDetection_() {
      var analysis = ua_.match(/(samsungbrowser(?=\/))\/?\s*(\d+)/i) || [];
      if (analysis[1].toLowerCase() === 'samsungbrowser') {
        browsersVersion_['samsungbrowser'] = analysis[2];
      }
    }

  }
  // [MobileSupportOverrideEnd]

  function InnityAppsOrientation(postMsgToIframe) {
    initClass_();

    // Public function =========================================================

    // Private function ========================================================

    function initClass_() {
      if (curWin_.DeviceOrientationEvent) {
        curWin_.addEventListener('orientationchange', onOrientationChange_, false);
        curWin_.addEventListener('deviceorientation', onDeviceOrientation_, false);
      } else {
        postMsgToIframe('orientationNoSupported');
      }
    }

    function onDeviceOrientation_(e) {
      var data = {eventType: 'deviceorientation', alpha: e.alpha, beta: e.beta, gamma: e.gamma};
      postMsgToIframe('', data);
    }

    function onOrientationChange_(e) {
      var data = {eventType: 'orientationchange'};
      postMsgToIframe('', data);
    }
  }

}

async function checkForSdk() {
  if (sdk.is_sdk_exists()) {
    let sizes = await sdk.getScreenSize();
    let width = sizes.width;
    let height = (width * 4) / 9;
    sdk.setResizeProperties({width: width, height: height, offsetX: 0, offsetY: sizes.height - height});
    sdk.resize();

    document.body.style.margin = 0;
    document.body.style.overflow = 'hidden';
    document.body.style.padding = 0;

    sdk.adLoaded();
  }
}