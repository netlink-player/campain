var MobileRevolverNetlink = function (
  image_mobilerevolver_src,
  imagebt_mobilerevolver_src,
  amobilerevolver_src
) {
  var body = window.top.document.querySelector("body");

  var cssMobileRevolver = `
  .mobile_revolver {
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
  #imageRevolver {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .imageRevolver-tranform {
    animation-name: imageRevolverslideDown;
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
  @keyframes imageRevolverslideDown {
    from {
      transform: translateY(0%);
    }
    to {
      transform: translateY(100%);
    }
  }

  #imagebtRevolverContainer {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  #imagebtRevolver {
    width: 300px !important;
    height: 300px !important;
  }
  @keyframes imagebtRevolver-move {
    0% {
      transform: translate(-50%, 0%);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }
  @keyframes imagebtRevolver-rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  #mobileRevolver-deletebtn {
    position: absolute;
    right: 10px;
    z-index: 999;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20%;
    cursor: pointer;
    bottom: 100px;
    opacity: 0;
  }
  #mobileRevolver-deletebtn img {
    height: 20px !important;
    width: 20px !important;
  }
  .mobileRevolver-deletebtn-tranform {
    animation-name: btnDelete;
    animation-duration: 2s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
  }
  @keyframes btnDelete {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

  //stye--------------
  var styleElement = document.createElement("style");
  styleElement.innerHTML = cssMobileRevolver;

  body.appendChild(styleElement);

  // Tạo phần tử div có lớp CSS "mobile_revolver" và ID "mobileRevolverDiv"
  var mobileRevolverDiv = document.createElement("div");
  mobileRevolverDiv.classList.add("mobile_revolver");
  mobileRevolverDiv.id = "mobileRevolverDiv";

  // Tạo phần tử a và thiết lập thuộc tính href
  var linkA = document.createElement("a");
  linkA.href = amobilerevolver_src;

  // Tạo phần tử img và thiết lập các thuộc tính src và alt
  var imgElement = document.createElement("img");
  imgElement.id = "imageRevolver";
  imgElement.src = image_mobilerevolver_src;
  imgElement.alt = "Hình ảnh";

  // Gắn phần tử img vào phần tử a
  linkA.appendChild(imgElement);

  // Gắn phần tử a vào phần tử div
  mobileRevolverDiv.appendChild(linkA);

  // Tạo phần tử a thứ hai và thiết lập thuộc tính href
  var linkA2 = document.createElement("a");
  linkA2.href = amobilerevolver_src;

  // Tạo phần tử div có ID "imagebtRevolverContainer"
  var divElement = document.createElement("div");
  divElement.id = "imagebtRevolverContainer";

  // Tạo phần tử img có ID "imagebtRevolver" và thiết lập thuộc tính src và alt
  var imgElement2 = document.createElement("img");
  imgElement2.id = "imagebtRevolver";
  imgElement2.src = imagebt_mobilerevolver_src;
  imgElement2.alt = "Hình ảnh";

  // Gắn phần tử img vào phần tử div
  divElement.appendChild(imgElement2);

  // Gắn phần tử div vào phần tử a thứ hai
  linkA2.appendChild(divElement);

  // Gắn phần tử a thứ hai vào phần tử div chính
  mobileRevolverDiv.appendChild(linkA2);

  // Tạo phần tử button có ID "mobileRevolver-deletebtn"
  var buttonElement = document.createElement("button");
  buttonElement.id = "mobileRevolver-deletebtn";

  // Tạo phần tử img và thiết lập thuộc tính src
  var imgElement3 = document.createElement("img");
  imgElement3.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_revolver/close.png";

  // Gắn phần tử img vào phần tử button
  buttonElement.appendChild(imgElement3);

  // Gắn phần tử button vào phần tử div chính
  mobileRevolverDiv.appendChild(buttonElement);

  // Gắn phần tử div chính vào phần tử body của tài liệu
  body.appendChild(mobileRevolverDiv);

  //-------------------------------js

  if (window.innerWidth <= 768) {
    mobileRevolverDiv.style.setProperty("display", "block", "important");
    setTimeout(function () {
      mobileRevolverDiv.style.opacity = "1";
      setTimeout(() => {
        handeleRevolver();
      }, 1000);
    }, 1000);
  } else {
    mobileRevolverDiv.style.setProperty("display", "none", "important");
  }

  window.addEventListener("scroll", function () {
    mobileRevolverDiv.style.height = window.innerHeight + "px";
  });

  buttonElement.addEventListener("click", () => {
    mobileRevolverDiv.style.display = "none";
  });

  function handeleRevolver() {
    setTimeout(function () {
      imgElement.classList.add("imageRevolver-tranform");
      divElement.style.animation =
        "imagebtRevolver-move 2s ease-in-out forwards";
      buttonElement.classList.add("mobileRevolver-deletebtn-tranform");
      setTimeout(function () {
        imgElement2.style.animation =
          "imagebtRevolver-rotate 5s infinite ease-in-out";
      }, 2500);
    }, 1000);
  }
};
