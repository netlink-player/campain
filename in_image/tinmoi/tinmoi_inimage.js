var InImageTinmoiNetlink = function () {
  var _head = window.top.document.querySelector("head");
  var _body = window.top.document.querySelector("body");
  var mainContentDetail = _body.querySelector(".main-content-detail");
  var images = mainContentDetail.querySelectorAll("img");

  var container_larg = document.createElement("div");
  var container_small = document.createElement("div");
  container_small.id = "container_small";
  container_small.style.position = "absolute";
  container_small.style.bottom = 0;
  container_small.style.zIndex = 8;
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

  // Create the script element
  var scriptElement = document.createElement("script");
  scriptElement.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3166493188367342";
  scriptElement.async = true;
  scriptElement.crossOrigin = "anonymous";

  // Append the script element to the document's head

  // Create the ins element
  var insElement = document.createElement("ins");
  insElement.className = "adsbygoogle";
  insElement.style.display = "block";
  insElement.setAttribute("data-ad-client", "ca-pub-3166493188367342");
  insElement.setAttribute("data-ad-slot", "8836477721");
  insElement.setAttribute("data-ad-format", "auto");
  insElement.setAttribute("data-full-width-responsive", "true");

  var scriptElement2 = document.createElement("script");
  scriptElement2.innerHTML =
    "(adsbygoogle = window.adsbygoogle || []).push({});";
  // Append the ins element to the document's body or any other desired location
  container_small.appendChild(scriptElement);
  container_small.appendChild(insElement);
  container_small.appendChild(scriptElement2);

  //button_close
  var btnNetlinkClose = document.createElement("img");
  btnNetlinkClose.style.position = "absolute";
  btnNetlinkClose.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/in_image/close.png";
  btnNetlinkClose.style.zIndex = 1;

  btnNetlinkClose.style.setProperty("width", "35px", "important");
  btnNetlinkClose.style.setProperty("height", "35px", "important");
  btnNetlinkClose.style.setProperty("right", "0px", "important");
  btnNetlinkClose.style.setProperty("bottom", "0px", "important");

  btnNetlinkClose.style.cursor = "pointer";
  btnNetlinkClose.style.animationName = "btnClose";
  btnNetlinkClose.style.animationDuration = "0.5s";
  btnNetlinkClose.style.animationTimingFunction = "ease-in-out";

  // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg

  // container_small.appendChild(newImage);

  container_small.appendChild(btnNetlinkClose);

  //add------------------------
  

  // container_larg.appendChild(images[1].cloneNode(true));
  // images[1].parentNode.replaceChild(container_larg, images[1]);
  // console.log(images[1].src);

  setTimeout(function () {
    container_larg.appendChild(images[1].cloneNode(true));
    container_larg.appendChild(container_small);
    images[1].parentNode.replaceChild(container_larg, images[1]);
    console.log(images[1].src);
    console.log("ss");
  }, 3000);

  btnNetlinkClose.addEventListener("click", () => {
    container_larg.removeChild(container_small);
  });
};
