var body = document.querySelector("body");

var cssMathead = document.createElement("link");
cssMathead.href =
  "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/Masthead/masthead.css";
cssMathead.rel = "stylesheet";
body.appendChild(cssMathead);

var classMathead = document.createElement("div");
classMathead.classList.add("masthead");
var aMathead = document.createElement("a");
aMathead.href = "https://netlink.vn/";
var imgMathead = document.createElement("img");
imgMathead.src =
  "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/Masthead/video_netlink-cut.gif";
imgMathead.alt = "masthead";
aMathead.appendChild(imgMathead);
classMathead.appendChild(aMathead);

body.appendChild(classMathead);
