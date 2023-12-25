var MastheadFullNetlink = function (imgMathead_src, aMathead_src) {
  var body = window.top.document.querySelector("body");

  var cssMastheadFull = `@charset "utf-8";

  body {
      background-color: #ececec;
  }
  
  .masthead {
      position: relative;
      width: 100%;
      height: auto;
  }
  
  .masthead iframe {
      width: 100%;
      height: 100%;
      position: absolute;
  }
  
  img,
  object,
  embed,
  video {
      max-width: 100%;
  }
  
  .ie6 img {
      width: 100%;
  }
  
  @media (max-width: 767px) {
      .masthead {
          /* display: none; */
      }
  }
  `;
  //   console.log(body);

  var styleElement = document.createElement("style");
  styleElement.innerHTML = cssMastheadFull;

  body.appendChild(styleElement);

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
