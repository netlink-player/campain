var aiactivAppsCards = null;
var timeoutFirstCard, timeoutHideEdu;
let appsShop;

function bannerAnimationStart() {
    cardInit();
    //embedAutoplayVideo();

    // appsShop = new shoppableAd({
    //     jsonUrls: 'sample.json',
    //     template: shoppingItemTemplate,
    //     wrappers: [
    //         document.querySelector('#card-a .gallery_ui'),
    //         document.querySelector('#card-b .gallery_ui'),
    //         document.querySelector('#card-c .gallery_ui'),
    //         document.querySelector('#card-d .gallery_ui')
    //     ]
    //     //readyCallback: aiactivAppsPostReadyToProxy
    // });
};

function bannerShownAtPhoneScreen() {
    // Callback when ad is shown at phone screen.
    // console.log('%cAd is showing!', 'color:white;background:green');
    cardInit();
    aiactivAppsCards.showCards();
};

function bannerHideFromPhoneScreen() {
    // Callback when ad is hidden from phone screen.
    // console.log('%cAd is hidden!', 'color:black;background:red');
    cardInit();
    aiactivAppsCards.hideCards();
};

function cardInit() {
    if (aiactivAppsCards === null) {
        aiactivAppsCards = new AiActivAppsCards('card-container', {
            callbackWhenCardAppear: whenUserSwipeCard
        });
    }
    clearTimeout(timeoutFirstCard);
    clearTimeout(timeoutHideEdu);
    timeoutFirstCard = setTimeout(startFirstCard, 1500);
    //timeoutHideEdu = setTimeout(hideEducation, 8000);
};

function startFirstCard() {
    document.getElementById('educator').classList.add('need-educate');
    document.getElementById('card-a').classList.add('card-front');
    initCardAnimationTimeline();
};

function hideEducation() {
    document.getElementById('educator').classList.remove('need-educate');
};

function whenUserSwipeCard(el) {
    clearTimeout(timeoutFirstCard);
    clearTimeout(timeoutHideEdu);
    hideEducation();

    // Add 'card-front' class for active cards.
    var allCards = document.getElementsByClassName('aiactiv-apps-cards');
    for (var i = 0; i < allCards.length; i++) {
        allCards[i].classList.remove('card-front');
    }
    el.classList.add('card-front');

    switch (el.id) {
        case 'card-a':
            break;
    }

    appsShop.swipeNext();
    aiactivAppsCards.politeLoad();

    // Tracked impression.
    //Impressions.calls(el.getAttribute('data-track'));
};

function initCardAnimationTimeline() {
    // Tracked impression.
    //Impressions.calls('card_a');

    // Start first animation for GSAP / AnimeJS.
};

/**
 * Device orientation event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.alpha <br />
 * e.beta <br />
 * e.gamma
 * @param {object} e
 */
function cardsDeviceOrientation(e) {
    console.log(e.alpha, e.beta, e.gamma);
};
/**
 * Orientation change event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.eventType
 * @param {object} e
 */
function cardsOrientationChange(e) {
    console.log(e.eventType);
};

// ========== AiActiv Impression Track ==========

var rtArray = [];
var Impressions = {
    "calls": function(a) {
        //Only Retargetting Tag need to check fire only once.
        if (rtArray.indexOf(a) != -1) return;
        rtArray.push(a);
        var rand = Date.now(),
            impsUrl = "";
        switch (a) {
            case "card_a":
                impsUrl = "";
                break;
            case "card_b":
                impsUrl = "";
                break;
            case "card_c":
                impsUrl = "";
                break;
            case "card_d":
                impsUrl = "";
                break;
            case "card_e":
                impsUrl = "";
                break;
        }
        impsUrl = impsUrl.replace('[timestamp]', rand);
        (new Image()).src = impsUrl;
        console.log("**impression sent:" + a);
    }
};

// ========== Video template required code ==========

var forceFallbackRequest = {
    country: ''
};
//var forceFallbackRequest = {country:'TW'}; //*** Uncomment this if its from Taiwan request.

var videoPlayer = null,
    fallbackPlayer = null;
var visibilityHidden = 'hidden',
    disableVisibilityPlay = false;

function embedAutoplayVideo() {
    videoPlayer = new AiActivAppsMobileAutoPlayVideo(
        'video-wrapper',
        'video1', {
            webm: 'video1.webm',
            mp4: 'video1.mp4',
            mpg: 'video1.mpg',
            poster: 'video1.jpg',
            autoplay: false,
            loop: false,
            //forceFallback: false,
            forceFallback: (function() {
                return (forceFallbackRequest['country'].toLowerCase() === 'tw' && platform.getOS() === 'android') ? true : false;
            })(),
            // For fallback player.
            fullscreen: true,
            canvaswidth: '320',
            canvasheight: '180',
            midctatext: 'Learn More',
            playstatectatext: 'Learn More',
            cpm: false,
            urls: 'clickTAG'
        },
        'video1.jpg' // this is fallback video poster.
    );

    fallbackPlayer = videoPlayer.getFallbackPlayer();
    if (fallbackPlayer !== null) {
        runFallbackVideo();
    }

    visibilityBinding();
};

function runFallbackVideo() {
    //    fallbackPlayer.noLoop(); // Preview will not loop after ended.
    //    fallbackPlayer.noAutoplay(); // Preview will not autoplay.
    //    fallbackPlayer.remainPreviewAfterClick(); // Preview will remain there after clicked.
    //    fallbackPlayer.setClickCallback(whenFallbackAutoplayIsClicked);
    //    fallbackPlayer.addListener('load', fallbackVideoOnLoad);
    //    fallbackPlayer.addListener('play', fallbackVideoPlayed);
    //    fallbackPlayer.addListener('ended', whenPreviewEnded);
    //    fallbackPlayer.setVideoEndedCallback(whenHTMLVideoPlayedEnded);
    //    fallbackPlayer.fullscreenCallBack(checkVideoFullScreenStatus);
    fallbackPlayer.startEngine(); // This is always required!!!!!
};

function playVideo() {
    if (videoPlayer === null) {
        return;
    }

    if (fallbackPlayer !== null) {
        fallbackPlayer.playPreview();
        return;
    }

    videoPlayer.playVideo();
};

function pauseVideo() {
    if (videoPlayer === null) {
        return;
    }

    if (fallbackPlayer !== null) {
        fallbackPlayer.pausePreview();
        return;
    }

    videoPlayer.pauseVideo();
};

function toggleVideoPlayPause(_autoplay, _fallback, bool) {
    if (_autoplay === null) {
        return;
    }
    var f = bool ? _autoplay.playVideo : _autoplay.pauseVideo;
    if (_fallback !== null) {
        f = bool ? _fallback.playPreview : _fallback.pausePreview;
    }
    f();
};

function visibilityBinding() {
    var visibilityChangeEvent = 'visibilitychange';
    if (typeof(document.msHidden) !== 'undefined') {
        visibilityHidden = 'msHidden';
        visibilityChangeEvent = 'msvisibilitychange';
    } else if (typeof(document.webkitHidden) !== 'undefined') {
        visibilityHidden = 'webkitHidden';
        visibilityChangeEvent = 'webkitvisibilitychange';
    }

    document.addEventListener(visibilityChangeEvent, visibilityChange, false);
};

function visibilityChange() {
    if (fallbackPlayer !== null) {
        return;
    }

    if (document[visibilityHidden] === true) {
        // When browser is hidden or in background.
        videoPlayer.pauseVideo();
    } else {
        // When browser is active or focus.
        if (disableVisibilityPlay === false) {
            videoPlayer.playVideo();
        }
    }
};
// ========== Video template required code ==========