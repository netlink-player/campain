let isVideoLoaded = false;
let isBannerLoaded = false;

function innityAppsBannerLoaded() {
  if (isBannerLoaded === true) {
    return;
  }

  isBannerLoaded = true;

  let clicktags = document.getElementsByClassName('clicktag');
  for (let i = 0; i < clicktags.length; i++) {
    clicktags[i].addEventListener('click', function() {
      innityAppsTriggerClickTag(this.getAttribute('data-clicktag'));
    });
  }
}

function invitationLandToSlideNumber(number, isAutomation) {
//  console.log('invitation land to ' + number, isAutomation);
}

function expandedLandToSlideNumber(number, isAutomation) {
//  console.log('expanded land to ' + number, isAutomation);

  initVideo();

  innityAppsTriggerTimerStart('frame' + parseInt(number));

  if (number === 1) {
    innityAppsPlayVideo();
    innityAppsPauseVideo2();
    innityAppsPauseVideo3();
  } else if (number === 2) {
    innityAppsPlayVideo2();
    innityAppsPauseVideo();
    innityAppsPauseVideo3();
  } else if (number === 3) {
    innityAppsPlayVideo3();
    innityAppsPauseVideo();
    innityAppsPauseVideo2();
  } else {
    innityAppsPauseVideo();
    innityAppsPauseVideo2();
    innityAppsPauseVideo3();
  }
}

function expandedBannerClosed() {
  innityAppsTrackerReset();
}

function initVideo() {
  if (isVideoLoaded === true) {
    return;
  }

  innityAppsEmbedAutoplayVideo();
  innityAppsEmbedAutoplayVideo2();
  innityAppsEmbedAutoplayVideo3();
  isVideoLoaded = true;
}

// ========== Video template required code ==========
let innityAppsFallbackPlayer = null;
let innityAppsVideoPlayer = null;
let innityAppsVisibilityHidden = 'hidden';

function innityAppsEmbedAutoplayVideo() {
  if (document.getElementById('video-wrapper-1') === null) {
    return;
  }

  innityAppsVideoPlayer = new InnityAppsMobileAutoPlayVideo(
    'video-wrapper-1',
    'video1',
    {
      webm: 'video1.webm',
      mp4: 'video1.mp4',
      mpg: 'video1.mpg',
      poster: adStudioVideoPosterName,
      autoplay: false,
      loop: false,
      forceFallback: false,
      // For fallback player.
      fullscreen: true,
      canvaswidth: '320',
      canvasheight: '180',
      midctatext: 'Learn More',
      playstatectatext: 'Learn More',
      urls: innityAppsVideoClickTag
    },
    'video1.jpg' // this is fallback video poster.
  );

  innityAppsFallbackPlayer = innityAppsVideoPlayer.getFallbackPlayer();
  if (innityAppsFallbackPlayer !== null) {
    innityAppsRunFallbackVideo();
  }

  innityAppsVisibilityBinding();
}

function innityAppsPauseVideo() {
  if (innityAppsVideoPlayer === null) {
    return;
  }

  if (innityAppsFallbackPlayer !== null) {
    innityAppsFallbackPlayer.pausePreview();
    return;
  }

  innityAppsVideoPlayer.pauseVideo();
}

function innityAppsPlayVideo() {
  if (innityAppsVideoPlayer === null) {
    return;
  }

  if (innityAppsFallbackPlayer !== null) {
    innityAppsFallbackPlayer.playPreview();
    return;
  }

  innityAppsVideoPlayer.playVideo();
}

function innityAppsRunFallbackVideo() {
//    fallbackPlayer.noLoop(); // Preview will not loop after ended.
//    fallbackPlayer.noAutoplay(); // Preview will not autoplay.
//    fallbackPlayer.remainPreviewAfterClick(); // Preview will remain there after clicked.
//    fallbackPlayer.setClickCallback(whenFallbackAutoplayIsClicked);
//    fallbackPlayer.addListener('load', fallbackVideoOnLoad);
//    fallbackPlayer.addListener('play', fallbackVideoPlayed);
//    fallbackPlayer.addListener('ended', whenPreviewEnded);
//    fallbackPlayer.setVideoEndedCallback(whenHTMLVideoPlayedEnded);
//    fallbackPlayer.fullscreenCallBack(checkVideoFullScreenStatus);
  innityAppsFallbackPlayer.startEngine(); // This is always required!!!!!
}

function innityAppsVisibilityBinding() {
  var visibilityChangeEvent = 'visibilitychange';
  if (typeof (document.msHidden) !== 'undefined') {
    innityAppsVisibilityHidden = 'msHidden';
    visibilityChangeEvent = 'msvisibilitychange';
  } else if (typeof (document.webkitHidden) !== 'undefined') {
    innityAppsVisibilityHidden = 'webkitHidden';
    visibilityChangeEvent = 'webkitvisibilitychange';
  }

  document.addEventListener(visibilityChangeEvent, innityAppsVisibilityChange, false);
}

function innityAppsVisibilityChange() {
  if (innityAppsFallbackPlayer !== null) {
    return;
  }

  if (document[innityAppsVisibilityHidden] === true) {
    // When browser is hidden or in background.
    innityAppsVideoPlayer.pauseVideo();
  } else {
    // When browser is active or focus.
//        videoPlayer.playVideo();
  }
}
// ========== Video template required code ==========


// ========== Video 2 template required code ==========
let innityAppsFallbackPlayer2 = null;
let innityAppsVideoPlayer2 = null;
let innityAppsVisibilityHidden2 = 'hidden';

function innityAppsEmbedAutoplayVideo2() {
  if (document.getElementById('video-wrapper-1') === null) {
    return;
  }

  innityAppsVideoPlayer2 = new InnityAppsMobileAutoPlayVideo(
      'video-wrapper-2',
      'video2',
      {
        webm: 'video2.webm',
        mp4: 'video2.mp4',
        mpg: 'video2.mpg',
        poster: adStudioVideoPosterName2,
        autoplay: false,
        loop: false,
        forceFallback: false,
        // For fallback player.
        fullscreen: true,
        canvaswidth: '320',
        canvasheight: '180',
        midctatext: 'Learn More',
        playstatectatext: 'Learn More',
        urls: innityAppsVideoClickTag
      },
      'video2.jpg' // this is fallback video poster.
      );

  innityAppsFallbackPlayer2 = innityAppsVideoPlayer2.getFallbackPlayer();
  if (innityAppsFallbackPlayer2 !== null) {
    innityAppsRunFallbackVideo2();
  }

  innityAppsVisibilityBinding2();
}

function innityAppsPauseVideo2() {
  if (innityAppsVideoPlayer2 === null) {
    return;
  }

  if (innityAppsFallbackPlayer2 !== null) {
    innityAppsFallbackPlayer2.pausePreview();
    return;
  }

  innityAppsVideoPlayer2.pauseVideo();
}

function innityAppsPlayVideo2() {
  if (innityAppsVideoPlayer2 === null) {
    return;
  }

  if (innityAppsFallbackPlayer2 !== null) {
    innityAppsFallbackPlayer2.playPreview();
    return;
  }

  innityAppsVideoPlayer2.playVideo();
}

function innityAppsRunFallbackVideo2() {
//    fallbackPlayer.noLoop(); // Preview will not loop after ended.
//    fallbackPlayer.noAutoplay(); // Preview will not autoplay.
//    fallbackPlayer.remainPreviewAfterClick(); // Preview will remain there after clicked.
//    fallbackPlayer.setClickCallback(whenFallbackAutoplayIsClicked);
//    fallbackPlayer.addListener('load', fallbackVideoOnLoad);
//    fallbackPlayer.addListener('play', fallbackVideoPlayed);
//    fallbackPlayer.addListener('ended', whenPreviewEnded);
//    fallbackPlayer.setVideoEndedCallback(whenHTMLVideoPlayedEnded);
//    fallbackPlayer.fullscreenCallBack(checkVideoFullScreenStatus);
  innityAppsFallbackPlayer2.startEngine(); // This is always required!!!!!
}

function innityAppsVisibilityBinding2() {
  var visibilityChangeEvent = 'visibilitychange';
  if (typeof (document.msHidden) !== 'undefined') {
    innityAppsVisibilityHidden2 = 'msHidden';
    visibilityChangeEvent = 'msvisibilitychange';
  } else if (typeof (document.webkitHidden) !== 'undefined') {
    innityAppsVisibilityHidden2 = 'webkitHidden';
    visibilityChangeEvent = 'webkitvisibilitychange';
  }

  document.addEventListener(visibilityChangeEvent, innityAppsVisibilityChange2, false);
}

function innityAppsVisibilityChange2() {
  if (innityAppsFallbackPlayer2 !== null) {
    return;
  }

  if (document[innityAppsVisibilityHidden2] === true) {
    // When browser is hidden or in background.
    innityAppsVideoPlayer2.pauseVideo();
  } else {
    // When browser is active or focus.
//        videoPlayer.playVideo();
  }
}
// ========== Video 2 template required code ==========


// ========== Video 3 template required code ==========
let innityAppsFallbackPlayer3 = null;
let innityAppsVideoPlayer3 = null;
let innityAppsVisibilityHidden3 = 'hidden';

function innityAppsEmbedAutoplayVideo3() {
  if (document.getElementById('video-wrapper-1') === null) {
    return;
  }

  innityAppsVideoPlayer3 = new InnityAppsMobileAutoPlayVideo(
      'video-wrapper-3',
      'video3',
      {
        webm: 'video3.webm',
        mp4: 'video3.mp4',
        mpg: 'video3.mpg',
        poster: adStudioVideoPosterName3,
        autoplay: false,
        loop: false,
        forceFallback: false,
        // For fallback player.
        fullscreen: true,
        canvaswidth: '320',
        canvasheight: '180',
        midctatext: 'Learn More',
        playstatectatext: 'Learn More',
        urls: innityAppsVideoClickTag
      },
      'video3.jpg' // this is fallback video poster.
      );

  innityAppsFallbackPlayer3 = innityAppsVideoPlayer3.getFallbackPlayer();
  if (innityAppsFallbackPlayer3 !== null) {
    innityAppsRunFallbackVideo3();
  }

  innityAppsVisibilityBinding3();
}

function innityAppsPauseVideo3() {
  if (innityAppsVideoPlayer3 === null) {
    return;
  }

  if (innityAppsFallbackPlayer3 !== null) {
    innityAppsFallbackPlayer3.pausePreview();
    return;
  }

  innityAppsVideoPlayer3.pauseVideo();
}

function innityAppsPlayVideo3() {
  if (innityAppsVideoPlayer3 === null) {
    return;
  }

  if (innityAppsFallbackPlayer3 !== null) {
    innityAppsFallbackPlayer3.playPreview();
    return;
  }

  innityAppsVideoPlayer3.playVideo();
}

function innityAppsRunFallbackVideo3() {
//    fallbackPlayer.noLoop(); // Preview will not loop after ended.
//    fallbackPlayer.noAutoplay(); // Preview will not autoplay.
//    fallbackPlayer.remainPreviewAfterClick(); // Preview will remain there after clicked.
//    fallbackPlayer.setClickCallback(whenFallbackAutoplayIsClicked);
//    fallbackPlayer.addListener('load', fallbackVideoOnLoad);
//    fallbackPlayer.addListener('play', fallbackVideoPlayed);
//    fallbackPlayer.addListener('ended', whenPreviewEnded);
//    fallbackPlayer.setVideoEndedCallback(whenHTMLVideoPlayedEnded);
//    fallbackPlayer.fullscreenCallBack(checkVideoFullScreenStatus);
  innityAppsFallbackPlayer3.startEngine(); // This is always required!!!!!
}

function innityAppsVisibilityBinding3() {
  var visibilityChangeEvent = 'visibilitychange';
  if (typeof (document.msHidden) !== 'undefined') {
    innityAppsVisibilityHidden3 = 'msHidden';
    visibilityChangeEvent = 'msvisibilitychange';
  } else if (typeof (document.webkitHidden) !== 'undefined') {
    innityAppsVisibilityHidden3 = 'webkitHidden';
    visibilityChangeEvent = 'webkitvisibilitychange';
  }

  document.addEventListener(visibilityChangeEvent, innityAppsVisibilityChange3, false);
}

function innityAppsVisibilityChange3() {
  if (innityAppsFallbackPlayer3 !== null) {
    return;
  }

  if (document[innityAppsVisibilityHidden3] === true) {
    // When browser is hidden or in background.
    innityAppsVideoPlayer3.pauseVideo();
  } else {
    // When browser is active or focus.
//        videoPlayer.playVideo();
  }
}
// ========== Video 3 template required code ==========


/**
 * Device orientation event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.alpha <br />
 * e.beta <br />
 * e.gamma
 * @param {object} e
 */
function deviceOrientation(e) {
  console.log(e.alpha, e.beta, e.gamma);
}
/**
 * Orientation change event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.eventType
 * @param {object} e
 */
function orientationChange(e) {
  console.log(e.eventType);
}