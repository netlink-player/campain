var StickyBalloonNetlink = function (
  isStickyLeft,
  video_balloon_src,
  aBallon_src, _sizeBotton, _sizeHox
) {
  //body
  var body = window.top.document.querySelector("body");

  var cssStickyBallonLeft = `
#stickballoon {
  position: fixed;
  bottom: ${_sizeBotton};
  left: ${_sizeHox};
  z-index: 99000;
}
#video_balloon {
  position: absolute;
  border-radius: 20px;
  bottom: 20px;
  left: 20px;
  height: 300px;
  width: 150px;
  object-fit: cover !important;
}
.tranform_video {
  border-radius: 50% !important;
  height: 80px !important;
  width: 80px !important;
  
}
.mutebtn {
  position: absolute;
  bottom: 30px;
  font-size: 20px;
  left: 130px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: none;
  cursor: pointer;
}
.hiddenbtn {
  position: absolute;
  bottom: 280px;
  left: 20px;
  height: 50px;
  width: 50px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: none;
  cursor: pointer;
}
`;

  var cssStickyBallon = `
#stickballoon {
  position: fixed;
  bottom: ${_sizeBotton};
  right: ${_sizeHox};
  z-index: 99000;
}
#video_balloon {
  position: absolute;
  border-radius: 20px;
  bottom: 20px;
  right: 20px;
  height: 300px;
  width: 150px;
  object-fit: cover !important;
}
.tranform_video {
  border-radius: 50% !important;
  height: 80px !important;
  width: 80px !important;
  
}
.mutebtn {
  position: absolute;
  bottom: 30px;
  font-size: 20px;
  right: 130px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: none;
  cursor: pointer;
}
.hiddenbtn {
  position: absolute;
  bottom: 280px;
  right: 20px;
  height: 50px;
  width: 50px;
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: none;
  cursor: pointer;
}
`;

  var styleElement = document.createElement("style");

  if (isStickyLeft) {
    styleElement.innerHTML = cssStickyBallonLeft;
  } else {
    styleElement.innerHTML = cssStickyBallon;
  }
  body.appendChild(styleElement);

  // Tạo phần tử video
  var videoElement = document.createElement("video");
  videoElement.id = "video_balloon";
  videoElement.preload = "metadata";
  videoElement.playsInline = true;
  videoElement.autoplay = true;
  videoElement.loop = true;
  videoElement.muted = true;

  var videoSource = document.createElement("source");
  videoSource.src = video_balloon_src;
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

  // Tạo nút ẩn
  var hiddenButton = document.createElement("button");
  hiddenButton.id = "hiddenbtn";
  hiddenButton.className = "hiddenbtn";
  var hiddenImg = document.createElement("img");
  hiddenImg.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/sticky_balloon/btnout.png";
  hiddenImg.style.height = "25px";
  hiddenButton.appendChild(hiddenImg);

  // Chèn các phần tử vào trong phần tử
  var stickBalloon = document.createElement("div");
  stickBalloon.id = "stickballoon";
  stickBalloon.appendChild(linkElement);
  stickBalloon.appendChild(muteButton);
  stickBalloon.appendChild(hiddenButton);

  body.appendChild(stickBalloon);

  // var video = document.getElementById("video_balloon");
  // var muteButton = document.getElementById("muteButton");
  // var hiddenbtn = document.getElementById("hiddenbtn");

  muteButton.addEventListener("click", function () {
    if (videoElement.muted) {
      videoElement.muted = false;
      muteButton.innerHTML = "&#x1F50A;";
    } else {
      videoElement.muted = true;
      muteButton.innerHTML = "&#x1F507;";
    }
  });
  hiddenButton.addEventListener("click", function () {
    videoElement.classList.add("tranform_video");
    muteButton.style.display = "none";
    hiddenButton.style.display = "none";
  });
};
