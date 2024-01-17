var InImageTinmoiNetlink = function (intImage) {
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
    // container_small.style.backgroundColor = "white";
    container_small.style.setProperty(
      "width",
      images[intImage].width + "px",
      "important"
    );
    container_small.style.setProperty("min-height", "300px", "important");
    container_small.style.setProperty("height", "auto", "important");
  
    container_larg.style.position = "relative";
    container_larg.style.display = "inline-block";
  
    container_larg.style.setProperty(
      "width",
      images[intImage].width + "px",
      "important"
    );
    container_larg.style.setProperty(
      "height",
      images[intImage].height + "px",
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
    //   insElement.className = "adsbygoogle";
    insElement.style.display = "block";
    insElement.setAttribute("data-ad-client", "ca-pub-3166493188367342");
    insElement.setAttribute("data-ad-slot", "8836477721");
    insElement.setAttribute("data-ad-format", "auto");
    insElement.setAttribute("data-full-width-responsive", "true");
  
    var scriptElement2 = document.createElement("script");
    scriptElement2.innerHTML =
      "(adsbygoogle = window.adsbygoogle || []).push({});";
    // Append the ins element to the document's body or any other desired location
    _head.appendChild(scriptElement);
    container_small.appendChild(insElement);
    container_small.appendChild(scriptElement2);
  
    //button_close
    var btnNetlinkClose = document.createElement("img");
    btnNetlinkClose.style.position = "absolute";
    btnNetlinkClose.src =
      "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/in_image/hidden.png";
    btnNetlinkClose.style.zIndex = 1;
  
    btnNetlinkClose.style.setProperty("width", "20px", "important");
    btnNetlinkClose.style.setProperty("height", "20px", "important");
    btnNetlinkClose.style.setProperty("right", "0px", "important");
    btnNetlinkClose.style.setProperty("top", "-25px", "important");
  
    btnNetlinkClose.style.cursor = "pointer";
    btnNetlinkClose.style.animationName = "btnClose";
    btnNetlinkClose.style.animationDuration = "0.5s";
    btnNetlinkClose.style.animationTimingFunction = "ease-in-out";
  
    // Chèn hình ảnh đầu tiên và hình ảnh mới vào container_larg
  
    // container_small.appendChild(newImage);images[intImage]
  
    container_small.appendChild(btnNetlinkClose);
  
    //add------------------------
  
    // container_larg.appendChild(images[intImage].cloneNode(true));
    // images[intImage].parentNode.replaceChild(container_larg, images[intImage]);
    // console.log(images[intImage].src);
    function isImageFile(str) {
      return /\.(jpg|jpeg|png)$/i.test(str);
    }
    var intervalId = setInterval(() => {
      if (isImageFile(images[intImage].src)) {
        container_larg.appendChild(images[intImage].cloneNode(true));
        container_larg.appendChild(container_small);
        images[intImage].parentNode.replaceChild(
          container_larg,
          images[intImage]
        );
        insElementQr();
        clearInterval(intervalId);
      } else {
        console.log("b64");
      }
    }, 1000);
    // Lấy thẻ ins
    var insElement = document.querySelector("ins.adsbygoogle");
  
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
          } else {
            console.error("Không tìm thấy phần tử body trong iframe.");
          }
        } else {
          console.error("Không thể truy cập document trong iframe.");
        }
      } else {
        console.error("Không tìm thấy iframe trong thẻ ins.");
      }
    }
  
    btnNetlinkClose.addEventListener("click", () => {
      container_larg.removeChild(container_small);
    });
  };
  