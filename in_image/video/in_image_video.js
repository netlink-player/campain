var InImageVideoNetlink = function (_intimage, _srcimage, _srcytb, _btpx) {
  var _body = window.top.document.querySelector("body");

  var _image = _intimage;
  var images = _body.querySelectorAll("img");
  if (_image > images.length) {
    _image = images.length-1;
  }
  console.log(images.length);
  var container_larg = document.createElement("div");
  var container_small = document.createElement("div");
  container_larg.style.position = "relative";
  container_larg.style.display = "inline-block";

  container_larg.style.setProperty(
    "width",
    images[_image].width + "px",
    "important"
  );
  container_larg.style.setProperty(
    "height",
    images[_image].height + "px",
    "important"
  );
  // container_larg.style.width = images[_image].width + "px";
  // container_larg.style.height = images[_image].height + "px";

  //new banner
  var newImage = document.createElement("img");
  newImage.src = _srcimage;
  newImage.style.position = "absolute";
  newImage.style.left = "50%";
  newImage.style.opacity = 1;
  newImage.style.transform = "translateX(-50%)";
  newImage.style.zIndex = 999;
  // newImage.style.width = images[_image].width * 0.8 + "px";
  // newImage.style.height = "auto";
  // newImage.style.bottom = 0;

  // newImage.style.setProperty("left", "50%", "important");
  newImage.style.setProperty(
    "width",
    images[_image].width * 0.8 + "px",
    "important"
  );
  newImage.style.setProperty("height", "auto", "important");
  newImage.style.setProperty("bottom", _btpx + "px", "important");

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
  // btnNetlinkClose.style.width = "50px";
  // btnNetlinkClose.style.height = "50px";
  // btnNetlinkClose.style.right = "10px";
  // btnNetlinkClose.style.bottom = "80px";

  btnNetlinkClose.style.setProperty("width", "50px", "important");
  btnNetlinkClose.style.setProperty("height", "50px", "important");
  btnNetlinkClose.style.setProperty("right", "10px", "important");
  btnNetlinkClose.style.setProperty("bottom", "80px", "important");

  btnNetlinkClose.style.cursor = "pointer";
  btnNetlinkClose.style.animationName = "btnClose";
  btnNetlinkClose.style.animationDuration = "0.5s";
  btnNetlinkClose.style.animationTimingFunction = "ease-in-out";
  // btnNetlinkCloseE.appendChild(btnNetlinkClose);

  //in_imgae_affter

  var elmNetlinkAfter = document.createElement("iframe");
  elmNetlinkAfter.style.position = "relative";
  elmNetlinkAfter.src = _srcytb;
  elmNetlinkAfter.style.zIndex = 999;
  elmNetlinkAfter.style.setProperty(
    "width",
    images[_image].width + "px",
    "important"
  );
  elmNetlinkAfter.style.setProperty(
    "height",
    images[_image].height + "px",
    "important"
  );
  elmNetlinkAfter.style.setProperty("display", "inline", "important");
  // elmNetlinkAfter.style.width = images[_image].width + "px";
  // elmNetlinkAfter.style.height = images[_image].height + "px";
  elmNetlinkAfter.style.padding = "30px 0px 30px 0px";
  elmNetlinkAfter.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  elmNetlinkAfter.setAttribute("allowfullscreen", "");
  elmNetlinkAfter.setAttribute("frameborder", "0");

  // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg
  container_larg.appendChild(images[_image].cloneNode(true));
  container_small.appendChild(newImage);

  container_small.appendChild(btnNetlinkClose);
  container_small.appendChild(elmNetlinkAfter);

  //add------------------------
  container_larg.appendChild(container_small);

  // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg

  images[_image].parentNode.replaceChild(container_larg, images[_image]);
  btnNetlinkClose.addEventListener("click", () => {
    container_larg.removeChild(container_small);
  });
};
