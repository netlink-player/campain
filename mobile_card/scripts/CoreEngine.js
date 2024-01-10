var mobileEngage;
var platform;
var version = '6.0.0';
var isVersionDifferentWarned = false;
var iosWorkAroundEl = null,
    iosWorkAroundCounter = 0;
var isAdShown = null;
var alternatives;
/**
 * Only set to TRUE if required orientation.
 * @type Boolean
 */
var isOrientationEnable = false;

window.addEventListener('load', initStandardCreative, false);

function initStandardCreative() {
    // console.log('--initStandardCreative!');
    platform = new MobilePlatform();
    mobileEngage = new meStandard();
    bindEvents();
    // setupCreative();
    postReadyToProxy();
    setIOSWorkaround();
};

function messageHandler(event) {
    var supportedMsg = event.data;
    if (typeof (supportedMsg.owner) === 'undefined' || supportedMsg.owner !== 'AiActiv' || typeof (supportedMsg.adType) === 'undefined') {
        return;
    }

    if (supportedMsg.version != version) {
        if (isVersionDifferentWarned === false) {
            console.warn('Proxy and ad version is different! Proxy v' + supportedMsg.version + ' vs Ad v' + version);
            isVersionDifferentWarned = true;
        }
    }

    switch (supportedMsg.action) {
        case 'shown':
            if (isAdShown === null || isAdShown === false) {
                isAdShown = true;
                if (typeof (bannerShownAtPhoneScreen) === 'function') {
                    bannerShownAtPhoneScreen();
                }
            }
            break;
        case 'hide':
            if (isAdShown === null || isAdShown === true) {
                isAdShown = false;
                if (typeof (bannerHideFromPhoneScreen) === 'function') {
                    bannerHideFromPhoneScreen();
                }
            }
            break;
        case 'initBanners':
            const { alternative, banner_click_url, clickTrackers } = supportedMsg?.data || {};
            alternatives = alternative;

            setupCreative();

            var cts = document.getElementsByClassName('toClickTag');
            for (var i = 0; i < cts.length; i++) {
                cts[i].addEventListener(
                    'click',
                    function () {
                        onInteractiveBannerClick(banner_click_url, clickTrackers);
                    },
                    false
                );
            }
            break;
    }

    switch (supportedMsg.data.eventType) {
        case 'deviceorientation':
            if (typeof (cardsDeviceOrientation) === 'function') {
                cardsDeviceOrientation(supportedMsg.data);
            }
            break;
        case 'orientationchange':
            if (typeof (cardsOrientationChange) === 'function') {
                cardsOrientationChange(supportedMsg.data);
            }
            break;
        default:
            break;
    }
};

function postReadyToProxy() {
    parent.postMessage({
        owner: 'AiActiv',
        adType: 'aiactiv-apps-mobile-overlay-cube',
        action: 'adReady',
        data: {
            orientation: isOrientationEnable
        },
        containerHeight: 300,
        version: version
    }, '*');
};

function bindEvents() {
    window.addEventListener('message', messageHandler, false);
};

var isBannerLoad = false;

function setupCreative() {
    if (isBannerLoad === true) {
        return;
    }
    // to do
    // debugger;
    mainContent(mobileEngage.getBannerContentEl());
    isBannerLoad = true;
};

function pauseAllVideo() {
    var allVid = document.getElementsByTagName('video');
    for (var i = 0; i < allVid.length; i++) {
        allVid[i].pause();
    }
};

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
    var elementType = (typeof (elementData.elType) === 'undefined') ? 'div' : elementData.elType;
    var materialEl = document.createElement(elementType);
    if (elementType === 'svg' || elementType === 'path') {
        materialEl = document.createElementNS("http://www.w3.org/2000/svg", elementType);
    }

    if (typeof (elementData.id) !== 'undefined') {
        materialEl.setAttribute('id', elementData.id);
    }
    if (typeof (elementData.cssClass) === 'object' && typeof (elementData.cssClass.length) === 'number') {
        for (var i = 0; i < elementData.cssClass.length; i++) {
            materialEl.classList.add(elementData.cssClass[i]);
        }
    }
    if (typeof (elementData.innerHTML) !== 'undefined') {
        materialEl.innerHTML = elementData.innerHTML;
    }
    if (typeof (elementData.clickFunc) === 'function') {
        materialEl.addEventListener('click', function (e) {
            e.stopPropagation();
            if (aiactivAppsCards.mouseClicking() === false) {
                return;
            }
            elementData.clickFunc(elementData);
        }, false);
    }
    if (typeof (elementData.clickTag) !== 'undefined') {
        materialEl.addEventListener('click', function (e) {
            e.stopPropagation();
            if (aiactivAppsCards.mouseClicking() === false) {
                return;
            }
            triggerClickTag(elementData.clickTag);
        }, false);
    }
    if (typeof (elementData.cssStyle) !== 'undefined' && typeof (elementData.cssStyle) === 'object') {
        for (var cssKey in elementData.cssStyle) {
            materialEl.style[cssKey] = elementData.cssStyle[cssKey];
        }
    }
    if (typeof (elementData.attrs) !== 'undefined' && typeof (elementData.attrs) === 'object') {
        for (var attrName in elementData.attrs) {
            if (elementType === 'svg' || elementType === 'path') {
                materialEl.setAttributeNS(null, attrName, elementData.attrs[attrName]);
            } else {
                materialEl.setAttribute(attrName, elementData.attrs[attrName]);
            }
        }
    }
    if (typeof (elementData.childs) !== 'undefined' && typeof (elementData.childs) === 'object') {
        for (var i = 0; i < elementData.childs.length; i++) {
            generateMaterial(elementData.childs[i], materialEl);
        }
    }
    container.appendChild(materialEl);
};

function mainContent(container) {
    // debugger;
    const currentMaterials = mappingDataAlternativeToMaterial();
    for (var i = 0; i < currentMaterials.length; i++) {
        generateMaterial(currentMaterials[i], container);
    }

    if (typeof (bannerAnimationStart) === 'function') {
        setTimeout(bannerAnimationStart, 100);
    }
};

function mappingDataAlternativeToMaterial() {
    var currentMaterials = [{
        id: 'card-container',
        childs: []
    }];
    if (!Array.isArray(alternatives) || alternatives.length <= 0) {
        return currentMaterials;
    }
    for (var i = 0; i < alternatives.length; i++) { // max = 4
        var materialId = '';
        switch (i) {
            case 0:
                materialId = 'card-a';
                break;
            case 1:
                materialId = 'card-b';
                break;
            case 2:
                materialId = 'card-c';
                break;
            case 3:
                materialId = 'card-d';
                break;
            default:
                break;
        }
        if (i === 0) { // first banner
            currentMaterials[0].childs.push({
                id: materialId,
                cssClass: ['aiactiv-apps-cards', 'aiactiv-apps-card-transition', 'aiactiv-apps-card-1', 'toClickTag'],
                childs: [
                    {
                        id: 'educator',
                        childs: [{
                            cssClass: ['edu-hand-cursor'],
                            childs: [{
                                cssClass: ['edu-hand-cursor-image']
                            }]
                        }]
                    },
                    {
                        cssClass: ['gallery_ui', 'rounded-corner'],
                        childs: [
                            //card image must follow ratio of 640x360!
                            {
                                elType: 'img',
                                cssClass: ['card-img'],
                                attrs: {
                                    src: alternatives[i].url || '',
                                }
                            }
                        ]
                    },
                    //This is the skinner layer that will disappear after the 1st swipe, don't change the ID!!!
                    {
                        id: 'aiactiv-apps-cards-skinner'
                    }
                ]
            })
        } else {
            // others
            currentMaterials[0].childs.push({
                id: materialId,
                cssClass: ['aiactiv-apps-cards', 'aiactiv-apps-card-transition', 'aiactiv-apps-card-' + (i + 1), 'toClickTag'],
                childs: [{
                    cssClass: ['gallery_ui', 'rounded-corner'],
                    childs: [
                        //card image must follow ratio of 640x360!
                        {
                            elType: 'img',
                            cssClass: ['card-img'],
                            attrs: {
                                src: alternatives[i].url || ''
                            }
                        }
                    ]
                }]
            })
        }

    }
    // console.log('--mappingDataAlternativeToMaterial : ', currentMaterials)
    return currentMaterials;
}

function onInteractiveBannerClick(clickUrl, clickTrackers) {
  if (clickUrl) {
    window.open(clickUrl, '_blank');
  }

  if (clickTrackers) {
    Promise.all(clickTrackers.split(',').map((e) => fetch(e)));
  }
}