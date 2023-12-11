window.googletag = window.googletag || { cmd: [] };
googletag.cmd.push(function () {
    googletag
        .defineSlot(
            "/93656639/300x250_campaign",
            [300, 250],
            "div-gpt-ad-1693468092398-0"
        )
        .addService(googletag.pubads());
    googletag.pubads().enableSingleRequest();
    googletag.enableServices();
});
var bannerAfter = document.getElementById("bannerAfter");
var closeBanner = document.getElementById("closeBanner");
var idAdUnit = document.createElement("div");
idAdUnit.id = "div-gpt-ad-1693468092398-0";
bannerAfter.appendChild(idAdUnit);
var isClose = false;
googletag.cmd.push(function () {
    googletag.display("div-gpt-ad-1693468092398-0");
    googletag.pubads().addEventListener("slotOnload", (event) => {
        closeBanner.style.display = "block";
    });
});
closeBanner.addEventListener("click", function () {
    if (isClose) {
        closeBanner.title = "Hidden";
        closeBanner.innerHTML = "&#711;";
        bannerAfter.classList.remove("bannerAfterClose--transition");
        closeBanner.classList.remove("closeBanner--transition");
    } else {
        closeBanner.title = "Show";
        closeBanner.innerHTML = "&#710;";
        bannerAfter.classList.add("bannerAfterClose--transition");
        closeBanner.classList.add("closeBanner--transition");
    }
    isClose = !isClose;
});