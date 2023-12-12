var MastheadNetlink = function (imgMathead_src, aMathead_src) {
  var body = window.top.document.querySelector("body");
//   console.log(body);

  var cssMathead = document.createElement("link");
  cssMathead.href = 
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/Masthead/masthead.css";
  cssMathead.rel = "stylesheet";
  body.appendChild(cssMathead);

  var classMathead = document.createElement("div");
  classMathead.classList.add("masthead");
  var aMathead = document.createElement("a");
  aMathead.href = aMathead_src;
  var imgMathead = document.createElement("img");
  imgMathead.src = imgMathead_src;
  // "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/Masthead/video_netlink-cut.gif";
  imgMathead.alt = "masthead";
  aMathead.appendChild(imgMathead);
  classMathead.appendChild(aMathead);

  body.insertBefore(classMathead, body.firstChild);
};
