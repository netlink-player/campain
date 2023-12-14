var MobilePullNetlink = function (
  image_MobilePull_src,
  imagebt_MobilePull_src,
  aMobilePull_src
) {
  var body = window.top.document.querySelector("body");

  var cssMobilePull = `
    .mobile_pull {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 100000;
        text-align: center;
        opacity: 0;
        animation-name: fadeIn;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
      }
      #imagePull {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: translateY(100%);
      }
      .imagePull-tranform {
        animation-name: imagePullslideDown;
        animation-duration: 1s;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes imagePullslideDown {
        from {
          transform: translateY(100%);
        }
        to {
          transform: translateY(0%);
        }
      }

      #imagebtPullContainer {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0%);
        animation: imagebtPull-move 2s ease-in-out forwards;
      }
      #imagebtPull {
        width: 100% !important;
        height: auto !important;
      }
      @keyframes imagebtPull-move {
        0% {
          transform: translate(-50%, 0%);
        }
        100% {
          transform: translate(-50%, -100%);
        }
      }
      @keyframes imagebtPull-remove {
        0% {
          transform: translate(-50%, -100%);
        }
        100% {
          transform: translate(-50%, 0%);
        }
      }

      #mobilePull-deletebtn {
        position: absolute;
        right: 10px;
        z-index: 999;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 20%;
        cursor: pointer;
        bottom: 3%;
        right: 2%;
        opacity: 0;
        animation: btnDelete 2s ease-in-out forwards;
      }
      #mobilePull-deletebtn img {
        height: 20px !important;
        width: 20px !important;
      }
      @keyframes btnDelete {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }

      /* //----------------------- */
      #scrollButton {
        position: absolute;
        left: 50%;
        transform: translate(-50%, 0%);
        bottom: 10%;
        height: 40px;
        width: 40px;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 100%;
        cursor: pointer;
        opacity: 0;
        animation: bounce 2s infinite forwards;
        transition: all 0.2s ease-in;
      }
      #scrollButton img {
        height: 20px !important;
        width: 20px !important;
      }
      @keyframes bounce {
        0%,
        20%,
        50%,
        80%,
        100% {
          transform: translate(-50%, 0);
        }
        40% {
          transform: translate(-50%, -10px);
        }
        60% {
          transform: translate(-50%, -5px);
        }
      }
  `;

  //stye--------------
  var styleElement = document.createElement("style");
  styleElement.innerHTML = cssMobilePull;

  body.appendChild(styleElement);

  //-------------------------------js

  // Tạo phần tử div có class "mobile_pull" và id "mobileinpageElement"
  var mobilePullDiv = document.createElement("div");
  mobilePullDiv.classList.add("mobile_pull");
  mobilePullDiv.id = "mobileinpageElement";

  // Tạo phần tử a đầu tiên và thiết lập thuộc tính href
  var firstAnchor = document.createElement("a");
  firstAnchor.href = aMobilePull_src;

  // Tạo phần tử img cho firstAnchor và thiết lập thuộc tính src và alt
  var firstImage = document.createElement("img");
  firstImage.id = "imagePull";
  firstImage.src = image_MobilePull_src;
  firstImage.alt = "Hình ảnh";

  // Gắn firstImage vào firstAnchor
  firstAnchor.appendChild(firstImage);

  // Thêm firstAnchor vào mobilePullDiv
  mobilePullDiv.appendChild(firstAnchor);

  // Tạo phần tử a thứ hai và thiết lập thuộc tính href
  var secondAnchor = document.createElement("a");
  secondAnchor.href = aMobilePull_src;

  // Tạo phần tử div có id "imagebtPullContainer"
  var divImagebtPullContainer = document.createElement("div");
  divImagebtPullContainer.id = "imagebtPullContainer";

  // Tạo phần tử img cho divImagebtPullContainer và thiết lập thuộc tính src và alt
  var secondImage = document.createElement("img");
  secondImage.id = "imagebtPull";
  secondImage.src = imagebt_MobilePull_src;
  secondImage.alt = "Hình ảnh";

  // Gắn secondImage vào divImagebtPullContainer
  divImagebtPullContainer.appendChild(secondImage);

  // Thêm divImagebtPullContainer vào secondAnchor
  secondAnchor.appendChild(divImagebtPullContainer);

  // Thêm secondAnchor vào mobilePullDiv
  mobilePullDiv.appendChild(secondAnchor);

  // Tạo phần tử button có id "mobileRevolver-deletebtn"
  var deleteButton = document.createElement("button");
  deleteButton.id = "mobilePull-deletebtn";

  // Tạo phần tử img cho deleteButton và thiết lập thuộc tính src
  var deleteButtonImage = document.createElement("img");
  deleteButtonImage.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_pull/close.png";

  // Gắn deleteButtonImage vào deleteButton
  deleteButton.appendChild(deleteButtonImage);

  // Thêm deleteButton vào mobilePullDiv
  mobilePullDiv.appendChild(deleteButton);

  // Tạo phần tử button có id "scrollButton"
  var scrollButton = document.createElement("button");
  scrollButton.id = "scrollButton";

  // Tạo phần tử img cho scrollButton và thiết lập thuộc tính src
  var scrollButtonImage = document.createElement("img");
  scrollButtonImage.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_pull/uparrow.png";

  // Gắn scrollButtonImage vào scrollButton
  scrollButton.appendChild(scrollButtonImage);

  // Thêm scrollButton vào mobilePullDiv
  mobilePullDiv.appendChild(scrollButton);

  // Thêm mobilePullDiv vào body

  body.appendChild(mobilePullDiv);

  if (window.innerWidth <= 768) {
    mobilePullDiv.style.setProperty("display", "block", "important");
    setTimeout(function () {
      scrollButton.classList.add("scroll-up-bounce");
      scrollButton.style.opacity = 1;
    }, 2500);
  } else {
    mobilePullDiv.style.setProperty("display", "none", "important");
  }
  window.addEventListener("scroll", function () {
    mobilePullDiv.style.height = window.innerHeight + "px";
  });
  deleteButton.addEventListener("click", () => {
    mobilePullDiv.style.display = "none";
  });
  scrollButton.addEventListener("click", () => {
    setTimeout(function () {
      firstImage.classList.add("imagePull-tranform");
    }, 1000);
    divImagebtPullContainer.style.animation =
      "imagebtPull-remove 1s ease-in-out forwards";
    scrollButton.style.opacity = 0;
  });
};
