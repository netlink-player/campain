var OutstreamjsReponsiveNetlink = function (video_outstreamjs_src, aBallon_src) {
  //_divOutstream
  var _divOutstream = window.top.document.getElementById("outstreamMobilePc");

  var cssVideoOutStreamreponsive = `
  #stickoutstreamjsOustreamReponsive {
    position: relative;
    zIndex: 1;
  }
  #video_outstreamjs {
    position: absolute;
    bottom: 0px;
    left: 0px;
    height: 250px;
    width: 300px;
    object-fit: cover !important;
  }
  .tranform_video {
    border-radius: 50% !important;
    height: 80px !important;
    width: 80px !important;
    
  }
  .mutebtnOustreamReponsive {
    position: absolute;
    bottom: 20px;
    font-size: 20px !important;
    left: 0;
    z-index: 1;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-radius: none;
    cursor: pointer;
  }
  .divreloadOustreamReponsive {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    top: 0;
    display: none;
    background-color: rgba(255, 255, 255, 0.6);
  }
  .reloadOustreamReponsive {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 0%);
    z-index: 1;
    background-color: rgba(255, 255, 255, 0);
    border: none;
    border-radius: none;
    cursor: pointer;
  }
  .deleteOustreamReponsive {
    position: absolute;
    top: 0;
    height: 20px;
    width: 20px;
    right: 0;
    z-index: 1;
    background-color: white;
    border: 1px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  `;

  var styleElement = document.createElement("style");

  styleElement.innerHTML = cssVideoOutStreamreponsive;
  _divOutstream.appendChild(styleElement);

  // Tạo phần tử video
  var videoElement = document.createElement("video");
  videoElement.id = "video_outstreamjs";
  videoElement.preload = "metadata";
  videoElement.playsInline = true;
  videoElement.autoplay = true;
  videoElement.loop = false;
  videoElement.style.width = "100%";
  videoElement.style.height = "auto";
  videoElement.style.position = "relative";
  videoElement.muted = true;
  videoElement.src = video_outstreamjs_src;

  // var videoSource = document.createElement("source");
  // videoSource.src = video_outstreamjs_src;
  // videoSource.type = "video/mp4";

  // videoElement.appendChild(videoSource);

  // Tạo thẻ a và chèn video vào
  var linkElement = document.createElement("a");
  linkElement.href = aBallon_src;
  linkElement.appendChild(videoElement);

  // Tạo nút mute
  var muteButton = document.createElement("button");
  muteButton.id = "muteButton";
  muteButton.className = "mutebtnOustreamReponsive";
  muteButton.innerHTML = "&#x1F507;";

  // Tạo thẻ div và chèn video vào
  var divReloadElement = document.createElement("div");
  divReloadElement.id = "divreloadOustreamReponsive";
  divReloadElement.className = "divreloadOustreamReponsive";

  // Tạo nút ẩn
  var reloadOustreamReponsive = document.createElement("button");
  reloadOustreamReponsive.id = "reloadOustreamReponsive";
  reloadOustreamReponsive.className = "reloadOustreamReponsive";
  var hiddenImg = document.createElement("img");
  hiddenImg.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/outstreamjs/reload.png";
  hiddenImg.style.height = "35px";
  reloadOustreamReponsive.appendChild(hiddenImg);

  // Tạo nút ẩn
  var deleteOustreamReponsive = document.createElement("button");
  deleteOustreamReponsive.id = "deleteOustreamReponsive";
  deleteOustreamReponsive.className = "deleteOustreamReponsive";
  var deleteImage = document.createElement("img");
  deleteImage.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/outstreamjs/delete.png";
  deleteImage.style.height = "20px";
  deleteImage.style.objectFit = "contain";
  deleteOustreamReponsive.appendChild(deleteImage);

  // Chèn các phần tử vào trong phần tử
  var stickoutstreamjsOustreamReponsive = document.createElement("div");
  stickoutstreamjsOustreamReponsive.id = "stickoutstreamjsOustreamReponsive";
  stickoutstreamjsOustreamReponsive.appendChild(linkElement);
  stickoutstreamjsOustreamReponsive.appendChild(muteButton);
  divReloadElement.appendChild(reloadOustreamReponsive);
  stickoutstreamjsOustreamReponsive.appendChild(divReloadElement);
  stickoutstreamjsOustreamReponsive.appendChild(deleteOustreamReponsive);

  _divOutstream.appendChild(stickoutstreamjsOustreamReponsive);

  // var video = document.getElementById("video_outstreamjs");
  // var muteButton = document.getElementById("muteButton");
  // var reloadOustreamReponsive = document.getElementById("reloadOustreamReponsive");

  muteButton.addEventListener("click", function () {
    if (videoElement.muted) {
      videoElement.muted = false;
      muteButton.innerHTML = "&#x1F50A;";
    } else {
      videoElement.muted = true;
      muteButton.innerHTML = "&#x1F507;";
    }
  });
  reloadOustreamReponsive.addEventListener("click", function () {
    videoElement.play();
    divReloadElement.style.display = "none";
    muteButton.style.display = "block";
  });

  deleteOustreamReponsive.addEventListener("click", function () {
    stickoutstreamjsOustreamReponsive.remove();
  });
  videoElement.addEventListener("ended", function () {
    divReloadElement.style.display = "block";
    muteButton.style.display = "none";
  });
  document.addEventListener("scroll", function () {
    if (!checkDivSticky(_divOutstream)) {
      stickoutstreamjsOustreamReponsive.style.setProperty("position", "fixed");
      stickoutstreamjsOustreamReponsive.style.setProperty("top", "0");
      stickoutstreamjsOustreamReponsive.style.setProperty("right", "0");
      stickoutstreamjsOustreamReponsive.style.setProperty("width", "300px");
      stickoutstreamjsOustreamReponsive.style.zIndex = '9000000';
    } else {
      stickoutstreamjsOustreamReponsive.style.removeProperty("top");
      stickoutstreamjsOustreamReponsive.style.removeProperty("right");
      stickoutstreamjsOustreamReponsive.style.removeProperty("position");
      stickoutstreamjsOustreamReponsive.style.removeProperty("width");
      stickoutstreamjsOustreamReponsive.style.zIndex = '1';
    }
  });

  function checkDivSticky(div) {
    const top = div.getBoundingClientRect().top;
    const left = div.getBoundingClientRect().left;
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    return top >= 0 && top <= windowHeight;
  }
};
