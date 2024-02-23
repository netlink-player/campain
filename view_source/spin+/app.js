let aiactivAppsSpinAd;

function initSpinCreative(country, salesModel) {
  aiactivAppsSpinAd = new AiActivAppsSpinPlus(
    "aiactiv-apps-invitation-content",
    {
      sectorChangedCallback: sectorChanged,
      autoSpinEnded: autoSpinAnimateEnded,
      autoSpinDirection: "clockwise",
      sector: 4,
      sectorClickedCallback: aiactivAppsPostSectorClickToProxy,
      country: country,
      salesModel: salesModel,
    }
  );
  aiactivAppsSpinAd.startAutoAnimation();

  // Append Animation Timeline
  appendTimeline(slideAnimation1);
  appendTimeline(slideAnimation2);
  appendTimeline(slideAnimation3);
  appendTimeline(slideAnimation4);
}

function autoSpinAnimateEnded() {
  sectorChanged(1, "clockwise");
}

function sectorChanged(landedIndex, spinDirection) {
  switch (landedIndex) {
    case 1:
      startTween(0);
      stopTween(1);
      stopTween(2);
      stopTween(3);
      break;
    case 2:
      stopTween(0);
      startTween(1);
      stopTween(2);
      stopTween(3);
      break;
    case 3:
      stopTween(0);
      stopTween(1);
      startTween(2);
      stopTween(3);
      break;
    case 4:
      stopTween(0);
      stopTween(1);
      stopTween(2);
      startTween(3);
      break;
  }
}

function slideAnimation1() {
  this.getFrame = fn;
  var frame = new TimelineMax({
    paused: true,
  });

  function fn() {
    return frame;
  }

  //frame.fromTo('.h', 1, {height:'0%',opacity:0}, {height:'29.8%', opacity:1, ease:SteppedEase.config(10)});
}

function slideAnimation2() {
  this.getFrame = fn;
  var frame = new TimelineMax({
    paused: true,
  });

  function fn() {
    return frame;
  }

  //frame.fromTo('.m', 1, {height:'0%',opacity:0}, {height:'30.3%', opacity:1, ease:SteppedEase.config(10)});
}

function slideAnimation3() {
  this.getFrame = fn;
  var frame = new TimelineMax({
    paused: true,
  });

  function fn() {
    return frame;
  }

  //frame.fromTo('.t', 1, {height:'0%',opacity:0}, {height:'27.7%', opacity:1, ease:SteppedEase.config(10)});
}

function slideAnimation4() {
  this.getFrame = fn;
  var frame = new TimelineMax({
    paused: true,
  });

  function fn() {
    return frame;
  }

  //frame.fromTo('.t', 1, {height:'0%',opacity:0}, {height:'27.7%', opacity:1, ease:SteppedEase.config(10)});
}

// ====== Timeline Template ======

var bannerTweens = [];

function appendTimeline(fn) {
  if (typeof fn !== "function") {
    return;
  }
  var tl = new fn();
  bannerTweens.push(tl);
}

function startTween(t) {
  var total = bannerTweens.length - 1;
  if (total < t) {
    return;
  }
  if (typeof bannerTweens[t].getFrame().restart !== "function") {
    return;
  }
  bannerTweens[t].getFrame().seek(0);
  bannerTweens[t].getFrame().play();
}

function stopTween(t) {
  var total = bannerTweens.length - 1;
  if (total < t) {
    return;
  }
  if (typeof bannerTweens[t].getFrame().pause !== "function") {
    return;
  }
  bannerTweens[t].getFrame().pause();
  bannerTweens[t].getFrame().seek(0);
}
