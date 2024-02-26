var MastheadNetlink = function () {
  var body = window.top.document.querySelector("body");

  // Tạo phần tử div
  var divVibMasthead = document.createElement("div");
  divVibMasthead.id = "div-gpt-ad-1708917487048-0";
  divVibMasthead.style.minWidth = "1120px";
  divVibMasthead.style.minHeight = "250px";

  // Tạo phần tử script
  var script = document.createElement("script");
  script.innerHTML =
    "googletag.cmd.push(function() { googletag.display('div-gpt-ad-1708917487048-0'); });";

  // Gắn phần tử script vào phần tử div
  divVibMasthead.appendChild(script);

  // Tìm phần tử cha để thêm phần tử div vào
  var vibMasthead = document.createElement("div");
  vibMasthead.id = "vibMasthead";
  vibMasthead.style.display = "flex";
  vibMasthead.style.position = "relative";
  vibMasthead.style.justifyContent = "center";
  vibMasthead.style.alignItems = "center";

  // Thêm phần tử div vào phần tử cha
  vibMasthead.appendChild(divVibMasthead);

  body.insertBefore(vibMasthead, body.firstChild);
};
