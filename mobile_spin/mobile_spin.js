var MobileSpinNetlink = function (
  arrimage_MobileSpin_src,
  imagebt_MobileSpin_src,
  aMobileSpin_src
) {
  var body = window.top.document.querySelector("body");

  var cssMobileSpin = `
    .mobile_spin {
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
      #imageSpin {
        width: 100%;
        height: 100%;
        opacity: 0;
        object-fit: cover;
        /* transition: fadeIn 3s ease-in-out; */
      }
      .imageSpin-opacity {
        animation-name: fadeIn;
        animation-duration: 2s;
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
      @keyframes imageSpinslideDown {
        from {
          transform: translateY(0%);
        }
        to {
          transform: translateY(100%);
        }
      }

      #imagebtSpinContainer {
        position: absolute;
        width: 100%;
        left: 50%;
        z-index: 999;
        animation: imagebtSpinContainer-move 1s ease-in-out forwards;
        transform: translate(-50%, 0%);
      }
      #imagebtSpin {
        width: 300px !important;
        height: 300px !important;
        transition: transform 1s ease-in-out;
      }
      @keyframes imagebtSpinContainer-move {
        0% {
          transform: translate(-50%, 0%);
        }
        100% {
          transform: translate(-50%, -50%);
        }
      }
      #mobileRevolver-deletebtn {
        position: absolute;
        right: 10px;
        z-index: 1000;
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
  styleElement.innerHTML = cssMobileSpin;

  body.appendChild(styleElement);

  //-------------------------------js

  var MobileSpinDiv = document.createElement("div");
  MobileSpinDiv.classList.add("mobile_spin");
  MobileSpinDiv.id = "mobilespinElement";

  

  // Tạo phần tử img trong phần tử a
  const imageElement = document.createElement("img");
  imageElement.id = "imageSpin";
  imageElement.src = arrimage_MobileSpin_src[0];
  imageElement.alt = "Hình ảnh";

  // Gắn phần tử img vào phần tử a
  

  // Gắn phần tử a vào phần tử cha
  MobileSpinDiv.appendChild(imageElement);

  // Tạo phần tử div
  const imagebtSpinContainer = document.createElement("div");
  imagebtSpinContainer.id = "imagebtSpinContainer";

  // Tạo phần tử img trong phần tử div
  const imagebtSpinElement = document.createElement("img");
  imagebtSpinElement.id = "imagebtSpin";
  imagebtSpinElement.src = imagebt_MobileSpin_src;
  imagebtSpinElement.alt = "Hình ảnh";

  // Tạo phần tử a
  const linkElement = document.createElement("a");
  linkElement.href = "https://netlink.vn/";
  linkElement.appendChild(imagebtSpinElement);

  // Gắn phần tử img vào phần tử div
  imagebtSpinContainer.appendChild(linkElement);

  // Gắn phần tử div vào phần tử cha
  MobileSpinDiv.appendChild(imagebtSpinContainer);

  // Tạo nút button
  const deleteButton = document.createElement("button");
  deleteButton.id = "mobileRevolver-deletebtn";

  // Tạo phần tử img trong nút button
  const closeButton = document.createElement("img");
  closeButton.src =
    "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/mobile_revolver/close.png";

  // Gắn phần tử img vào nút button
  deleteButton.appendChild(closeButton);

  // Gắn nút button vào phần tử cha
  MobileSpinDiv.appendChild(deleteButton);

  body.appendChild(MobileSpinDiv);

  if (window.innerWidth <= 768) {
    MobileSpinDiv.style.setProperty("display", "block", "important");

    handeleRevolver();
    setTimeout(function () {
      //   mobilespinElement.style.opacity = "1";
    }, 1000);
  } else {
    MobileSpinDiv.style.setProperty("display", "none", "important");
  }

  window.addEventListener("scroll", function () {
    MobileSpinDiv.style.height = window.innerHeight + "px";
  });

  deleteButton.addEventListener("click", () => {
    MobileSpinDiv.style.display = "none";
  });

  function handeleRevolver() {
    setTimeout(function () {
      deleteButton.classList.add("mobileRevolver-deletebtn-tranform");
    }, 1000);
  }

  var startX, startY;
  var minDistance = 50;
  var isSwiping = false;
  let rotation = 0;
  let index_image = 0;
  var arr_image = arrimage_MobileSpin_src;
  function getImage() {
    imageElement.src = arr_image[index_image];
    imagebtSpinElement.style.transform = `rotate(${rotation}deg)`;
    imageElement.classList.add("imageSpin-opacity");
    setTimeout(() => {
      imageElement.classList.remove("imageSpin-opacity");
    }, 1000);
    index_image++;
    if (index_image >= arr_image.length) {
      index_image = 0; // Quay vòng trở lại phần tử đầu tiên
    }
  }

  imagebtSpinElement.addEventListener("mousedown", function (event) {
    startX = event.pageX;
    startY = event.pageY;
    isSwiping = false;
    rotation += 90;
    imageElement.style.opacity = 1;
    getImage();
  });
  imagebtSpinElement.addEventListener("mousemove", function (event) {
    if (!isSwiping) {
      var deltaX = Math.abs(event.pageX - startX);
      var deltaY = Math.abs(event.pageY - startY);
      if (deltaX >= minDistance || deltaY >= minDistance) {
        isSwiping = true;
      }
    }
  });
  imagebtSpinElement.addEventListener("mouseup", function (event) {});
  imagebtSpinElement.addEventListener("mouseleave", function (event) {});
};
