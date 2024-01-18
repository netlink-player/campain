var MobileCardNetlink = function () {
  var _body = window.top.document.querySelector("body");
  var _head = window.top.document.querySelector("head");

  // Tạo thẻ <link>
  var linkElement = document.createElement("link");
  linkElement.setAttribute(
    "href",
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/mobile_card.css"
  );
  linkElement.setAttribute("rel", "stylesheet");

  // Tạo thẻ <script>
  var scriptElement = document.createElement("script");
  scriptElement.setAttribute(
    "src",
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_card/mobile_card.js"
  );

  // Tạo phần tử <script>
  var scriptElementText = document.createElement("script");
  scriptElementText.textContent = "let innityAppsIsPreview = true;";

  // Thêm thẻ <link> và <script> vào phần tử <head>
  _head.appendChild(linkElement);
  _head.appendChild(scriptElement);
  _head.appendChild(scriptElementText);

  // Tạo một thẻ div với id "innity-apps-ad"
  var divInnityAppsAd = document.createElement("div");
  divInnityAppsAd.id = "innity-apps-ad";

  // Tạo một thẻ div với id "innity-apps-banner-content"
  var divInnityAppsBannerContent = document.createElement("div");
  divInnityAppsBannerContent.id = "innity-apps-banner-content";

  // Thêm thẻ div "innity-apps-banner-content" vào thẻ div "innity-apps-ad"
  divInnityAppsAd.appendChild(divInnityAppsBannerContent);

  var btnNetlinkClose = document.createElement("img");
  btnNetlinkClose.style.position = "absolute";
  btnNetlinkClose.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/in_image/close.png";
  btnNetlinkClose.style.zIndex = 1;
  // btnNetlinkClose.style.width = "50px";
  // btnNetlinkClose.style.height = "50px";
  // btnNetlinkClose.style.right = "10px";
  // btnNetlinkClose.style.bottom = "80px";

  btnNetlinkClose.style.setProperty("width", "50px", "important");
  btnNetlinkClose.style.setProperty("height", "50px", "important");
  btnNetlinkClose.style.setProperty("right", "10px", "important");
  btnNetlinkClose.style.setProperty("bottom", "100px", "important");

  btnNetlinkClose.style.cursor = "pointer";

  divInnityAppsAd.appendChild(btnNetlinkClose);

  _body.appendChild(divInnityAppsAd);
  btnNetlinkClose.addEventListener("click", function () {
    divInnityAppsAd.remove();
  });
};
