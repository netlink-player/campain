function InStreamNLYtb(idVideoYtb, sizePlayer, sourceVideoInstream) {
  // Lấy tham chiếu đến phần tử <div> có id là 'instreamNlYtb'
  var instreamDiv = document.getElementById("instreamNlYtb");
  instreamDiv.style.width = sizePlayer[0] + "px";
  instreamDiv.style.position = "relative";

  //progess
  var styleProgess = `
  .progressBarNL {
    position: absolute;
    width: 120px;
    height: 20px;
    background-color: #ffdfdf;
    border-radius: 0px 10px 10px 0px;
    cursor: pointer;
  }

  .progressNL {
    height: 100%;
    background-color: #007bff;
    width: 0;
    border-radius: 0px 8px 8px 0px;
    transition: width 0.3s ease;
  }`;
  var cssProgess = document.createElement("style");
  cssProgess.innerHTML = styleProgess;
  // instreamDiv.appendChild(cssProgess);

  var progressBarNL = document.createElement("div");
  progressBarNL.className = "progressBarNL";
  var progressNL = document.createElement("div");
  progressNL.className = "progressNL";
  progressBarNL.appendChild(progressNL);
  // instreamDiv.appendChild(progressBarNL);

  // Tạo phần tử video
  var videoElement = document.createElement("video");
  videoElement.style.position = "absolute";
  videoElement.preload = "metadata";
  videoElement.setAttribute("playsinline", "");
  videoElement.setAttribute("autoplay", "");
  videoElement.loop = false;
  videoElement.style.zIndex = "1";
  videoElement.style.width = sizePlayer[0] + "px";
  videoElement.style.height = "100%";
  videoElement.style.left = "0px";
  videoElement.style.bottom = 0;
  videoElement.muted = true;
  videoElement.style.objectFit = "fill";

  // Tạo phần tử source
  var sourceElement = document.createElement("source");
  sourceElement.src = sourceVideoInstream;
  sourceElement.type = "video/mp4";

  // Thêm phần tử source vào phần tử video
  videoElement.appendChild(sourceElement);

  // Tạo phần tử button
  var buttonElement = document.createElement("button");
  buttonElement.style.position = "absolute";
  buttonElement.style.zIndex = "2";
  buttonElement.style.width = "100px";
  buttonElement.style.height = "30px";
  buttonElement.style.bottom = "20px";
  buttonElement.style.right = "0";
  buttonElement.style.backgroundColor = "#ffffff69";
  buttonElement.style.cursor = "pointer";
  buttonElement.textContent = "SKIP ADS";

  // Tạo nút mute
  var muteButtonNlYtb = document.createElement("button");
  muteButtonNlYtb.innerHTML = "&#x1F507;";
  muteButtonNlYtb.style.position = "absolute";
  muteButtonNlYtb.style.zIndex = "2";
  muteButtonNlYtb.style.left = 0;
  muteButtonNlYtb.style.bottom = "10px";
  muteButtonNlYtb.style.fontSize = "20px";
  muteButtonNlYtb.style.backgroundColor = "rgba(255, 255, 255, 0)";
  muteButtonNlYtb.style.border = "none";
  muteButtonNlYtb.style.borderRadius = "none";
  muteButtonNlYtb.style.cursor = "pointer";

  // Thêm phần tử video và button vào phần tử <div>

  // 2. This code loads the IFrame Player API code asynchronously.
  var tag = document.createElement("script");

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  // instreamDiv.appendChild(tag);
  instreamDiv.insertBefore(tag, instreamDiv.firstChild);

  // 3. This function creates an <iframe> (and YouTube player)
  //    after the API code downloads.

  var player;
  function onYouTubeIframeAPIReady() {
    player = new YT.Player("youtubePlayerNL", {
      height: sizePlayer[1],
      width: sizePlayer[0],
      videoId: `${idVideoYtb}`,
      playerVars: {
        playsinline: 1,
        autoplay: 1,
      },
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  // 4. The API will call this function when the video player is ready.
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
        instreamDiv.appendChild(videoElement);
        instreamDiv.appendChild(muteButtonNlYtb);
        setTimeout(function () {
          instreamDiv.appendChild(buttonElement);
        }, 3000);

        isAds = true;
      }
    } else if (event.data == YT.PlayerState.PAUSED) {
      console.log("Video đã tạm dừng");
    } else if (event.data == YT.PlayerState.ENDED) {
      console.log("Video đã kết thúc");
    }
  }
  function stopVideo() {
    player.stopVideo();
  }

  videoElement.addEventListener("play", function () {
    player.pauseVideo();
  });
  videoElement.addEventListener("ended", function () {
    ytbPlay();
  });

  buttonElement.addEventListener("click", function () {
    ytbPlay();
  });
  function ytbPlay() {
    buttonElement.remove();
    videoElement.remove();
    muteButtonNlYtb.remove();
    player.playVideo();
  }

  muteButtonNlYtb.addEventListener("click", function () {
    if (videoElement.muted) {
      videoElement.muted = false;
      muteButtonNlYtb.innerHTML = "&#x1F50A;";
    } else {
      videoElement.muted = true;
      muteButtonNlYtb.innerHTML = "&#x1F507;";
    }
  });

  setTimeout(onYouTubeIframeAPIReady, 500);
}
