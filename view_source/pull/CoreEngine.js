var mobileEngage;
var platform;
var version = '4.5.3.2';
var isVersionDifferentWarned = false;
var invitationHeight = 0;
var isBannerExpanded = false;
var iosWorkAroundEl = null,
    iosWorkAroundCounter = 0;
/**
 * Only set to TRUE if required orientation.
 * @type Boolean
 */
var isOrientationEnable = false;

window.addEventListener('load', initPullUpCreative, false);

function initPullUpCreative() {
    platform = new MobilePlatform();
    mobileEngage = new mePullUp({
        //    hideBestView: true,
    });
    bindEvents();
    setupCreative();
    postReadyToProxy();
    setIOSWorkaround();
};

function messageHandler(event) {
    var supportedMsg = event.data;
    if (typeof(supportedMsg.owner) === 'undefined' || supportedMsg.owner !== 'AiActiv' || typeof(supportedMsg.adType) === 'undefined') {
        return;
    }

    if (supportedMsg.version != version) {
        if (isVersionDifferentWarned === false) {
            console.warn('Proxy and ad version is different! Proxy v' + supportedMsg.version + ' vs Ad v' + version);
            isVersionDifferentWarned = true;
        }
    }

    switch (supportedMsg.action.action) {
        case 'shown':
            mobileEngage.expanded();
            if (isBannerExpanded === false) {
                isBannerExpanded = true;
                if (typeof(firstBannerExpand) === 'function') {
                    firstBannerExpand(supportedMsg.action.extraHeight);
                }
            }
            insertBannerExpandInvitationClass(true);
            if (typeof(puBannerExpand) === 'function') {
                puBannerExpand(supportedMsg.action.extraHeight);
            }
            AiActivHTMLAd.track('user_expand');
            break;
        case 'hide':
            mobileEngage.shrinked();
            if (typeof(trackingReset) === 'function') {
                trackingReset();
            }
            insertBannerExpandInvitationClass(false);
            if (typeof(puBannerShrink) === 'function') {
                puBannerShrink();
            }
            AiActivHTMLAd.track('expand_close');
            break;
        case 'resize':
            if (platform.getOS() === 'ios') {
                setTimeout(function() {
                    mobileEngage.customResize(supportedMsg.action.windowHeight);
                }, 300);
            } else {
                mobileEngage.customResize(supportedMsg.action.windowHeight);
            }
            break;
        default:
            break;
    }

    switch (supportedMsg.action.eventType) {
        case 'deviceorientation':
            if (typeof(puDeviceOrientation) === 'function') {
                puDeviceOrientation(supportedMsg.action);
            }
            break;
        case 'orientationchange':
            if (typeof(puOrientationChange) === 'function') {
                puOrientationChange(supportedMsg.action);
            }
            break;
        default:
            break;
    }
};

function postReadyToProxy() {
    parent.postMessage({
        owner: 'AiActiv',
        adType: 'aiactiv-apps-mobile-pull-up',
        action: 'adReady',
        data: {
            height: invitationHeight,
            orientation: isOrientationEnable
        },
        version: version
    }, '*');
};

function bindEvents() {
    window.addEventListener('message', messageHandler, false);

    customClickHandler();
};

function customClickHandler() {
    document.getElementById('apps-ad').addEventListener('click', function(e) {
        e.stopPropagation();
    }, false);

    document.getElementById('apps-ad').addEventListener('mouseup', function(e) {
        e.stopPropagation();
    }, false);

    document.getElementById('apps-ad').addEventListener('touchend', function(e) {
        e.stopPropagation();
    }, false);

    document.getElementById('apps-ad').addEventListener('touchmove', function(e) {
        e.stopPropagation();
        //e.preventDefault();
    }, false);
};

var isBannerLoad = false;

function setupCreative() {
    if (isBannerLoad === true) {
        return;
    }

    mainContent(mobileEngage.getBannerContentEl());
    isBannerLoad = true;
};

function pauseAllVideo() {
    var allVid = document.getElementsByTagName('video');
    for (var i = 0; i < allVid.length; i++) {
        allVid[i].pause();
    }
};

function insertBannerExpandInvitationClass(hide) {
    var _invEl = document.getElementById('ad-invitation');
    if (hide) {
        _invEl.classList.add("fully-exp-invitation");
    } else {
        _invEl.classList.remove("fully-exp-invitation");
    }
}

/**
 * This is a workaround to enable iOS Safari touch events after user scroll the page.
 */
function setIOSWorkaround() {
    if (platform.getOS() === 'ios') {
        iosWorkAroundEl = document.getElementById('ios-workaround');
        setInterval(iosAppendText, 500);
    }
}

function iosAppendText() {
    iosWorkAroundEl.innerHTML += '.';
    iosWorkAroundCounter++;

    if (iosWorkAroundCounter >= 100) {
        iosWorkAroundCounter = 0;
        iosWorkAroundEl.innerHTML = '';
    }
}

// ========== Element Generator ==========

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
 */
function generateMaterial(elementData, container) {
    var elementType = (typeof(elementData.elType) === 'undefined') ? 'div' : elementData.elType;
    var materialEl = document.createElement(elementType);

    if (elementType === 'svg' || elementType === 'path') {
        materialEl = document.createElementNS('http://www.w3.org/2000/svg', elementType);
    }
    if (typeof(elementData.id) !== 'undefined') {
        materialEl.setAttribute('id', elementData.id);
    }
    if (typeof(elementData.cssClass) === 'object' && typeof(elementData.cssClass.length) === 'number') {
        for (var i = 0; i < elementData.cssClass.length; i++) {
            materialEl.classList.add(elementData.cssClass[i]);
        }
    }
    if (typeof(elementData.innerHTML) !== 'undefined') {
        materialEl.innerHTML = elementData.innerHTML;
    }
    if (typeof(elementData.clickFunc) === 'function') {
        materialEl.addEventListener('click', function(e) {
            e.stopPropagation();
            elementData.clickFunc(materialEl);
        }, false);
    }
    if (typeof(elementData.clickTag) !== 'undefined') {
        materialEl.addEventListener('click', function(e) {
            e.stopPropagation();
            triggerClickTag(elementData.clickTag);
        }, false);
    }
    if (typeof(elementData.cssStyle) !== 'undefined' && typeof(elementData.cssStyle) === 'object') {
        for (var cssKey in elementData.cssStyle) {
            materialEl.style[cssKey] = elementData.cssStyle[cssKey];
        }
    }
    if (typeof(elementData.attrs) !== 'undefined' && typeof(elementData.attrs) === 'object') {
        if (elementType === 'svg' || elementType === 'path' || elementType === 'circle') {
            materialEl.setAttributeNS(null, attrName, elementData.attrs[attrName]);
        }
        for (var attrName in elementData.attrs) {
            materialEl.setAttribute(attrName, elementData.attrs[attrName]);
        }
    }
    if (typeof(elementData.childs) !== 'undefined' && typeof(elementData.childs) === 'object') {
        for (var i = 0; i < elementData.childs.length; i++) {
            generateMaterial(elementData.childs[i], materialEl);
        }
    }
    container.appendChild(materialEl);
};

function mainContent(container) {
    for (var i = 0; i < materials.length; i++) {
        generateMaterial(materials[i], container);
    }

    if (typeof(puBannerReady) === 'function') {
        setTimeout(puBannerReady, 100);
    }
};