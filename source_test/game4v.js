var InImageVideoNetlink = function (_intimage, _srcimage, _srcytb, _btpx) {
  var _idImage = window.top.document.getElementById("attachment_994249");
  var _ImageQr = _idImage.querySelector("img");
  var _body = window.top.document.querySelector("body");

  var _image = _intimage;
  var images = _body.querySelectorAll("img");
  if (_image > images.length) {
    _image = images.length - 1;
  }
  console.log(images.length);
  var container_larg = document.createElement("div");
  var container_small = document.createElement("div");
  //   container_small.style.position = "absolute";
    // container_small.style.bottom = 0;
  container_small.style.zIndex = 8;
  container_larg.style.position = "relative";
  container_larg.style.display = "inline-block";

  container_larg.style.setProperty("width", _ImageQr.width + "px", "important");
  container_larg.style.setProperty("height", "auto", "important");
  // container_larg.style.width = _ImageQr.width + "px";
  // container_larg.style.height = _ImageQr.height + "px";

  //new banner
  var newImage = document.createElement("img");
  newImage.src = _srcimage;
  newImage.style.position = "absolute";
  newImage.style.left = "50%";
  newImage.style.opacity = 1;
  newImage.style.transform = "translateX(-50%)";
//   newImage.style.zIndex = 999;
  // newImage.style.width = _ImageQr.width * 0.8 + "px";
  // newImage.style.height = "auto";

  // newImage.style.setProperty("left", "50%", "important");
  newImage.style.setProperty("width", _ImageQr.width * 0.8 + "px", "important");
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
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/outstreamjs/delete.png";
  btnNetlinkClose.style.zIndex = 1;
  // btnNetlinkClose.style.width = "50px";
  // btnNetlinkClose.style.height = "50px";
  // btnNetlinkClose.style.right = "10px";
  // btnNetlinkClose.style.bottom = "80px";

  btnNetlinkClose.style.setProperty("width", "20px", "important");
  btnNetlinkClose.style.setProperty("height", "20px", "important");
  btnNetlinkClose.style.setProperty("right", "10px", "important");
  btnNetlinkClose.style.setProperty("bottom", "35px", "important");
  btnNetlinkClose.style.backgroundColor = "white";
  btnNetlinkClose.style.border = "1px";
  btnNetlinkClose.style.borderRadius = "50%";
  btnNetlinkClose.style.padding = '4px';


  btnNetlinkClose.style.cursor = "pointer";
  btnNetlinkClose.style.animationName = "btnClose";
  btnNetlinkClose.style.animationDuration = "0.5s";
  btnNetlinkClose.style.animationTimingFunction = "ease-in-out";
  // btnNetlinkCloseE.appendChild(btnNetlinkClose);

  //in_imgae_affter

  var elmNetlinkAfter = document.createElement("iframe");
  elmNetlinkAfter.style.position = "relative";
  elmNetlinkAfter.src = _srcytb;
  //   elmNetlinkAfter.style.zIndex = 999;
  elmNetlinkAfter.style.setProperty(
    "width",
    _ImageQr.width + "px",
    "important"
  );
  elmNetlinkAfter.style.setProperty("height", "auto", "important");
  elmNetlinkAfter.style.setProperty("display", "inline", "important");
  // elmNetlinkAfter.style.width = _ImageQr.width + "px";
  // elmNetlinkAfter.style.height = _ImageQr.height + "px";
  elmNetlinkAfter.style.padding = "30px 0px 30px 0px";
  elmNetlinkAfter.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
  );
  elmNetlinkAfter.setAttribute("allowfullscreen", "");
  elmNetlinkAfter.setAttribute("frameborder", "0");

  // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg
  container_larg.appendChild(_ImageQr.cloneNode(true));
  container_small.appendChild(newImage);

  container_small.appendChild(btnNetlinkClose);
  // container_small.appendChild(elmNetlinkAfter);

  //add------------------------
  container_larg.appendChild(container_small);

  // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg

  _ImageQr.parentNode.replaceChild(container_larg, _ImageQr);
  btnNetlinkClose.addEventListener("click", () => {
    container_larg.removeChild(container_small);
  });
};
