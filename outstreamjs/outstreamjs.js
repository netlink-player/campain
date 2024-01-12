var VideoOutstreamjsNetlink = function (
  isVideoLeft,
  video_outstreamjs_src,
  aBallon_src
) {
  //body
  var body = window.top.document.querySelector("body");

  var cssVideoBallonLeft = `
#stickoutstreamjs {
  position: fixed;
  bottom: 0px;
  left: 0px;
  z-index: 1000000;
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
.mutebtn {
  position: absolute;
  bottom: 10px;
  font-size: 30px;
  left: 230px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: none;
  cursor: pointer;
}
.divReloadVideo {
  position: absolute;
  bottom: 0;
  height: 250px;
  width: 300px;
  left: 0px;
  z-index: 1;
  display: none;
  background-color: rgba(255, 255, 255, 0.6);
}
.reloadVideo {
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
.deleteVideo {
  position: absolute;
  bottom: 210px;
  height: 35px;
  width: 35px;
  left: 265px;
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

  var cssVideoBallon = `
#stickoutstreamjs {
  position: fixed;
  bottom: 0px;
  right: 0px;
  z-index: 1000000;
}
#video_outstreamjs {
  position: absolute;
  bottom: 0px;
  right: 0px;
  height: 250px;
  width: 300px;
  object-fit: cover !important;
}
.tranform_video {
  border-radius: 50% !important;
  height: 80px !important;
  width: 80px !important;
  
}
.mutebtn {
  position: absolute;
  bottom: 10px;
  font-size: 30px;
  right: 230px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: none;
  cursor: pointer;
}
.divReloadVideo {
  position: absolute;
  bottom: 0;
  height: 250px;
  width: 300px;
  right: 0px;
  z-index: 1;
  display: none;
  background-color: rgba(255, 255, 255, 0.6);
}
.reloadVideo {
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
.deleteVideo {
  position: absolute;
  bottom: 210px;
  height: 35px;
  width: 35px;
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

  if (isVideoLeft) {
    styleElement.innerHTML = cssVideoBallonLeft;
  } else {
    styleElement.innerHTML = cssVideoBallon;
  }
  body.appendChild(styleElement);

  // Tạo phần tử video
  var videoElement = document.createElement("video");
  videoElement.id = "video_outstreamjs";
  videoElement.preload = "metadata";
  videoElement.playsInline = true;
  videoElement.autoplay = true;
  videoElement.loop = false;
  videoElement.muted = true;

  var videoSource = document.createElement("source");
  videoSource.src = video_outstreamjs_src;
  videoSource.type = "video/mp4";

  videoElement.appendChild(videoSource);

  // Tạo thẻ a và chèn video vào
  var linkElement = document.createElement("a");
  linkElement.href = aBallon_src;
  linkElement.appendChild(videoElement);

  // Tạo nút mute
  var muteButton = document.createElement("button");
  muteButton.id = "muteButton";
  muteButton.className = "mutebtn";
  muteButton.innerHTML = "&#x1F507;";

  // Tạo thẻ div và chèn video vào
  var divReloadElement = document.createElement("div");
  divReloadElement.id = "divReloadVideo";
  divReloadElement.className = "divReloadVideo";

  // Tạo nút ẩn
  var reloadVideo = document.createElement("button");
  reloadVideo.id = "reloadVideo";
  reloadVideo.className = "reloadVideo";
  var hiddenImg = document.createElement("img");
  hiddenImg.src = "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/outstreamjs/reload.png";
  hiddenImg.style.height = "35px";
  reloadVideo.appendChild(hiddenImg);

  // Tạo nút ẩn
  var deleteVideo = document.createElement("button");
  deleteVideo.id = "deleteVideo";
  deleteVideo.className = "deleteVideo";
  var deleteImage = document.createElement("img");
  deleteImage.src = "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/outstreamjs/delete.png";
  deleteImage.style.height = "20px";
  deleteVideo.appendChild(deleteImage);

  // Chèn các phần tử vào trong phần tử
  var stickoutstreamjs = document.createElement("div");
  stickoutstreamjs.id = "stickoutstreamjs";
  stickoutstreamjs.appendChild(linkElement);
  stickoutstreamjs.appendChild(muteButton);
  divReloadElement.appendChild(reloadVideo);
  stickoutstreamjs.appendChild(divReloadElement);
  stickoutstreamjs.appendChild(deleteVideo);

  body.appendChild(stickoutstreamjs);

  // var video = document.getElementById("video_outstreamjs");
  // var muteButton = document.getElementById("muteButton");
  // var reloadVideo = document.getElementById("reloadVideo");

  muteButton.addEventListener("click", function () {
    if (videoElement.muted) {
      videoElement.muted = false;
      muteButton.innerHTML = "&#x1F50A;";
    } else {
      videoElement.muted = true;
      muteButton.innerHTML = "&#x1F507;";
    }
  });
  reloadVideo.addEventListener("click", function () {
    videoElement.play();
    divReloadElement.style.display = "none";
    muteButton.style.display = "block";
  });

  deleteVideo.addEventListener("click", function () {
    var parentElement = stickoutstreamjs.parentNode;
    parentElement.removeChild(stickoutstreamjs);
    parentElement.remove();
  });
  videoElement.addEventListener("ended", function () {
    divReloadElement.style.display = "block";
    muteButton.style.display = "none";
  });
};
