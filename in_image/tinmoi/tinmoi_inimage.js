var InImageTinmoiNetlink = function () {
  var _body = window.top.document.querySelector("body");
  var mainContentDetail = _body.querySelector(".main-content-detail");
  var images = mainContentDetail.querySelectorAll("img");
  console.log(images[1].src);
  var container_larg = document.createElement("div");
  var container_small = document.createElement("div");
  container_larg.style.position = "relative";
  container_larg.style.display = "inline-block";

  container_larg.style.setProperty(
    "width",
    images[1].width + "px",
    "important"
  );
  container_larg.style.setProperty(
    "height",
    images[1].height + "px",
    "important"
  );
  // container_larg.style.width = images[1].width + "px";
  // container_larg.style.height = images[1].height + "px";

  //new banner
  var newImage = document.createElement("img");
  newImage.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/Masthead/video_netlink-cut.gif";
  newImage.style.position = "absolute";
  newImage.style.left = "50%";
  newImage.style.opacity = 1;
  newImage.style.transform = "translateX(-50%)";
  newImage.style.zIndex = 999;
  // newImage.style.width = images[1].width * 0.8 + "px";
  // newImage.style.height = "auto";
  // newImage.style.bottom = 0;

  // newImage.style.setProperty("left", "50%", "important");
  newImage.style.setProperty(
    "width",
    images[1].width * 0.8 + "px",
    "important"
  );
  newImage.style.setProperty("height", "auto", "important");
  newImage.style.setProperty("bottom", 0 + "px", "important");

  newImage.style.animationName = "slideUp";
  newImage.style.animationDuration = "0.5s";
  newImage.style.animationTimingFunction = "ease-in-out";
  var styleSheet = document.createElement("style");
  styleSheet.innerHTML = `
      @-webkit-keyframes slideUp {
      0% {
      transform: translate(-50%, 100%);
      opacity: 0;
          }
      100% {
      transform: translate(-50%, 0);
      opacity: 1;
          }
    }

    @-webkit-keyframes btnClose {
      0% {
      transform: translateY(100%);
      opacity: 0;
          }
      100% {
      transform: translateY(0);
      opacity: 1;
          }
    }
    `;
  document.head.appendChild(styleSheet);

  //button_close
  var btnNetlinkClose = document.createElement("img");
  btnNetlinkClose.style.position = "absolute";
  btnNetlinkClose.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/in_image/close.png";
  btnNetlinkClose.style.zIndex = 999;

  btnNetlinkClose.style.setProperty("width", "35px", "important");
  btnNetlinkClose.style.setProperty("height", "35px", "important");
  btnNetlinkClose.style.setProperty("right", "0px", "important");
  btnNetlinkClose.style.setProperty("bottom", "80px", "important");

  btnNetlinkClose.style.cursor = "pointer";
  btnNetlinkClose.style.animationName = "btnClose";
  btnNetlinkClose.style.animationDuration = "0.5s";
  btnNetlinkClose.style.animationTimingFunction = "ease-in-out";


  // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg
  container_larg.appendChild(images[1].cloneNode(true));
  container_small.appendChild(newImage);

  container_small.appendChild(btnNetlinkClose);

  //add------------------------
  container_larg.appendChild(container_small);

  // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg

  images[1].parentNode.replaceChild(container_larg, images[1]);
  btnNetlinkClose.addEventListener("click", () => {
    container_larg.removeChild(container_small);
  });
};
