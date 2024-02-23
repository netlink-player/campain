/**
 * Callback when pull up banner materials (excluded resource like image & video) is ready & loaded.
 */
function puBannerReady() {
    Impressions.calls('invitation');
}
/**
 * Call when banner <b>FIRST</b> expanded.
 */
function firstBannerExpand() {
    console.log('first only');
    Impressions.calls('expanded');

    var appsShop = new shoppableAd({
        jsonUrls: 'data.json',
        template: shoppingItemTemplate
        //readyCallback: aiactivAppsPostReadyToProxy
    });



    /** @ Add in Video with Tracking here.**/
    //embedAutoplayVideo();

    document.querySelector('#inv-exp').addEventListener('click', function(e) {
        e.stopPropagation();
        triggerClickTag('clickTAG');
    });
    document.querySelector('#ad-banner').addEventListener('click', function(e) {
        e.stopPropagation();
        triggerClickTag('clickTAG');
    });
}

/**
 * Callback when pull up banner is expanded.
 * @param {number} extraHeight Extra height that cover by screen.
 */
function puBannerExpand(extraHeight) {
    document.getElementById('inv').classList.add('demo-hide');

    disableVisibilityPlay = false;
    playVideo();
}
/**
 * Callback when pull up banner is shrink from expand.
 */
function puBannerShrink() {
    document.getElementById('inv').classList.remove('demo-hide');

    disableVisibilityPlay = true;
    pauseVideo();
}
/**
 * Device orientation event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.alpha <br />
 * e.beta <br />
 * e.gamma
 * @param {object} e
 */
function puDeviceOrientation(e) {
    //    document.getElementById('ad-banner').style.height = Math.abs(Math.round(e.alpha))+'%';
    console.log(e.alpha, e.beta, e.gamma);
}
/**
 * Orientation change event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.eventType
 * @param {object} e
 */
function puOrientationChange(e) {
    console.log(e.eventType);
}

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
            case "invitation":
                // impsUrl = "https://ad.doubleclick.net/ddm/trackimp/N8897.245886AIACTIV.COM/B24391913.277153469;dc_trk_aid=471641019;dc_trk_cid=134851099;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?";
                break;
            case "expanded":
                // impsUrl = "https://ad.doubleclick.net/ddm/trackimp/N8897.245886AIACTIV.COM/B24391913.277153472;dc_trk_aid=471553438;dc_trk_cid=134724120;ord=[timestamp];dc_lat=;dc_rdid=;tag_for_child_directed_treatment=;tfua=?";
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