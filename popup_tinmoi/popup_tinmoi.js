var PopUpFirstView = function () {
  var body = window.top.document.querySelector("body");
  var _head = window.top.document.querySelector("head");

  var cssMobileInPage = `
.mobile_inpage {
    width: 100% !important;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10000000;
    text-align: center;
    opacity: 0;
    display: none;
    animation-name: fadeIn;
    animation-duration: 1s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
  }
  .mobileInpage-deletebtn {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20%;
    cursor: pointer;
  }
  #divbtndeltete{
    position: absolute;
    top: 0px;
    width: 100% !important;
    height: 60px !important;
    background-color: red;
  }
  .mobileInpage-deletebtn img {
    height: 20px !important;
    width: 20px !important;
  }
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

  var styleElement = document.createElement("style");
  styleElement.innerHTML = cssMobileInPage;

  // Tạo phần tử div chứa hình ảnh
  var mobileinpageElement = document.createElement("div");
  mobileinpageElement.classList.add("mobile_inpage");

  // Create the script element
  var scriptElementAds = document.createElement("script");
  scriptElementAds.src =
    "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3166493188367342";
  scriptElementAds.async = true;
  scriptElementAds.crossOrigin = "anonymous";

  // Append the script element to the document's head

  // Create the ins element
  var insElement = document.createElement("ins");
  insElement.className = "adsbygoogle";
  //   insElement.className = "adsbygoogle";
  insElement.style.display = "block";
  insElement.setAttribute("data-ad-client", "ca-pub-3166493188367342");
  insElement.setAttribute("data-ad-slot", "6296231830");
  insElement.setAttribute("data-ad-format", "auto");
  insElement.setAttribute("data-full-width-responsive", "true");

  var scriptElementAds2 = document.createElement("script");
  scriptElementAds2.innerHTML =
    "(adsbygoogle = window.adsbygoogle || []).push({});";
  // Append the ins element to the document's body or any other desired location
  _head.appendChild(scriptElementAds);

  // Tạo nút xóa

  var btndeltete = document.createElement("button");
  btndeltete.id = "btndeltete";
  btndeltete.classList.add("mobileInpage-deletebtn");

  var imgbtndeltete = document.createElement("img");
  imgbtndeltete.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_inpage/close.png";
  btndeltete.appendChild(imgbtndeltete);

  mobileinpageElement.appendChild(btndeltete);
  mobileinpageElement.appendChild(insElement);
  mobileinpageElement.appendChild(scriptElementAds2);

  // Tạo một phần tử div mới
  body.appendChild(styleElement);
  body.appendChild(mobileinpageElement);
  var insElement = document.querySelector('ins[data-ad-slot="6296231830"]');
  var intervalId = setInterval(function() {
    if (insElement) {
      console.log(insElement.height);
      insElementQr();
      // clearInterval(intervalId);
    } else {
      insElement = document.querySelector('ins[data-ad-slot="6296231830"]');
    }
  }, 1000);

  // Kiểm tra xem thẻ ins có tồn tại không
  function insElementQr() {
    // Truy cập thẻ iframe con trong thẻ ins
    var iframeElement = insElement.querySelector("iframe");

    // Kiểm tra xem iframe có tồn tại không
    if (iframeElement) {
      // Truy cập document trong iframe
      var iframeDocument =
        iframeElement.contentDocument || iframeElement.contentWindow.document;

      // Kiểm tra xem document trong iframe có tồn tại không
      if (iframeDocument) {
        // Truy cập phần tử body trong iframe
        var iframeBody = iframeDocument.body;

        // Kiểm tra xem phần tử body có tồn tại không
        if (iframeBody) {
          // Bạn có thể thực hiện các thao tác mong muốn trên phần tử body ở đây
          console.log("Đã truy cập đến phần tử body trong iframe:", iframeBody);
          clearInterval(intervalId);
        } else {
          console.error("Không tìm thấy phần tử body trong iframe.");
        }
      } else {
        setTimeout(function () {
          clearInterval(intervalId);
        }, 5000);
        console.error("Không thể truy cập document trong iframe.");
      }
    } else {
      console.error("Không tìm thấy iframe trong thẻ ins.");
    }
  }

  if (window.innerWidth <= 768) {
    mobileinpageElement.style.setProperty("display", "block", "important");
    setTimeout(function () {
      mobileinpageElement.style.opacity = "1";
    }, 1000);
    console.log(window.innerWidth);
  } else {
    mobileinpageElement.style.setProperty("display", "none", "important");
  }

  window.addEventListener("scroll", function () {
    mobileinpageElement.style.height = window.innerHeight + "px";
  });

  btndeltete.addEventListener("click", () => {
    mobileinpageElement.remove();
    console.log("okeke");
  });
};
