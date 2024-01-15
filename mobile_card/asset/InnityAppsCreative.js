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

    // Public Function Section =================================================

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
        return os_ === 'ios' && browserName_ === 'wechat';
    }

    function isSamsungBrowser() {
        return browsersVersion_.samsungbrowser > 0;
    }

    // Proctected Function Section =============================================

    // Private Function Section ================================================

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
            } else if (/\bInstagram\b/i.test(ua_) === true) {
                browserName_ = 'instagram';
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

let innityAppsTimerTrackingID = null;
let innityAppsAdTimerTrackingID = null;
/**
 * For reference purpose only.
 * @type String
 */
let innityAppsTrackerVersion = '5.0.0';

function innityAppsTrackerReset() {
    innityAppsTriggerTimerStop();
    innityAppsTrackerPauseVideo();
}

function innityAppsTriggerClickTag(clickTag) {
    innityAppsTrackerPauseVideo();
    InnityHTMLAd.click({clickTAG: clickTag});
}

function innityAppsTriggerUrl(urlToLand) {
    innityAppsTrackerPauseVideo();
    InnityHTMLAd.click({url: urlToLand});
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
    if (typeof innityAppsPauseAllVideo === 'function') {
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
        console.error('Missing innityAppsPlatform library! Please include InnityAppsMobilePlatform class');
        return;
    }

    let responsiveID = '';
    switch (innityAppsPlatform.getOS()) {
        case 'android':
        case 'ios':
            responsiveID = 'mobile_' + id;
            break;
        default:
            responsiveID = 'nonmobile_' + id;
            break;
    }

    return responsiveID;
}

let innityAppsMaterialGeneratorVersion = '6.0.0';
let innityAppsTotalImage = 0;

function innityAppsGenerateMainContent(container, waitForImageLoad = false) {
    for (let i = 0; i < innityAppsMaterials.length; i++) {
        innityAppsMaterialGenerator(innityAppsMaterials[i], container, waitForImageLoad);
    }

    if (waitForImageLoad === false || innityAppsTotalImage === 0) {
        innityAppsMaterialsLoadedCompleted();
    }
}

function innityAppsGifToMp4(elementData) {
    if (elementData.elType !== 'img') {
        return;
    }

    if (typeof elementData.isGifConverted !== 'boolean') {
        return;
    }

    if (elementData.isGifConverted === false) {
        return;
    }

    let imgSrc = elementData.attrs.src;
    if (elementData.attrs['data-src'] !== undefined) {
        // Some template is using data-src to load image source before user engaged.
        imgSrc = elementData.attrs['data-src'];
    }

    if (imgSrc === undefined) {
        return;
    }

    if (imgSrc.toLowerCase().indexOf('gif') === -1) {
        return;
    }

    elementData.elType = 'video';
    elementData.attrs.src = imgSrc.toLowerCase().replace('gif', 'mp4');
    if (elementData.attrs['data-src'] !== undefined) {
        // Some template is using data-src to load image source before user engaged.
        elementData.attrs.src = '';
        elementData.attrs['data-src'] = imgSrc.toLowerCase().replace('gif', 'mp4');
    }
    elementData.attrs.preload = 'metadata';
    elementData.attrs.autoplay = '';
    elementData.attrs.muted = '';
    elementData.attrs.loop = '';
    elementData.attrs.playsinline = '';

    if (elementData.cssClass === undefined) {
        elementData.cssClass= [];
    }
    elementData.cssClass.push('innity-apps-animated-gif-video');
}

function innityAppsGetWebpParentEl(elementData, materialEl) {
    if (typeof elementData.isWebp !== 'boolean') {
        return null;
    }

    if (elementData.isWebp === false) {
        return null;
    }

    if (elementData.elType !== 'img') {
        return null;
    }

    if (typeof elementData.attrs === 'undefined' || typeof elementData.attrs !== 'object') {
        return null;
    }

    let childEl = materialEl;
    let parentEl = document.createElement('picture');

    if (typeof elementData.cssClass === 'object' && typeof elementData.cssClass.length === 'number') {
        for (let i = 0; i < elementData.cssClass.length; i++) {
            parentEl.classList.add(elementData.cssClass[i]);
        }
    }

    let fileSrc = elementData.attrs.src;
    fileSrc = fileSrc.substr(0, fileSrc.lastIndexOf(".")) + ".webp";
    let attrChildData = innityAppsImagePreviewCacheBuster(fileSrc, 'src');

    let sourceEl = document.createElement('source');
    sourceEl.setAttribute('srcset', attrChildData);
    sourceEl.setAttribute('type', 'image/webp');

    parentEl.appendChild(sourceEl);
    parentEl.appendChild(childEl);

    return parentEl;
}

function innityAppsImagePreviewCacheBuster(attrData, attrName) {
    let attrChildData = attrData;

    if (typeof(innityAppsIsPreview) === "undefined") {
        return attrChildData;
    }

    if (attrName === 'src' || attrName === 'data-src') {
        attrChildData += '?t=' + new Date().getTime();
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
function innityAppsMaterialGenerator(elementData, container, waitForImageLoad = false) {
    innityAppsGifToMp4(elementData);

    let elementType = (typeof elementData.elType === 'undefined') ? 'div' : elementData.elType;
    let materialEl = document.createElement(elementType);
    let parentEl = innityAppsGetWebpParentEl(elementData, materialEl);

    innityAppsWaitForImageHandler(waitForImageLoad, materialEl, elementType);

    if (elementType === 'svg' || elementType === 'path') {
        materialEl = document.createElementNS('http://www.w3.org/2000/svg', elementType);
    }

    if (typeof elementData.id !== 'undefined') {
        materialEl.setAttribute('id', elementData.id);
    }

    if (typeof elementData.cssClass === 'object' && typeof elementData.cssClass.length === 'number') {
        for (let i = 0; i < elementData.cssClass.length; i++) {
            materialEl.classList.add(elementData.cssClass[i]);
        }
    }

    if (typeof elementData.innerHTML !== 'undefined') {
        materialEl.innerHTML = elementData.innerHTML;
    }

    if (typeof elementData.impressionTag !== 'undefined' && typeof elementData.impressionTag === 'object') {
        if (typeof innityAppsAddImpressionTag !== 'function') {
            console.error('impressionTag exist but innityAppsAddImpressionTag function doesnt exist');
            return;
        }

        innityAppsAddImpressionTag(elementData.impressionTag);
    }

    if (typeof elementData.clickFunc === 'function') {
        materialEl.addEventListener('click', function(e) {
            e.stopPropagation();
            elementData.clickFunc(materialEl);
        }, false);
    }

    if (typeof elementData.clickTag !== 'undefined') {
        materialEl.addEventListener('click', function(e) {
            e.stopPropagation();
            innityAppsTriggerClickTag(elementData.clickTag);
        }, false);
    }

    if (typeof elementData.cssStyle !== 'undefined' && typeof elementData.cssStyle === 'object') {
        for (let cssKey in elementData.cssStyle) {
            materialEl.style[cssKey] = elementData.cssStyle[cssKey];
        }
    }

    if (typeof elementData.androidAR !== 'undefined' && typeof elementData.androidAR === 'string') {
        let currentUrl = window.location.href;
        let curArFilePath = currentUrl.substr(0, currentUrl.lastIndexOf('/') + 1) + elementData.androidAR;
        let curArPath = `intent://arvr.google.com/scene-viewer/1.0?file=${curArFilePath}&mode=ar_only#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;S.browser_fallback_url=https://developers.google.com/ar;end;`;
        materialEl.setAttribute('rel', 'ar');
        materialEl.setAttribute('href', curArPath);
    }

    if (typeof elementData.iosAR !== 'undefined' && typeof elementData.iosAR === 'string') {
        materialEl.setAttribute('rel', 'ar');
        materialEl.setAttribute('href', elementData.iosAR);
    }

    if (typeof elementData.attrs !== 'undefined' && typeof elementData.attrs === 'object') {
        for (let attrName in elementData.attrs) {
            if (elementType === 'svg' || elementType === 'path') {
                materialEl.setAttributeNS(null, attrName, elementData.attrs[attrName]);
            }
            else {
                let attrChildData = innityAppsImagePreviewCacheBuster(elementData.attrs[attrName], attrName);
                materialEl.setAttribute(attrName, attrChildData);
            }
        }
    }

    if (typeof elementData.childs !== 'undefined' && typeof elementData.childs === 'object') {
        for (let i = 0; i < elementData.childs.length; i++) {
            innityAppsMaterialGenerator(elementData.childs[i], materialEl, waitForImageLoad);
        }
    }

    if (parentEl !== null) {
        materialEl = parentEl;
    }

    container.appendChild(materialEl);
}

function innityAppsPlayGifVideo() {
    let gifVideos = document.getElementsByClassName('innity-apps-animated-gif-video');
    [...gifVideos].forEach(gifVid => {
        gifVid.muted = true;
        gifVid.play().catch((e) => {});;
    });
}

function innityAppsWaitForImageHandler(waitForImageLoad, element, elementType) {
    if (waitForImageLoad === false) {
        return;
    }

    if (elementType.toLowerCase() !== 'img') {
        return;
    }

    innityAppsTotalImage++;

    element.addEventListener('load', imageLoaded_);
    element.addEventListener('error', imageError_);

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
    if (typeof bannerAnimationStart === 'function') {
        setTimeout(bannerAnimationStart, 100);
    }

    if (typeof innityAppsBannerLoaded === 'function') {
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
let innityAppsVersion = '4.6.38';
let innityAppsIsTriggerClickTagEnable = true;

window.addEventListener('load', innityAppsInitStandardCreative, false);

function innityAppsBindEvents() {
    window.addEventListener('message', innityAppsMessageHandler, false);
}

function innityAppsInitStandardCreative() {
    innityAppsPlatform = new InnityAppsMobilePlatform();
    innityAppsBindEvents();
    innityAppsSetupCreative();
    innityAppsPostReadyToProxy();
    innityAppsSetIOSWorkaround();
}

function innityAppsIosAppendText() {
    innityAppsIosWorkAroundEl.innerHTML += '.';
    innityAppsIosWorkAroundCounter++;

    if (innityAppsIosWorkAroundCounter >= 100) {
        innityAppsIosWorkAroundCounter = 0;
        innityAppsIosWorkAroundEl.innerHTML = '';
    }
}

function innityAppsMessageHandler(event) {
    let supportedMsg = event.data;
    if (typeof supportedMsg.owner === 'undefined' || supportedMsg.owner !== 'Innity' || typeof supportedMsg.adType === 'undefined') {
        return;
    }

    if (supportedMsg.version != innityAppsVersion) {
        if (innityAppsIsVersionDifferentWarned === false) {
            console.warn('Proxy and ad version is different! Proxy v' + supportedMsg.version + ' vs Ad v' + innityAppsVersion);
            innityAppsIsVersionDifferentWarned = true;
        }
    }

    switch (supportedMsg.action) {
        case 'shown':
            if (innityAppsIsAdShown === null || innityAppsIsAdShown === false) {
                innityAppsIsAdShown = true;
                innityAppsCountry = supportedMsg.data.country;
                if (typeof bannerShownAtPhoneScreen === 'function') {
                    bannerShownAtPhoneScreen();
                }
            }
            break;
        case 'hide':
            if (innityAppsIsAdShown === null || innityAppsIsAdShown === true) {
                innityAppsIsAdShown = false;
                if (typeof bannerHideFromPhoneScreen === 'function') {
                    bannerHideFromPhoneScreen();
                }
            }
            break;
    }

    switch (supportedMsg.data.eventType) {
        case 'deviceorientation':
            if (typeof cardsDeviceOrientation === 'function') {
                cardsDeviceOrientation(supportedMsg.data);
            }
            break;
        case 'orientationchange':
            if (typeof cardsOrientationChange === 'function') {
                cardsOrientationChange(supportedMsg.data);
            }
            break;
        default:
            break;
    }
}

function innityAppsPauseAllVideo() {
    let allVid = document.getElementsByTagName('video');
    for (let i = 0; i < allVid.length; i++) {
        allVid[i].pause();
    }

    if (typeof innityAppsPlayGifVideo === 'function') {
        innityAppsPlayGifVideo();
    }
}

function innityAppsPostReadyToProxy() {
    parent.postMessage({owner: 'Innity', adType: 'innity-apps-mobile-overlay-cube', action: 'adReady', data: {orientation: innityAppsIsOrientationEnable}, containerHeight: 250, version: innityAppsVersion}, '*');
}

function innityAppsPostTotalCardsToProxy(total) {
    parent.postMessage({owner: 'Innity', adType: 'innity-apps-mobile-overlay-cube', action: 'totalCards', data: {totalCards: total}, containerHeight: 250, version: innityAppsVersion}, '*');
}

/**
 * This is a workaround to enable iOS Safari touch events after user scroll the page.
 */
function innityAppsSetIOSWorkaround() {
    if (innityAppsPlatform.getOS() === 'ios') {
        innityAppsIosWorkAroundEl = document.getElementById('innity-apps-ios-workaround');
        setInterval(innityAppsIosAppendText, 500);
    }
}

function innityAppsSetupCreative() {
    if (innityAppsIsBannerLoad === true) {
        return;
    }

    innityAppsGenerateMainContent(document.getElementById("innity-apps-banner-content"));
    innityAppsIsBannerLoad = true;
}

function registerClickTagEvent(){
    let cardImgEls = document.getElementsByClassName('card-image');
    for(let i = 0; i < cardImgEls.length; i++) {
        let curCardImgEl = cardImgEls[i];

        curCardImgEl.addEventListener('click', function(e){
            e.stopPropagation();

            if (innityAppsIsTriggerClickTagEnable === false) {
                return false;
            }

            innityAppsTriggerClickTag(this.getAttribute('data-clicktag'));
        });
    }
};
function InnityAppsMrecCards(elID, opts) {
    this.hideCards = hideCards;
    this.showCards = showCards;
    this.swipeToNext = swipeToNext;

    const CARD_SEQUENCE_CSS_CLASS = 'innity-apps-card-';
    const CARD_TRANSITION_CSS_CLASS = 'innity-apps-card-transition';
    const FOLLOW_FINGER_CSS_CLASS = 'innity-apps-cards-follow-finger';
    const INIT_HIDING_CSS_CLASS = 'innity-apps-hide-card';
    const ANIMATED_TO_LEFT_CSS_CLASS = 'innity-apps-moving-to-left';
    const ANIMATED_TO_RIGHT_CSS_CLASS = 'innity-apps-moving-to-right';

    const OVERFLOW_CARD_CSS_CLASS = 'innity-apps-hidding-cards';

    let extraOptions = mergeObject_({
        callbackWhenCardSwipe: null,
        callbackAfterCardAppear: null
    }, opts, 'extraOptions');

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
        parentCardWrapper = (document.getElementById('innity-apps-ad') !== null) ? document.getElementById('innity-apps-ad') : document.getElementById(elID).parentNode;

        if (innityAppsPlatform.getOS() === 'ios' || innityAppsPlatform.getOS() === 'android') {
            mobileSupport_ = true;
        }

        setCardElIntoArrAndBindCardEvents_();
        bindEventListeners_();
        onResize_();

        innityAppsPostTotalCardsToProxy(cardIndexForDisplay + 1);

        if (mobileSupport_ === true) {
            cardEdu = new CardsSwipeEduMessage_();
        }
        else {
            new CardsNavigatorEduMessage_({'toLeftCallback': cardDesktopNext_, 'toRightCallback': cardDesktopPrev_});
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
        window.addEventListener('resize', onResize_, false);
    }

    function bindCardEventListeners_(curCardEl) {
        curCardEl.addEventListener('touchstart', onTouchStart_, false);
        curCardEl.addEventListener('touchmove', onTouchMove_, false);
        curCardEl.addEventListener('touchend', onTouchEnd_, false);

        curCardEl.addEventListener('mousedown', onMouseStart_, false);
        curCardEl.addEventListener('mousemove', onMouseMove_, false);
        curCardEl.addEventListener('mouseup', onMouseRelease_, false);
        curCardEl.addEventListener('mouseout', onMouseRelease_, false);
    }

    function cardAppearEvent_() {
        defaultTracker.trackTimer(cardEls[curCardIndex].getAttribute('data-track'));

        if (typeof (extraOptions.callbackWhenCardSwipe) === 'function') {
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
        _last--; if (_last < 0) { _last = cardEls.length - 1; }
        curActiveCardEl = cardEls[_last];
        cardStillAnimate = true;
        runBackwardCardAnimation_(ANIMATED_TO_LEFT_CSS_CLASS);
    }

    function cardFirstShowAllEvent_() {
        if (typeof (extraOptions.callbackAfterCardAppear) === 'function') {
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
                defaultTracker.trackTimer(cardEls[curCardIndex].getAttribute('data-track') + '_default');
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
            }
            else {
                console.warn('[Version ' + version + '] Key [' + attributeKey + '] not found in object merging process.', reference);
            }
        }

        return defaultObj;
    }

    function onMouseMove_(e, curXPost = e.clientX) {
        e.preventDefault();

        if (isTouch === false) {
            return;
        }

        updatedLeft = (window.innerWidth * cardLeftPosition) + curXPost - initX;

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
        }
        else if (xMovement > containerEl.offsetWidth * 0.25) {
            cardStillAnimate = true;
            runCardAnimation_(ANIMATED_TO_RIGHT_CSS_CLASS);
            defaultTracker.trackToRight();

            removeCardEdu();
        }
        else {
            curActiveCardEl.style.left = '';
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
        updatedLeft = (window.innerWidth * cardLeftPosition);
        curActiveCardEl = cardEls[curCardIndex];

        slideFingerWithAnimationFrame_();
    }

    function onResize_() {
        let newLeft = ((parentCardWrapper.clientWidth - containerEl.clientWidth) / 2) / parentCardWrapper.clientWidth * 100;
        if (newLeft < 0) {
            newLeft = 0;
        }
        containerEl.style.left = newLeft + '%';

        let newTop = ((parentCardWrapper.clientHeight - containerEl.clientHeight) / 2) / parentCardWrapper.clientHeight * 100;
        if (newTop < 0) {
            newTop = 0;
        }
        containerEl.style.top = newTop + '%';
    }

    function onTouchEnd_(e) {
        onMouseRelease_(e.changedTouches[0])
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
            curActiveCardEl.style.left = '';
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
        if (curActiveCardEl.classList.contains('innity-apps-last-card') === true) {
            return;
        }
        curActiveCardEl.classList.add(cssClass);

        setTimeout(function () {
            curActiveCardEl.style.left = '';
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
        let cards = document.getElementsByClassName('innity-apps-cards');
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

        curActiveCardEl.style.left = updatedLeft + 'px';
        window.requestAnimFrame(slideFingerWithAnimationFrame_);
    }

    function swapBackwardCardPosition_() {
        for (let i = cardEls.length - 1; i >= 0; i--) {
            let curEl = cardEls[i];

            for (let j = cardCssClasses.length; j >= 0; j--) {
                if (curEl.classList.contains(cardCssClasses[cardCssClasses.length - 1])) {
                    curEl.classList.remove(cardCssClasses[cardCssClasses.length - 1]);
                    curEl.classList.remove(OVERFLOW_CARD_CSS_CLASS);
                    curEl.classList.add(cardCssClasses[0]);
                    break;
                }
                else if (curEl.classList.contains(cardCssClasses[j])) {
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
                }
                else if (curEl.classList.contains(cardCssClasses[j])) {
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
        const CSSCLASS_NAV_EDU_ = 'innity-app-desktop-navigation-edu';
        const CSSCLASS_NAV_CLICKED = 'innity-apps-navigation-clicked';
        const CSSCLASS_NAV_FOCUS = 'innity-apps-navigation-focus';
        const CSSCLASS_NAV_NOFOCUS = 'innity-apps-navigation-nofocus';
        const HTML_NAV_ARROW = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path class="innity-apps-edu-arrow" d="M8.12,3.39,4.61,6.9h0a1.55,1.55,0,0,0,0,2.2h0l3.51,3.51a1.56,1.56,0,0,0,2.19,0h0a1.55,1.55,0,0,0,0-2.2L7.9,8l2.41-2.41a1.55,1.55,0,0,0,0-2.2h0A1.56,1.56,0,0,0,8.12,3.39Z"/></svg>';

        let leftCallback_ = _opts.toLeftCallback;
        let isIninitially_ = true;
        let navEl_ = null;
        let nextBtnEl_ = null;
        let prevBtnEl_ = null;
        let rightCallback_ = _opts.toRightCallback;
        let userHovered_ = false;

        initClass_();

        function initClass_() {
            navEl_ = document.getElementById('desktop-navigation');
            navEl_.classList.add(CSSCLASS_NAV_EDU_);

            for (let i = 0; i < renderClass_().length; i++) {
                innityAppsMaterialGenerator(renderClass_()[i], navEl_);
            }

            setTimeout(() => {
                nextBtnEl_ = document.getElementById('innityAppsBtnRevLitenNext');
                prevBtnEl_ = document.getElementById('innityAppsBtnRevLitePrev');
                bindBtnListeners_(
                    nextBtnEl_,
                    onClicked_.bind({
                        'fn': leftCallback_,
                        'trackingName': 'btn_next'
                    })
                );
                bindBtnListeners_(
                    prevBtnEl_,
                    onClicked_.bind({
                        'fn': rightCallback_,
                        'trackingName': 'btn_prev'
                    })
                );
            }, 100);
        }

        // Public function section =============================================

        // Private function section ============================================

        function bindBtnListeners_(curBtnEl, onClickFunc) {
            curBtnEl.addEventListener('mousedown', onDownEffect_, false);
            curBtnEl.addEventListener('mouseover', onOverToggleEffect_, false);
            curBtnEl.addEventListener('mouseout', onOverToggleEffect_, false);
            curBtnEl.addEventListener('mouseup', onUpEffect_, false);
            curBtnEl.addEventListener('click', onClickFunc, false);
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
            }
            else {
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
                { id: 'innityAppsBtnRevLitePrev', cssClass: ['innity-apps-desktop-navigation-btn', 'innity-apps-desktop-prev-btn'], innerHTML: HTML_NAV_ARROW },
                { id: 'innityAppsBtnRevLitenNext', cssClass: ['innity-apps-desktop-navigation-btn', 'innity-apps-desktop-next-btn'], innerHTML: HTML_NAV_ARROW }
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
            eduContainer_ = document.getElementById('educator');
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
            eduCard_ = document.getElementsByClassName(CARD_SEQUENCE_CSS_CLASS + 1)[0];
            document.addEventListener("visibilitychange", function () {
                if (document.visibilityState == "hidden") {
                    toggleSlightSwipe_(false);
                } else {
                    if (showEducationMessage_ === true) {
                        addEduMessage();
                    }
                }
            });
            window.addEventListener('blur', function () {
                toggleSlightSwipe_(false);
            }, false);
            document.addEventListener('blur', function () {
                toggleSlightSwipe_(false);
            }, false);
        }

        function cardSlightSwipe_() {
            if (startX > containerEl.offsetWidth * 0.32) {
                window.cancelAnimFrame(reqEduAnim_);
                eduCard_.style.left = '';
                startX = 0;
                updatedLeft = 0;
                eduCard_.classList.remove(FOLLOW_FINGER_CSS_CLASS);
                eduCard_.classList.add(CARD_TRANSITION_CSS_CLASS);
            }
            else {
                eduCard_.classList.add(FOLLOW_FINGER_CSS_CLASS);
                eduCard_.classList.remove(CARD_TRANSITION_CSS_CLASS);

                startX += slightSlideSpeed_;
                updatedLeft = (window.innerWidth * cardLeftPosition) - startX;
                eduCard_.style.left = updatedLeft + 'px';
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
            }
            else {
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
        innityAppsTriggerTrack('btn_card_left');
    };
    function trackToRight() {
        innityAppsTriggerTrack('btn_card_right');
    };
    function trackTimer(id) {
        innityAppsTriggerTimerStart(id);
    };
}

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

window.cancelAnimFrame = window.cancelAnimationFrame
    || window.mozCancelAnimationFrame
    || function (requestID) { clearTimeout(requestID) } //fall back