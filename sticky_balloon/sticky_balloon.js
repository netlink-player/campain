var StickyBalloonNetlink = function (video_balloon_src, aBallon_src) {
  //body
  var body = window.top.document.querySelector("body");

  var cssStickyBallon = `
#stickballoon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000000;
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
  z-index: 1;
  background-color: rgba(255, 255, 255, 0);
  border: none;
  border-radius: none;
  cursor: pointer;
}
`;

  var styleElement = document.createElement("style");
  styleElement.innerHTML = cssStickyBallon;

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
  hiddenImg.src = "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/sticky_balloon/btnout.png";
  hiddenImg.style.height = "25px";
  hiddenButton.appendChild(hiddenImg);

  // Chèn các phần tử vào trong phần tử
  var stickBalloon = document.createElement("div");
  stickBalloon.id = "stickballoon";
  stickBalloon.appendChild(linkElement);
  stickBalloon.appendChild(muteButton);
  stickBalloon.appendChild(hiddenButton);

  body.appendChild(stickBalloon);

  var video = document.getElementById("video_balloon");
  var muteButton = document.getElementById("muteButton");
  var hiddenbtn = document.getElementById("hiddenbtn");

  muteButton.addEventListener("click", function () {
    if (video.muted) {
      video.muted = false;
      muteButton.innerHTML = "&#x1F50A;";
    } else {
      video.muted = true;
      muteButton.innerHTML = "&#x1F507;";
    }
  });
  hiddenbtn.addEventListener("click", function () {
    video.classList.add("tranform_video");
    muteButton.style.display = "none";
    hiddenbtn.style.display = "none";
  });
};
