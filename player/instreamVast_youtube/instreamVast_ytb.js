// Copyright 2013 Google Inc. All Rights Reserved.
// You may study, modify, and use this example for any purpose.
// Note that this example is provided "as is", WITHOUT WARRANTY
// of any kind either expressed or implied.

let adsManager;
let adsLoader;
let adDisplayContainer;
let intervalTimer;
let isAdPlaying;
let isContentFinished;
let playButton = document.createElement("button");
let videoContent;
let contentNLVastYtb;
let mainContainerNlVastYtb;
let sizeWidth = 640;
let sizeHeight = 360;
/**
 * Initializes IMA setup.
 */

function InStreamVastNLYtb(idVideoYtb, sizePlayer, sourceVideoInstream) {
  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtubePlayer", {
      height: "360",
      width: "640",
      videoId: "3SaNmAn8ptQ",
      playerVars: {
        playsinline: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady(event) {
    event.target.playVideo();
    //   event.target.addEventListener("onStateChange", onPlayerStateChange);
  }

  // 5. The API calls this function when the player's state changes.
  //    The function indicates that when playing a video (state=1),
  //    the player should play for six seconds and then stop.
  var isAds = false;
  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      console.log("Video đang phát");
      if (!isAds) {
        setTimeout(playAds, 0);
        contentNLVastYtb.style.zIndex = 0;
        isAds = true;
      }
    } else if (event.data == YT.PlayerState.PAUSED) {
      console.log("Video đã tạm dừng");
    } else if (event.data == YT.PlayerState.ENDED) {
      console.log("Video đã kết thúc");
    }
  }
  function init() {
    setUpCss();
    setUpIMA();
  }

  function setUpCss() {
    //mainContainerNlVastYtb
    mainContainerNlVastYtb = document.getElementById("mainContainerNlVastYtb");
    mainContainerNlVastYtb.style.position = "relative";
    mainContainerNlVastYtb.style.setProperty(
      "width",
      sizeWidth + "px",
      "important"
    );
    mainContainerNlVastYtb.style.width = sizeWidth + "px";

    mainContainerNlVastYtb.style.setProperty(
      "height",
      sizeHeight + "px",
      "important"
    );
    mainContainerNlVastYtb.style.height = sizeHeight + "px";

    videoContent = document.getElementById("youtubePlayer");
    contentNLVastYtb = document.getElementById("contentNLVastYtb");
    contentNLVastYtb.style.zIndex = 1;
    contentNLVastYtb.style.position = "absolute";
    contentNLVastYtb.style.width = sizeWidth + "px";
    contentNLVastYtb.style.height = sizeHeight + "px";

    contentNLVastYtb.style.setProperty("width", sizeWidth + "px", "important");
    contentNLVastYtb.style.setProperty(
      "height",
      sizeHeight + "px",
      "important"
    );

    var adContainerNLVastYtb = document.getElementById("adContainerNLVastYtb");
    adContainerNLVastYtb.style.position = "absolute";
    adContainerNLVastYtb.style.width = sizeWidth + "px";
    adContainerNLVastYtb.style.height = sizeHeight + "px";
    adContainerNLVastYtb.style.setProperty(
      "width",
      sizeWidth + "px",
      "important"
    );
    adContainerNLVastYtb.style.setProperty(
      "height",
      sizeHeight + "px",
      "important"
    );
    adContainerNLVastYtb.style.top = 0;

    playButton.innerText = "SKIP ADS";
    playButton.style.position = "absolute";
    playButton.style.zIndex = "2";
    playButton.style.width = "100px";
    playButton.style.height = "30px";
    playButton.style.bottom = "20px";
    playButton.style.right = "0";
    playButton.style.backgroundColor = "#ffffff69";
    playButton.style.cursor = "pointer";
    playButton.textContent = "SKIP ADS";
    playButton.addEventListener("click", function () {
      adsManager.stop();
      playButton.remove();
      console.log(adsManager.getAdSkippableState());
      skipAds();
    });

    var scripApiYtb = document.createElement("script");
    scripApiYtb.src = "https://www.youtube.com/iframe_api";

    mainContainerNlVastYtb.insertBefore(
      scripApiYtb,
      mainContainerNlVastYtb.firstChild
    );
    setTimeout(onYouTubeIframeAPIReady, 500);
  }

  /**
   * Sets up IMA ad display container, ads loader, and makes an ad request.
   */
  function setUpIMA() {
    // Create the ad display container.
    createAdDisplayContainer();
    // Create ads loader.
    adsLoader = new google.ima.AdsLoader(adDisplayContainer);
    // Listen and respond to ads loaded and error events.
    adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      onAdsManagerLoaded,
      false
    );
    adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError,
      false
    );

    // An event listener to tell the SDK that our content video
    // is completed so the SDK can play any post-roll ads.

    // Request video ads.
    const adsRequest = new google.ima.AdsRequest();
    adsRequest.adTagUrl =
      "https://pubads.g.doubleclick.net/gampad/ads?iu=/22486823495/video_instream&description_url=https%3A%2F%2Fnetlink.vn%2F&tfcd=0&npa=0&sz=640x480&gdfp_req=1&output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";
    // "https://pubads.g.doubleclick.net/gampad/ads?" +
    // "iu=/21775744923/external/single_ad_samples&sz=640x480&" +
    // "cust_params=sample_ct%3Dlinear&ciu_szs=300x250%2C728x90&gdfp_req=1&" +
    // "output=vast&unviewed_position_start=1&env=vp&impl=s&correlator=";

    // Specify the linear and nonlinear slot sizes. This helps the SDK to
    // select the correct creative if multiple are returned.
    adsRequest.linearAdSlotWidth = 640;
    adsRequest.linearAdSlotHeight = 400;

    adsRequest.nonLinearAdSlotWidth = 640;
    adsRequest.nonLinearAdSlotHeight = 150;

    adsLoader.requestAds(adsRequest);
  }

  /**
   * Sets the 'adContainer' div as the IMA ad display container.
   */
  function createAdDisplayContainer() {
    // We assume the adContainer is the DOM id of the element that will house
    // the ads.
    adDisplayContainer = new google.ima.AdDisplayContainer(
      document.getElementById("adContainerNLVastYtb"),
      videoContent
    );
  }

  /**
   * Loads the video content and initializes IMA ad playback.
   */
  function playAds() {
    // videoContent.load();
    adDisplayContainer.initialize();

    try {
      adsManager.init(640, 360, google.ima.ViewMode.NORMAL);
      adsManager.start();
      if (adsManager.getAdSkippableState()) {
        setTimeout(function () {
          mainContainerNlVastYtb.appendChild(playButton);
        }, 3500);
      }
    } catch (adError) {
      // An error may be thrown if there was a problem with the VAST response.
      // videoContent.play();
    }
  }
  function skipAds() {
    player.playVideo();
    contentNLVastYtb.style.zIndex = 1;
  }
  /**
   * Handles the ad manager loading and sets ad event listeners.
   * @param {!google.ima.AdsManagerLoadedEvent} adsManagerLoadedEvent
   */
  function onAdsManagerLoaded(adsManagerLoadedEvent) {
    // Get the ads manager.
    const adsRenderingSettings = new google.ima.AdsRenderingSettings();
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    // videoContent should be set to the content video element.
    adsManager = adsManagerLoadedEvent.getAdsManager(
      videoContent,
      adsRenderingSettings
    );

    // Add listeners to the required events.
    adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError
    );
    adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      onContentPauseRequested
    );
    adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      onContentResumeRequested
    );
    adsManager.addEventListener(
      google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
      onAdEvent
    );

    // Listen to any additional events, if necessary.
    adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, onAdEvent);
    adsManager.addEventListener(google.ima.AdEvent.Type.USE_CLOSE, onAdEvent);
  }

  /**
   * Handles actions taken in response to ad events.
   * @param {!google.ima.AdEvent} adEvent
   */
  function onAdEvent(adEvent) {
    // Retrieve the ad from the event. Some events (for example,
    // ALL_ADS_COMPLETED) don't have ad object associated.
    const ad = adEvent.getAd();
    switch (adEvent.type) {
      case google.ima.AdEvent.Type.LOADED:
        // This is the first event sent for an ad - it is possible to
        // determine whether the ad is a video ad or an overlay.
        if (!ad.isLinear()) {
          // Position AdDisplayContainer correctly for overlay.
          // Use ad.width and ad.height.
          // videoContent.play();
        }
        break;
      case google.ima.AdEvent.Type.STARTED:
        // This event indicates the ad has started - the video player
        // can adjust the UI, for example display a pause button and
        // remaining time.
        player.pauseVideo();
        if (ad.isLinear()) {
          // For a linear ad, a timer can be started to poll for
          // the remaining time.
          intervalTimer = setInterval(function () {
            // Example: const remainingTime = adsManager.getRemainingTime();
          }, 300); // every 300ms
        }
        break;
      case google.ima.AdEvent.Type.SKIPPED:
        // This event indicates the ad has finished - the video player
        // can perform appropriate UI actions, such as removing the timer for
        // remaining time detection.
        skipAds();
        if (ad.isLinear()) {
          clearInterval(intervalTimer);
        }
        break;
      case google.ima.AdEvent.Type.COMPLETE:
        // This event indicates the ad has finished - the video player
        // can perform appropriate UI actions, such as removing the timer for
        // remaining time detection.
        adsManager.destroy();
        player.playVideo();
        contentNLVastYtb.style.zIndex = 1;
        if (ad.isLinear()) {
          clearInterval(intervalTimer);
        }
        break;
    }
  }

  /**
   * Handles ad errors.
   * @param {!google.ima.AdErrorEvent} adErrorEvent
   */
  function onAdError(adErrorEvent) {
    // Handle the error logging.
    console.log(adErrorEvent.getError());
    adsManager.destroy();
    contentNLVastYtb.style.zIndex = 1;
  }
  function onContentPauseRequested() {
    isAdPlaying = true;
    // videoContent.pause();
    // This function is where you should setup UI for showing ads (for example,
    // display ad timer countdown, disable seeking and more.)
    // setupUIForAds();
  }

  /**
   * Resumes video content and removes ad UI.
   */
  function onContentResumeRequested() {
    isAdPlaying = false;
    if (!isContentFinished) {
      // videoContent.play();
    }
  }
  init();
}
