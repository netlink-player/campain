var InImageVideoNetlink = function (
  _intimage,
  _srcimage,
  _srcytb,
  _btpx,
  _btClpx
) {
  var _body = window.top.document.querySelector("body");

  var _image = _intimage;
  var images = _body.querySelectorAll("img");
  if (_image > images.length) {
    _image = images.length - 1;
  }
  console.log(images.length);
  var intervalId = setInterval(() => {
    if (isImageFile(images[_image].src)) {
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
      // newImage.style.width = images[_image].width * 0.8 + "px";
      // newImage.style.height = "auto";
      // newImage.style.bottom = 0;

      // newImage.style.setProperty("left", "50%", "important");
      newImage.style.setProperty(
        "width",
        images[_image].width + "px",
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
        "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/vib/in_image/close.png";
      // btnNetlinkClose.style.width = "50px";
      // btnNetlinkClose.style.height = "50px";
      // btnNetlinkClose.style.right = "10px";
      // btnNetlinkClose.style.bottom = "80px";

      btnNetlinkClose.style.setProperty("width", "30px", "important");
      btnNetlinkClose.style.setProperty("height", "30px", "important");
      btnNetlinkClose.style.setProperty("right", "10px", "important");
      btnNetlinkClose.style.setProperty("bottom", _btClpx + "px", "important");

      btnNetlinkClose.style.cursor = "pointer";
      btnNetlinkClose.style.animationName = "btnClose";
      btnNetlinkClose.style.animationDuration = "0.5s";
      btnNetlinkClose.style.animationTimingFunction = "ease-in-out";
      // btnNetlinkCloseE.appendChild(btnNetlinkClose);

      //in_imgae_affter

      var elmNetlinkAfter = document.createElement("iframe");
      elmNetlinkAfter.style.position = "absolute";
      elmNetlinkAfter.src = _srcytb;
      elmNetlinkAfter.style.setProperty(
        "width",
        images[_image].width * 0.5 + "px",
        "important"
      );
      elmNetlinkAfter.style.setProperty(
        "height",
        images[_image].width * 0.25 + "px",
        "important"
      );
      elmNetlinkAfter.style.bottom = "0";
      elmNetlinkAfter.style.left = "50%";
      elmNetlinkAfter.style.transform = "translate(-50%)";
      elmNetlinkAfter.style.setProperty("display", "inline", "important");
      // elmNetlinkAfter.style.width = images[_image].width + "px";
      // elmNetlinkAfter.style.height = images[_image].height + "px";
      elmNetlinkAfter.setAttribute(
        "allow",
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      );
      elmNetlinkAfter.setAttribute("allowfullscreen", "");
      elmNetlinkAfter.setAttribute("frameborder", "0");

      var divBottom = document.createElement("div");
      divBottom.id = "divBottom";
      divBottom.style.position = "relative";
      divBottom.style.display = "inline-block";
      divBottom.style.setProperty(
        "width",
        images[_image].width + "px",
        "important"
      );
      divBottom.style.setProperty(
        "height",
        images[_image].height + "px",
        "important"
      );
      divBottom.style.padding = "30px 0px 0px 0px";

      var imgBottom = document.createElement("img");
      // imgBottom.style.position = "absolute";
      imgBottom.src =
        "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/vib/in_image/banner_bottom.png";
      imgBottom.style.setProperty(
        "width",
        images[_image].width + "px",
        "important"
      );
      imgBottom.style.setProperty(
        "height",
        images[_image].height + "px",
        "important"
      );
      divBottom.appendChild(imgBottom);
      divBottom.appendChild(elmNetlinkAfter);

      // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg

      var divTop = document.createElement("div");
      divTop.id = "divTop";
      divTop.style.position = "relative";

      // container_larg.appendChild(images[_image].cloneNode(true));
      // container_small.appendChild(newImage);
      divTop.appendChild(images[_image].cloneNode(true));

      divTop.appendChild(newImage);

      // container_small.appendChild(btnNetlinkClose);
      divTop.appendChild(btnNetlinkClose);
      container_small.appendChild(divTop);
      container_small.appendChild(divBottom);

      //add------------------------

      container_larg.appendChild(container_small);
      // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg
      images[_image].parentNode.replaceChild(container_larg, images[_image]);
      btnNetlinkClose.addEventListener("click", () => {
        divTop.removeChild(newImage);
        divTop.removeChild(btnNetlinkClose);
        container_larg.style.setProperty("height", "auto", "important");
        container_small.removeChild(divBottom);
      });
      clearInterval(intervalId);
    } else {
      console.log("b64");
    }
  }, 1000);
  function isImageFile(str) {
    return /\.(jpg|jpeg|png)$/i.test(str);
  }
};
