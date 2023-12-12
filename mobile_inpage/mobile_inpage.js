var MobileInPageNetlink = function (
  image_mobileinpage_src,
  video_mobileinpage_src,
  amobileinpage_src
) {
  var body = window.top.document.querySelector("body");

  var cssMobileInPage = `
.mobile_inpage {
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
  /* Hình ảnh tràn khắp màn hình */
  .mobile_inpage img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Video nằm ở giữa hình ảnh */
  .mobile_inpage video {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 100%;
    max-height: 100%;
  }
  .delete-button {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 999;
    font-size: 20px;
    background: yellow;
    border: none;
    border-radius: 20%;
    cursor: pointer;
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

  var img = document.createElement("img");
  img.src = image_mobileinpage_src;
  img.alt = "Hình ảnh";

  var linkElement = document.createElement("a");
  linkElement.href = amobileinpage_src;
  linkElement.appendChild(img);

  // Tạo phần tử video
  var video = document.createElement("video");
  video.src = video_mobileinpage_src;
  video.controls = true;
  video.autoplay = true;
  video.muted = true;
  video.style.setProperty("width", "240px", "important");
  video.style.height = "auto";

  // Tạo nút xóa
  var btndeltete = document.createElement("button");
  btndeltete.id = "btndeltete";
  btndeltete.classList.add("delete-button");
  btndeltete.innerHTML = "&#10005;";

  mobileinpageElement.appendChild(linkElement);
  mobileinpageElement.appendChild(video);
  mobileinpageElement.appendChild(btndeltete);

  // Tạo một phần tử div mới
  body.appendChild(styleElement);
  body.appendChild(mobileinpageElement);

  if (window.innerWidth >= 768) {
    mobileinpageElement.style.display = "none";
  }
  setTimeout(function () {
    mobileinpageElement.style.opacity = "1";
  }, 1000);
  window.addEventListener("scroll", function () {
    mobileinpageElement.style.height = window.innerHeight + "px";
  });

  btndeltete.addEventListener("click", () => {
    mobileinpageElement.style.display = "none";
  });
};
