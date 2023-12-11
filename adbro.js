var adbro_init_function = function (w, d, undefined) {
  let adbro = window["adbro"];
  if (w.hasOwnProperty("adbro")) adbro = w["adbro"];
  let config = adbro.config || {};
  adbro.slot = adbro.slot || adbro.publisher;
  config.endpoint = config.endpoint || "https://apis.adbro.me/api/";
  config.preview =
    config.preview || w.location.hash.indexOf("#adbro_preview") === 0;
  config.panelEnabled = true;
  config.gaEnabled = true;
  config.selectors = config.selectors || {};
  config.selectors.images = config.selectors.images || "img[data-adbro=true]";
  config.selectors.title = config.selectors.title || "h1";
  config.ssp = config.ssp || {};
  config.functions = config.functions || {};
  config.functions.onLoad = config.functions.onLoad || function () {};
  config.functions.onPlaceholderSized =
    config.functions.onPlaceholderSized || function () {};
  config.functions.onInventoryHit =
    config.functions.onInventoryHit || function () {};
  config.functions.onInventoryImpression =
    config.functions.onInventoryImpression || function (img, div, data) {};
  config.functions.onInventoryClick =
    config.functions.onInventoryClick || function (img, div, data, link) {};
  config.functions.onInventoryEmpty =
    config.functions.onInventoryEmpty || function (img, div) {};
  config.functions.onAdvertisementClose =
    config.functions.onAdvertisementClose || function (div) {};
  config.functions.getUILanguage =
    config.functions.getUILanguage ||
    function () {
      return (navigator.language || navigator.userLanguage).split("-")[0];
    };
  config.functions.getPageTitle =
    config.functions.getPageTitle ||
    function () {
      let title = d.querySelector(config.selectors.title);
      if (!title || title.innerText.trim() === "") {
        title = d.querySelector("title");
      }
      return title ? title.innerText.trim() : "";
    };
  config.functions.getPageTags =
    config.functions.getPageTags ||
    function () {
      return [];
    };
  config.functions.getImages =
    config.functions.getImages ||
    function () {
      if (config.selectors.images !== "img[data-adbro=true]") {
        let img = d.querySelector(config.selectors.images);
        if (img) {
          return [img];
        } else {
          return [];
        }
      }
      return d.querySelectorAll(config.selectors.images);
    };
  config.functions.getImageUrl =
    config.functions.getImageUrl ||
    function (img) {
      return img.src;
    };
  config.functions.getImageSize =
    config.functions.getImageSize ||
    function (img) {
      return {
        width: Math.floor(img.offsetWidth),
        height: Math.floor(img.offsetHeight),
      };
    };
  config.functions.getSatellitePlaceholder =
    config.functions.getSatellitePlaceholder ||
    function (div) {
      let satellite = d.createElement("div");
      div.parentNode.appendChild(satellite);
      return satellite;
    };
  config.functions.getPageOrigin =
    config.functions.getPageOrigin ||
    function () {
      return w.location.origin;
    };
  config.functions.getPageUrl =
    config.functions.getPageUrl ||
    function () {
      let l = (w.location_cached =
        w.location_cached || JSON.parse(JSON.stringify(w.location)));
      let searchString = "";
      if (l.search.indexOf("=") !== -1) {
        try {
          let params = l.search
            .replace(/^[?&\/]+/, "")
            .split("&")
            .reduce(function (res, curr) {
              var p = curr.split("=", 2);
              if (p.length == 2 && p[0] && p[1]) res[p[0]] = p[1];
              return res;
            }, {});
          const WASTE_PARAMS = {
              names: [
                "zarsrc",
                "pcode",
                "zdlink",
                "zl3rd",
                "preview",
                "reco_id",
                "mcapp",
                "_ga",
                "pageId",
                "broadcastId",
                "gidzl",
                "_trms",
                "crst",
                "wrst",
                "rec_ts",
                "cpa_tid",
                "dicbo",
                "tblci",
                "commentid",
                "tag_from",
                "dc_data",
                "ui",
              ],
              prefixes: [
                "utm",
                "ia_",
                "io_",
                "_gl",
                "vnn_",
                "vn_",
                "fb_",
                "uc_",
                "__",
                "ldtag_",
              ],
              suffixes: ["_source", "_medium", "_campaign", "clid", "uid"],
            },
            REPLACE_PARAMS = { file: { from: "marticle", to: "article" } };
          function shouldRemoveParam(key) {
            if (WASTE_PARAMS.names.indexOf(key) !== -1) return true;
            for (let p of WASTE_PARAMS.prefixes)
              if (key.startsWith(p)) return true;
            for (let s of WASTE_PARAMS.suffixes)
              if (key.endsWith(s)) return true;
            return false;
          }
          for (let key in params) {
            if (!params.hasOwnProperty(key)) continue;
            if (shouldRemoveParam(key)) delete params[key];
            if (
              REPLACE_PARAMS.hasOwnProperty(key) &&
              params[key] === REPLACE_PARAMS[key].from
            ) {
              params[key] = REPLACE_PARAMS[key].to;
            }
          }
          params = Object.keys(params).map(
            (k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k])
          );
          if (params.length > 0) {
            searchString = "?" + params.join("&");
          }
        } catch (e) {
          searchString = l.search;
        }
      }
      return config.functions.getPageOrigin() + l.pathname + searchString;
    };
  config.functions.getPreviewAdvertisement =
    config.functions.getPreviewAdvertisement ||
    function () {
      return (
        config.previewAdvertisementGuid ||
        getHashParameterValue("adbro_preview")
      );
    };
  const DOMAINS_BLACKLIST = [
      "unblock.club",
      "hyperbyte.net",
      "vipshares.xyz",
      "hideip.co",
      "opoint.com",
      "sogou.com",
      "proxysite.com",
      "codio.io",
      "javascripts.page",
      "ngon.info",
      "worldlingo.com",
      "archive.org",
      "bingj.com",
      "diigo.com",
      "doubleclick.net",
      "lavanetwork.net",
      "genieesspv.jp",
      "crwdcntrl.net",
      "userreport.com",
      "gammaplatform.com",
      "adpia.vn",
      "tenmax.io",
      "atdmt.com",
      "adsrvr.org",
      "admicro.vn",
      "ads.home.vn",
      "ads.vietbao.vn",
      "advertnative.com",
      "mgid.com",
      "outbrainimg.com",
      "doubleverify.com",
      "bidswitch.net",
      "ssp.yahoo.com",
      "ssp.advertising.com",
      "rubiconproject.com",
      "000webhostapp.com",
      "factset.com",
      "useinsider.com",
      "gravatar.com",
    ],
    DOMAINS_AND_PATTERNS_BLACKLIST = DOMAINS_BLACKLIST.concat([
      "vpn",
      "proxy",
      "localhost",
      ".local",
      "mstarcms",
      "nginx.",
      "cloudfront.net",
      "google.",
      ".google",
    ]);
  function isIPv4(domain) {
    let octets = "\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)".repeat(4).slice(2);
    return new RegExp("^" + octets + "$").test(domain);
  }
  function isPageInBlacklist() {
    let domain = w.location.hostname;
    if (isIPv4(domain)) return true;
    for (let blacklisted of DOMAINS_AND_PATTERNS_BLACKLIST) {
      if (domain.indexOf(blacklisted) > -1) return true;
    }
    return false;
  }
  function isImageInBlacklist(imageUrl, img) {
    if (isPageInBlacklist()) return true;
    if (imageUrl.indexOf("data:image") === 0) return true;
    if (imageUrl.indexOf("file://") === 0) return true;
    if (imageUrl.indexOf(".html") > -1) return true;
    for (let blacklisted of DOMAINS_BLACKLIST) {
      if (imageUrl.indexOf(blacklisted) > -1) return true;
    }
    return false;
  }
  if (!("remove" in Element.prototype)) {
    Element.prototype.remove = function () {
      if (this.parentNode) {
        this.parentNode.removeChild(this);
      }
    };
  }
  function loadJson(url, options, callback, onerror) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          let json = JSON.parse(xhr.responseText || null);
          callback(json, xhr);
        } else if (onerror instanceof Function) {
          onerror();
        }
      }
    };
    options = options || {};
    let timeout = options.timeout || undefined;
    if (timeout !== undefined) {
      xhr.timeout = timeout;
    }
    xhr.withCredentials = options.withCredentials || false;
    xhr.open("GET", url, true);
    xhr.send(null);
  }
  function loadScript(url, el, onload) {
    let script = document.createElement("script");
    script.async = true;
    script.src = url;
    if (onload instanceof Function) {
      script.onload = onload;
    }
    (el || document.body).appendChild(script);
  }
  function loadPixel(url) {
    let img = d.createElement("img");
    img.src = url;
    img.width = 1;
    img.height = 1;
    img.alt = "";
    d.body.appendChild(img);
  }
  function generateRandomString() {
    return (Math.random() + 1).toString(36).substring(7);
  }
  function getHashParameterValue(name) {
    let params = w.location.hash.slice(1).split("&"),
      param = [].find.call(params, (s) => s.split("=")[0] === name);
    if (param && param.indexOf("=") > -1) {
      return param.slice(param.indexOf("=") + 1);
    }
  }
  function encodeURIComponentOnce(component) {
    while (true) {
      try {
        new URL(component);
        break;
      } catch (e) {}
      let decoded = component;
      try {
        decoded = decodeURIComponent(component);
      } catch (e) {}
      if (decoded === component) break;
      component = decoded;
    }
    return encodeURIComponent(component);
  }
  const STORAGE__GUID_KEY = "adbro-uid",
    HEADER__GUID_KEY = "X-ADBRO-uid",
    REQUEST_PARAMS__DEFAULT = { withCredentials: true },
    REQUEST_PARAMS__ANONYMOUS = { withCredentials: false };
  function getUserGuid() {
    return localStorage.getItem(STORAGE__GUID_KEY);
  }
  function setUserGuid(guid) {
    localStorage.setItem(STORAGE__GUID_KEY, guid);
  }
  const EXPERIMENT__KEY = "adbro-experiment-id",
    EXPERIMENT__GETTERS = {
      page: function () {
        if (window.hasOwnProperty(EXPERIMENT__KEY))
          return window[EXPERIMENT__KEY];
      },
      session: function () {
        return sessionStorage.getItem(EXPERIMENT__KEY);
      },
      user: function () {
        return localStorage.getItem(EXPERIMENT__KEY);
      },
    },
    EXPERIMENT__SETTERS = {
      page: function (value) {
        if (value === undefined) delete window[EXPERIMENT__KEY];
        window[EXPERIMENT__KEY] = value;
      },
      session: function (value) {
        if (value === undefined)
          return sessionStorage.removeItem(EXPERIMENT__KEY);
        sessionStorage.setItem(EXPERIMENT__KEY, value);
      },
      user: function (value) {
        if (value === undefined)
          return localStorage.removeItem(EXPERIMENT__KEY);
        localStorage.setItem(EXPERIMENT__KEY, value);
      },
    };
  function getExperimentId(choices, scope) {
    if (choices === undefined) {
      return (
        EXPERIMENT__GETTERS["page"]() ||
        EXPERIMENT__GETTERS["session"]() ||
        EXPERIMENT__GETTERS["user"]()
      );
    }
    if (scope === undefined) throw "Experiment scope is required.";
    if (!EXPERIMENT__GETTERS.hasOwnProperty(scope))
      throw "Experiment scope is invalid.";
    let choice = parseInt(EXPERIMENT__GETTERS[scope]());
    if (choices.indexOf(choice) < 0) choice = null;
    if (choice == null)
      choice = choices[Math.floor(Math.random() * choices.length)];
    EXPERIMENT__SETTERS["page"]() ||
      EXPERIMENT__SETTERS["session"]() ||
      EXPERIMENT__SETTERS["user"]();
    EXPERIMENT__SETTERS[scope](choice);
    return choice;
  }
  const HEADER__IP_KEY = "X-ADBRO-ip",
    HEADER__PAGE_KEY = "X-ADBRO-page",
    GA__PROPERTY = "G-J8TZJ65FPH";
  function callGoogleAnalytics(page, ip) {
    if (typeof gtag === "undefined" || !gtag) {
      loadScript("https://www.googletagmanager.com/gtag/js?id=" + GA__PROPERTY);
      window.dataLayer = window.dataLayer || [];
      window.gtag = function () {
        dataLayer.push(arguments);
      };
      gtag("js", new Date());
    }
    gtag("event", "page_view", {
      send_to: GA__PROPERTY,
      ip: ip,
      page_location: "/" + page,
    });
  }
  const HEADER__ASSESSOR_KEY = "X-ADBRO-assessor",
    HEADER__PREVIEW_KEY = "X-ADBRO-preview",
    URL__PANEL_SCRIPT_HANDLEBARS =
      "//cdnjs.cloudflare.com/ajax/libs/handlebars.js/4.7.6/handlebars.min.js",
    URL__PANEL_SCRIPT = "//tag.adbro.me/tags/ptag.panel.js";
  const UA__TESTER_SUBSTRING = "Headless",
    URL__AUTOTESTER_SCRIPT = "//tag.adbro.me/tags/ptag.test.js",
    ATTR_AUTOTESTER_IND = "data-adbro-index";
  function getAdvertisementFor(params, callback, onerror) {
    params = params || {};
    let adGuid = params.guid || null,
      track = params.track || null,
      slot = params.slot || adbro.slot,
      imageUrl = params.imageUrl || null,
      imageSize = params.imageSize || null,
      pageUrl = params.pageUrl || config.functions.getPageUrl(),
      pageTitle = params.pageTitle || null,
      pageTags = params.pageTags || null,
      initialSlotPosition = params.initialSlotPosition || null;
    let requestUri =
        config.endpoint + "v2/advertising/slot/" + slot + "/advertisement/",
      requestParams = REQUEST_PARAMS__DEFAULT;
    if (adGuid) requestUri += adGuid + "/";
    requestUri += "?pageUrl=" + encodeURIComponentOnce(pageUrl);
    if (pageTitle)
      requestUri += "&pageTitle=" + encodeURIComponentOnce(pageTitle);
    if (imageUrl) requestUri += "&imageUrl=" + encodeURIComponentOnce(imageUrl);
    if (imageSize)
      requestUri += "&imageSize=" + imageSize.width + "x" + imageSize.height;
    if (pageTags && pageTags.length)
      requestUri +=
        "&pageTags=" + pageTags.map(encodeURIComponentOnce).join(",");
    let userGuid = getUserGuid();
    if (userGuid) requestUri += "&uid=" + userGuid;
    let experimentId = getExperimentId();
    if (experimentId) requestUri += "&experiment=" + experimentId;
    if (initialSlotPosition)
      requestUri += "&initialSlotPosition=" + initialSlotPosition;
    if (track) requestUri += "&track=" + encodeURIComponent(track);
    requestUri += "&r=" + generateRandomString();
    if (config.preview) {
      let advertisement = adGuid || config.functions.getPreviewAdvertisement();
      requestUri =
        config.endpoint +
        "v2/advertising/advertisement/" +
        advertisement +
        "/preview/?r=" +
        generateRandomString();
      requestParams = REQUEST_PARAMS__DEFAULT;
    }
    loadJson(
      requestUri,
      requestParams,
      function (data, xhr) {
        let uidHeader = xhr.getResponseHeader(HEADER__GUID_KEY);
        if (uidHeader) setUserGuid(uidHeader);
        if (config.gaEnabled) {
          let pageHeader = xhr.getResponseHeader(HEADER__PAGE_KEY),
            ipHeader = xhr.getResponseHeader(HEADER__IP_KEY);
          if (pageHeader && ipHeader) callGoogleAnalytics(pageHeader, ipHeader);
        }
        if (config.panelEnabled) {
          let assessorHeader = xhr.getResponseHeader(HEADER__ASSESSOR_KEY),
            assessorAnchor = getHashParameterValue("adbro_assessor");
          if (assessorHeader == "true" || assessorAnchor == "true") {
            config.assessor = true;
          }
        }
        let previewHeader = xhr.getResponseHeader(HEADER__PREVIEW_KEY);
        if (previewHeader != null) {
          config.preview = true;
          params.guid = config.previewAdvertisementGuid = previewHeader;
          getAdvertisementFor(params, callback, onerror);
          return;
        }
        if (data && data.hasOwnProperty("data")) callback(data.data);
        else onerror();
        if ((config.assessor || config.preview) && config.panelEnabled) {
          loadScript(URL__PANEL_SCRIPT_HANDLEBARS, null, function () {
            loadScript(URL__PANEL_SCRIPT);
          });
        }
      },
      onerror
    );
  }
  function getTemplateForAdvertisement(data, callback, onerror) {
    let requestUri =
      config.endpoint +
      "v2/advertising/template/" +
      data.template.id +
      "/version/" +
      data.template.version +
      "/";
    loadJson(
      requestUri,
      REQUEST_PARAMS__ANONYMOUS,
      function (template) {
        callback(template);
      },
      onerror
    );
  }
  function createPlaceholder(img) {
    let div = d.createElement("div");
    div.style.position = "relative";
    div.style.display = "none";
    img.parentNode.insertBefore(div, img.nextSibling);
    return div;
  }
  const CLASS__ANIMATED = "adbro-animated";
  function sizePlaceholder(div, img) {
    div.id = "adbro";
    div.classList.add(CLASS__ANIMATED);
    div.style.display = "inline-block";
    div.style.overflow = "hidden";
    div.style.width = img.offsetWidth + "px";
    div.style.height = img.offsetHeight + "px";
    div.style.top = "-" + img.offsetHeight + "px";
    div.style.marginBottom = "-" + (img.offsetHeight - 15) + "px";
    if (img.offsetWidth < 600) div.classList.add("adbro-sm");
    else if (img.offsetWidth < 800) div.classList.add("adbro-md");
    else if (img.offsetWidth >= 800) div.classList.add("adbro-lg");
    if (img.offsetHeight < 400) div.classList.add("adbro-xs");
    config.functions.onPlaceholderSized(div, img);
  }
  function trackResize(placeholder, img) {
    let interval = null;
    if (img.offsetHeight > 100) {
      sizePlaceholder(placeholder, img);
      let oldHeight = img.offsetHeight;
      interval = setInterval(function () {
        if (img.offsetHeight === oldHeight) return;
        sizePlaceholder(placeholder, img);
        clearInterval(interval);
      }, 100);
    }
    img.onload = function () {
      sizePlaceholder(placeholder, img);
      clearInterval(interval);
    };
    let oldWidth = d.body.clientWidth;
    d.body.onresize = function () {
      if (d.body.clientWidth === oldWidth) return;
      oldWidth = d.body.clientWidth;
      sizePlaceholder(placeholder, img);
    };
    img.src = img.src;
  }
  function getRelativeElementScroll(el) {
    let transform = el.style.transform || "",
      transformScroll = 0;
    if (transform.startsWith("translate3d")) {
      let translate3d = transform.split(",");
      transformScroll =
        translate3d.length > 2 ? parseInt(translate3d[1]) || 0 : 0;
    } else if (transform.startsWith("translateY")) {
      let translateY = transform.split("(");
      transformScroll =
        translateY.length > 1 ? parseInt(translateY[1]) || 0 : 0;
    }
    return el.scrollTop - transformScroll;
  }
  function getScrollDistanceToBottom(el) {
    const SCROLL_BUFFER = 0;
    let top = el.offsetTop,
      height = el.offsetHeight,
      scrollTop = getRelativeElementScroll(el);
    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
      scrollTop += getRelativeElementScroll(el);
    }
    let screenTop = w.pageYOffset + scrollTop + SCROLL_BUFFER,
      screenBottom = w.pageYOffset + scrollTop + w.innerHeight - SCROLL_BUFFER,
      elBottom = top + height;
    if (elBottom > screenBottom) return elBottom - screenBottom;
    if (elBottom < screenTop) return elBottom - screenTop;
    return 0;
  }
  const VIEWABILITY__SELECTOR = "[data-viewability-track=true], a.adbro-link",
    VIEWABILITY__THRESHOLD = 5,
    VIEWABILITY__MARGIN = "10px",
    VIEWABILITY__1S__TIME = 1,
    VIEWABILITY__1S__EVENT = 8,
    VIEWABILITY__6S__TIME = 6,
    VIEWABILITY__6S__EVENT = 9,
    VIEWABILITY__15S__TIME = 15,
    VIEWABILITY__15S__EVENT = 3;
  function setViewabilityTimeout(elements, seconds, callback) {
    const step_ms = 100;
    let counter = 0,
      states = {},
      interval = null;
    let observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (ent) {
          let key = ent.target.id || ent.target.className || ent.target;
          states[key] = ent.isIntersecting;
        });
      },
      {
        root: null,
        rootMargin: VIEWABILITY__MARGIN,
        threshold: VIEWABILITY__THRESHOLD / 100,
      }
    );
    elements.forEach(function (el) {
      observer.observe(el);
    });
    interval = setInterval(function () {
      let viewable = false;
      elements.forEach(function (el) {
        let key = el.id || el.className || el;
        if (states.hasOwnProperty(key) && states[key]) viewable = true;
      });
      if (!viewable || d.hidden) return;
      counter += step_ms;
      if (counter % 1000 === 0) {
        console.debug("viewabilityTimeout: " + counter / 1000 + " sec");
      }
      if (counter >= 1000 * seconds) {
        clearInterval(interval);
        observer.disconnect();
        callback(elements);
      }
    }, step_ms);
  }
  const ENGAGEMENT__SELECTOR =
      VIEWABILITY__SELECTOR + ", .adbro-takeover-replay",
    ENGAGEMENT__EVENT = 12,
    ENGAGEMENT__TYPE_HOVER = "hover",
    ENGAGEMENT__TYPE_HOVER__TIME = 5,
    ENGAGEMENT__TYPE_TOUCH = "touch",
    ENGAGEMENT__TYPE_TOUCH__TIME = 1,
    ENGAGEMENT__TYPES_DEFAULT = [
      ENGAGEMENT__TYPE_HOVER,
      ENGAGEMENT__TYPE_TOUCH,
    ];
  function setEngagementTimeout(elements, seconds, callback, types) {
    let counter = 0,
      interval = null,
      step_ms = 100,
      done = false;
    let startHandler = function () {
        if (!done && !interval) {
          interval = setInterval(function () {
            if (counter % 1000 === 0) {
              console.debug("engagementTimeout: " + counter / 1000 + " sec");
            }
            if (counter < 1000 * seconds) {
              counter += step_ms;
            } else {
              done = true;
              clearInterval(interval);
              callback();
            }
          }, step_ms);
        }
      },
      endHandler = function () {
        if (interval) {
          clearInterval(interval);
          interval = null;
        }
      };
    types = types || ENGAGEMENT__TYPES_DEFAULT;
    elements.forEach(function (elem) {
      if (types.indexOf(ENGAGEMENT__TYPE_HOVER) >= 0) {
        elem.addEventListener("mouseenter", startHandler);
        elem.addEventListener("mouseleave", endHandler);
      }
      if (types.indexOf(ENGAGEMENT__TYPE_TOUCH) >= 0) {
        elem.addEventListener("touchstart", startHandler);
        elem.addEventListener("touchend", endHandler);
        elem.addEventListener("touchcancel", endHandler);
      }
    });
  }
  const ATTR_SLOT = "data-adbro-slot";
  const SLOTS_MAP = {};
  function setSlotForCode(code, slot) {
    if (code === undefined) return;
    SLOTS_MAP[code] = slot;
  }
  function getSlotForCode(code) {
    if (SLOTS_MAP.hasOwnProperty(code)) return SLOTS_MAP[code];
    return adbro.slot;
  }
  function getSlotForImage(img) {
    return img.getAttribute(ATTR_SLOT) || adbro.slot;
  }
  function buildTrackingLink(code, type, link, redirect, blockReason) {
    if (code === undefined) throw "Tracking code is required.";
    if (type === undefined) throw "Tracking type is required.";
    redirect = redirect || false;
    let trackUri =
      config.endpoint +
      "v2/advertising/slot/" +
      getSlotForCode(code) +
      "/track/" +
      "?code=" +
      encodeURIComponent(code) +
      "&event=" +
      type;
    if (redirect) trackUri += "&redirect=true";
    if (blockReason) trackUri += "&blockReason=" + blockReason;
    let userGuid = getUserGuid();
    if (userGuid) trackUri += "&uid=" + userGuid;
    let experimentId = getExperimentId();
    if (experimentId) trackUri += "&experiment=" + experimentId;
    trackUri += "&r=" + generateRandomString();
    if (link !== undefined) trackUri += "&link=" + encodeURIComponentOnce(link);
    return trackUri;
  }
  const BIDSWITCH__TYPE = "bidswitch",
    BIDSWITCH__DEFAULT_STYLE =
      "display:none; border: none; width: 476px; height: 90px;",
    BIDSWITCH__FRAME_BODY_STYLE = "padding: 0px; margin: 0px; overflow: hidden";
  const TTD_DV__MATCH = "DVP_TTD_1",
    TTD_DV__SPAN_ID = "dv-adbro-beacon",
    TTD_DV__SPAN =
      '<span id="' +
      TTD_DV__SPAN_ID +
      '" style="position:absolute; display:block; top:0; left:0; right:0; bottom:0;"></span>';
  const VIDEO__DEFAULT_STYLE = "width: 100%;",
    VIDEO__SCRIPT_URL = "https://imasdk.googleapis.com/js/sdkloader/ima3.js";
  const EXTERNAL_CAMPAIGN__MESSAGE_TYPE = "EXTERNAL_CAMPAIGN";
  function setupTag(img, placeholder, data) {
    let tagConfig = data["tag"],
      id = tagConfig["id"],
      type = tagConfig["type"],
      params = tagConfig["parameters"] || {};
    let satellite = null;
    function appendTag(block) {
      if (params["position"] === "uib") {
        satellite = config.functions.getSatellitePlaceholder(placeholder);
        satellite.appendChild(block);
        satellite.style.textAlign = "center";
      } else {
        placeholder.appendChild(block);
        block.style.position = "absolute";
        block.style.left = "50%";
        block.style.transform = "translateX(-50%)";
        block.style.bottom = "0";
      }
    }
    if (type === BIDSWITCH__TYPE) {
      let frame = document.createElement("iframe");
      frame.id = id;
      frame.style.cssText = params["style"] || BIDSWITCH__DEFAULT_STYLE;
      appendTag(frame);
      let adm = data.values["adm"];
      if (adm.match(TTD_DV__MATCH)) {
        adm = TTD_DV__SPAN + adm;
        adm = adm.replace("&btreg=&", "&btreg=" + TTD_DV__SPAN_ID + "&");
      }
      frame.contentDocument.open();
      frame.contentDocument.write(adm);
      frame.contentDocument.close();
      frame.contentDocument.body.style.cssText = BIDSWITCH__FRAME_BODY_STYLE;
    } else if (type === "video") {
      let position = params["position"];
      if (position && position !== "uib")
        console.warn("Video Tag only supports Under-Image placement.");
      params["position"] = "uib";
      let container = document.createElement("div");
      container.id = "adbro-ima";
      container.style.cssText = params["style"] || VIDEO__DEFAULT_STYLE;
      appendTag(container);
      function initializeIMA() {
        let adContainer = new google.ima.AdDisplayContainer(container),
          adsLoader = new google.ima.AdsLoader(adContainer);
        adsLoader.addEventListener(
          google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
          function (adsManagerLoadedEvent) {
            let adsManager = adsManagerLoadedEvent.getAdsManager(),
              width = container.clientWidth,
              height = (width / 16) * 9,
              io = null;
            container.style.height = height + "px";
            try {
              adsManager.init(width, height, google.ima.ViewMode.NORMAL);
              adsManager.setVolume(0);
              adsManager.start();
              w.postMessage(
                {
                  type: EXTERNAL_CAMPAIGN__MESSAGE_TYPE,
                  adbro_guid: data.adguid,
                },
                "*"
              );
            } catch (adError) {
              console.error("IMA SDK failed to start an Advertisement");
              container.remove();
            }
            adsManager.addEventListener(
              google.ima.AdEvent.Type.COMPLETE,
              function () {
                container.remove();
                io.disconnect();
              },
              false
            );
            io = new IntersectionObserver(
              function (entries) {
                var isVisible = entries[0].isIntersecting;
                if (isVisible) {
                  adsManager.resume();
                } else {
                  adsManager.pause();
                }
              },
              { root: null, threshold: [0] }
            );
            io.observe(container);
          },
          false
        );
        adsLoader.addEventListener(
          google.ima.AdErrorEvent.Type.AD_ERROR,
          function (adErrorEvent) {
            console.log(adErrorEvent.getError());
          },
          false
        );
        let adsRequest = new google.ima.AdsRequest();
        adsRequest.setAdWillAutoPlay(true);
        adsRequest.setAdWillPlayMuted(true);
        adsRequest.adTagUrl = params["url"];
        adsLoader.requestAds(adsRequest);
        adContainer.initialize();
      }
      loadScript(VIDEO__SCRIPT_URL, d.body, initializeIMA);
    } else {
      throw "Unknown Tag type";
    }
  }
  function setupMessageListener(
    img,
    placeholder,
    adData,
    getAdvertisementParams
  ) {
    let messageListener = null;
    messageListener = function (e) {
      let msg = e.data;
      if (!msg.hasOwnProperty("type") || !msg.hasOwnProperty("adbro_guid"))
        return;
      w.removeEventListener("message", messageListener);
      delete w.adbro_tag_lock;
      getAdvertisementParams.guid = msg.adbro_guid;
      getAdvertisementParams.track = adData.track;
      let adTag = adData.tag || {},
        adsMap =
          adTag.map || (adTag.parameters || {}).map || adTag.parameters || {},
        mapped = adsMap[msg.adbro_guid] || adsMap["map." + msg.adbro_guid];
      if (mapped) {
        getAdvertisementParams.guid = mapped;
      }
      getAdvertisementFor(
        getAdvertisementParams,
        function (data) {
          console.debug("Advertisement data for:", msg.adbro_guid);
          console.debug(data);
          if (msg["type"] === EXTERNAL_CAMPAIGN__MESSAGE_TYPE) {
            onInventoryImpression(img, placeholder, data);
            return;
          }
          if (data == null) {
            onInventoryEmpty(img, placeholder);
            return;
          }
          setSlotForCode(data.track, getAdvertisementParams.slot);
          var click_url = msg.click_url,
            default_url = msg.default_url,
            replacement_url = null;
          getTemplateForAdvertisement(data, function (template) {
            renderAdvertisement(
              img,
              placeholder,
              data,
              template,
              click_url,
              default_url,
              replacement_url
            );
            onInventoryImpression(img, placeholder, data);
          });
        },
        function () {
          console.error(
            "Error when getting advertisement data for:",
            msg.adbro_guid
          );
          onInventoryEmpty(img, placeholder);
        }
      );
      e.source.postMessage({ type: "ADBRO_PTAG_READY" }, "*");
    };
    w.addEventListener("message", messageListener);
  }
  function renderAdvertisement(
    img,
    div,
    data,
    template,
    linkTracking,
    linkDefault,
    linkReplacement
  ) {
    function Template(tmpl, values, recursive) {
      const regex = /{{({?)\s*(\w*)\s*}?}}/g;
      let result = tmpl,
        replaces = 0;
      while ((match = regex.exec(result)) !== null) {
        let name = match[2],
          value = values.hasOwnProperty(name) ? String(values[name]) : "",
          safe = match[1] === "{";
        if (!safe) {
          value = value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        }
        result = result.replace(match[0], value);
        if (recursive) regex.lastIndex = 0;
        if (replaces++ >= 100) break;
      }
      return result;
    }
    let html = Template(template.html, data.values, true);
    html = html.replace(/\[timestamp\]/g, new Date().getTime());
    let userGuid = getUserGuid();
    if (userGuid) {
      html = html.replace(/\[uid\]/g, userGuid.replace(/\-/g, ""));
    }
    if (div.firstChild) {
      let idiv = document.createElement("div");
      div.insertBefore(idiv, div.firstChild);
      idiv.innerHTML = html;
    } else {
      div.innerHTML = html;
    }
    let scontent = div.querySelector(".adbro-satellite"),
      satellite = null;
    if (scontent != null) {
      try {
        satellite = config.functions.getSatellitePlaceholder(div);
      } catch (e) {
        console.warn("Satellite creation has failed with error:", e);
      }
      if (satellite) satellite.innerHTML = scontent.outerHTML;
      scontent.remove();
    }
    function closeAdvertisement() {
      div.remove();
      if (satellite != null) satellite.remove();
      img.removeAttribute(ATTR_PROCESSED);
      config.functions.onAdvertisementClose(div);
    }
    function wrapClose(block) {
      [].forEach.call(
        block.querySelectorAll(".adbro-close, [data-block-reason]"),
        function (close) {
          let blockReason = close.getAttribute("data-block-reason");
          close.onclick = function () {
            if (close.getAttribute("data-block") === "false") return;
            if (blockReason && data.track) {
              let trackUri = buildTrackingLink(
                data.track,
                11,
                undefined,
                undefined,
                blockReason
              );
              loadPixel(trackUri);
            }
            closeAdvertisement();
          };
        }
      );
    }
    function wrapLinks(block) {
      [].forEach.call(
        block.querySelectorAll("a[data-track=true]"),
        function (el) {
          let destinationUri = linkReplacement || el.href || linkDefault,
            trackUri = destinationUri;
          let wrapAdbro = function (link) {
            if (config.preview) return link;
            return buildTrackingLink(data.track, 2, link, true);
          };
          trackUri = wrapAdbro(destinationUri);
          if (linkTracking && !linkReplacement) {
            trackUri =
              linkTracking + encodeURIComponent(wrapAdbro(destinationUri));
            if (linkTracking.indexOf("adsrvr.org") > 0) {
              trackUri = wrapAdbro(
                linkTracking.split("&r=")[0] +
                  "&r=" +
                  encodeURIComponent(destinationUri)
              );
            }
          }
          el.addEventListener(
            "click",
            function (e) {
              e.preventDefault();
              let target = el.getAttribute("target");
              if (target === "_blank") {
                w.open(trackUri);
              } else if (target === "_pixel") {
                loadPixel(trackUri);
              } else {
                w.location.href = trackUri;
              }
              onInventoryClick(img, div, data, destinationUri);
            },
            false
          );
        }
      );
    }
    function translate(block) {
      let lang = config.functions.getUILanguage(),
        attribute = "data-trans-" + lang;
      [].forEach.call(
        block.querySelectorAll("[" + attribute + "]"),
        function (el) {
          let translation = el.getAttribute(attribute);
          el.innerHTML = translation;
        }
      );
    }
    translate(div);
    wrapLinks(div);
    wrapClose(div);
    if (satellite != null) {
      translate(satellite);
      wrapLinks(satellite);
      wrapClose(satellite);
    }
    let evalArguments = {
      block: div,
      satellite: satellite,
      data: data,
      values: data.values,
      loadPixel: loadPixel,
      loadScript: loadScript,
      buildTrackingLink: buildTrackingLink,
      setViewabilityTimeout: setViewabilityTimeout,
      setEngagementTimeout: setEngagementTimeout,
    };
    function evalScript(script, onsuccess, onerror) {
      try {
        w.eval(
          "(function (" +
            Object.keys(evalArguments).join(",") +
            ") {" +
            script +
            "})"
        ).apply(undefined, Object.values(evalArguments));
        if (onsuccess) onsuccess();
      } catch (e) {
        onerror(e);
      }
    }
    if (template.script) {
      evalScript(template.script, null, function (e) {
        console.warn("Template script evaluation has failed with error:", e);
      });
    }
    if (config.preview && !config.panelEnabled) return;
    if (data.script) {
      evalScript(data.script, null, function (e) {
        console.warn(
          "Advertisement script evaluation has failed with error:",
          e
        );
      });
    }
    if (config.preview) return;
    let viewabilityTargets = [div.querySelector(VIEWABILITY__SELECTOR) || div];
    if (satellite) viewabilityTargets.push(satellite);
    setViewabilityTimeout(
      viewabilityTargets,
      VIEWABILITY__15S__TIME,
      function () {
        let trackUri = buildTrackingLink(data.track, VIEWABILITY__15S__EVENT);
        loadPixel(trackUri);
        div.classList.remove(CLASS__ANIMATED);
      }
    );
    setViewabilityTimeout(
      viewabilityTargets,
      VIEWABILITY__6S__TIME,
      function () {
        let trackUri = buildTrackingLink(data.track, VIEWABILITY__6S__EVENT);
        loadPixel(trackUri);
      }
    );
    setViewabilityTimeout(
      viewabilityTargets,
      VIEWABILITY__1S__TIME,
      function () {
        let trackUri = buildTrackingLink(data.track, VIEWABILITY__1S__EVENT);
        loadPixel(trackUri);
      }
    );
    let engagementTargets = Array.from(
      div.querySelectorAll(ENGAGEMENT__SELECTOR)
    ) || [div];
    if (satellite) engagementTargets.push(satellite);
    let engagementTracked = false,
      engagementTrack = function () {
        if (engagementTracked) return;
        engagementTracked = true;
        let trackUri = buildTrackingLink(data.track, ENGAGEMENT__EVENT);
        loadPixel(trackUri);
      };
    setEngagementTimeout(
      engagementTargets,
      ENGAGEMENT__TYPE_TOUCH__TIME,
      engagementTrack,
      [ENGAGEMENT__TYPE_TOUCH]
    );
    setEngagementTimeout(
      engagementTargets,
      ENGAGEMENT__TYPE_HOVER__TIME,
      engagementTrack,
      [ENGAGEMENT__TYPE_HOVER]
    );
  }
  function onInventoryEmpty(img, placeholder) {
    if (!config.functions.onInventoryEmpty(img, placeholder)) {
      placeholder.remove();
    }
  }
  function onInventoryImpression(img, placeholder, data) {
    let macro = config.ssp.viewMacro;
    if (macro && new RegExp("^(https?:)?\\/\\/", "i").test(macro)) {
      loadPixel(macro);
      config.ssp.viewMacro = null;
    }
    config.functions.onInventoryImpression(img, placeholder, data);
  }
  function onInventoryClick(img, placeholder, data, link) {
    let macro = config.ssp.clickMacro;
    if (macro && new RegExp("^(https?:)?\\/\\/", "i").test(macro))
      loadPixel(macro);
    config.functions.onInventoryClick(img, placeholder, data);
  }
  const COOKIESYNC__INTERVAL = 24 * 60 * 60 * 1000,
    LOTAME__URL =
      "https://c.ltmsphrcl.net/id?gdpr_applied=false&us_privacy=false",
    STORAGE__COOKIESYNC_TS_KEY = "adbro-cookiesync-ts";
  function cookieSync() {
    let userGuid = getUserGuid();
    if (!userGuid) return;
    let lastSyncTime = parseInt(
        localStorage.getItem(STORAGE__COOKIESYNC_TS_KEY) || 0
      ),
      now = Date.now();
    if (lastSyncTime + COOKIESYNC__INTERVAL > now) return;
    localStorage.setItem(STORAGE__COOKIESYNC_TS_KEY, now);
    let trackUri =
      config.endpoint +
      "v2/advertising/cookie_sync?uid=" +
      userGuid +
      "&r=" +
      generateRandomString();
    loadJson(
      LOTAME__URL,
      null,
      function (data) {
        if (data && data.hasOwnProperty("core_id") && data["core_id"]) {
          trackUri +=
            "&externalSystemId=lotame&externalUserId=" + data["core_id"];
        }
        loadPixel(trackUri);
      },
      function () {
        loadPixel(trackUri);
      }
    );
  }
  const ATTR_PROCESSED = "data-adbro-processed";
  function init() {
    let title = config.functions.getPageTitle(),
      images = config.functions.getImages(),
      tags = config.functions.getPageTags();
    [].forEach.call(images, function (img, id) {
      let imageUrl = config.functions.getImageUrl(img),
        imageSize = config.functions.getImageSize(img);
      if (!imageUrl || isImageInBlacklist(imageUrl, img)) return;
      let cfMirage = imageUrl.match(/(.*\/)cdn-cgi\/mirage\/\w*\/[0-9]+\/(.*)/);
      if (cfMirage) {
        imageUrl = cfMirage[2];
        if (imageUrl.indexOf("http") !== 0) imageUrl = cfMirage[1] + imageUrl;
      }
      if (img.complete && img.naturalWidth === 0) return;
      if (img.getAttribute(ATTR_PROCESSED)) return;
      img.setAttribute(ATTR_PROCESSED, "true");
      if (navigator.userAgent.indexOf(UA__TESTER_SUBSTRING) > -1) {
        let placeholder = createPlaceholder(img);
        placeholder.setAttribute(ATTR_AUTOTESTER_IND, id);
        sizePlaceholder(placeholder, img);
        trackResize(placeholder, img);
        loadScript(URL__AUTOTESTER_SCRIPT);
        return;
      }
      let initialSlotPosition = getScrollDistanceToBottom(img);
      if (navigator.userAgent.indexOf("coc_coc_browser") > -1) {
        return;
      }
      function loadAdvertisement() {
        let placeholder = createPlaceholder(img),
          slot = getSlotForImage(img),
          getAdvertisementParams = {
            slot: slot,
            imageUrl: imageUrl,
            imageSize: imageSize,
            pageTitle: title,
            pageTags: tags,
            initialSlotPosition: initialSlotPosition,
          };
        getAdvertisementFor(
          getAdvertisementParams,
          function (data) {
            console.debug("Advertisement data for:", imageUrl);
            console.debug(data);
            if (Math.floor(Math.random() * 3) === 0) cookieSync();
            if (data == null) {
              onInventoryEmpty(img, placeholder);
              return;
            }
            if (
              data.hasOwnProperty("tag") &&
              !(config.preview && data.tag.type === BIDSWITCH__TYPE)
            ) {
              let initTag = function () {
                w.adbro_tag_lock = true;
                setupTag(img, placeholder, data);
                setupMessageListener(
                  img,
                  placeholder,
                  data,
                  getAdvertisementParams
                );
              };
              if (w.adbro_tag_lock !== true) {
                initTag();
              } else {
                let initTagInterval = null;
                initTagInterval = setInterval(function () {
                  if (w.adbro_tag_lock === true) return;
                  clearInterval(initTagInterval);
                  initTag();
                }, 200);
              }
              return;
            }
            setSlotForCode(data.track, slot);
            getTemplateForAdvertisement(data, function (template) {
              renderAdvertisement(img, placeholder, data, template);
              onInventoryImpression(img, placeholder, data);
            });
          },
          function () {
            console.error(
              "Error when getting advertisement data for:",
              imageUrl
            );
            onInventoryEmpty(img, placeholder);
          }
        );
        trackResize(placeholder, img);
        config.functions.onInventoryHit(img);
      }
      let oldDistance = initialSlotPosition,
        oldScrollAcceleration = 0;
      function waitForImageApproachScreenDelegate() {
        if (d.hidden === true) {
          setTimeout(waitForImageApproachScreenDelegate, 500);
          return;
        }
        let distance = getScrollDistanceToBottom(img);
        let scrollAcceleration = distance - oldDistance;
        oldDistance = distance;
        scrollAcceleration = scrollAcceleration + oldScrollAcceleration;
        oldScrollAcceleration = scrollAcceleration - oldScrollAcceleration;
        if (
          (distance < 0 && scrollAcceleration > -distance) ||
          distance === 0 ||
          (distance > 0 && -scrollAcceleration > distance)
        ) {
          loadAdvertisement();
          return;
        }
        setTimeout(waitForImageApproachScreenDelegate, 100);
      }
      waitForImageApproachScreenDelegate();
    });
  }
  if (d.readyState !== "loading") {
    init();
  } else {
    d.addEventListener("DOMContentLoaded", init);
  }
  adbro._render = function (params) {
    config.preview = params.preview;
    config.gaEnabled = false;
    if (params.preview) {
      config.panelEnabled = false;
      config.previewAdvertisementGuid = params.guid;
    }
    if (params.hasOwnProperty("satellite")) {
      config.functions.getSatellitePlaceholder = function () {
        return params.satellite;
      };
    }
    let _params = params._params || {};
    _params.guid = params.guid;
    getAdvertisementFor(_params, function (data) {
      getTemplateForAdvertisement(data, function (template) {
        renderAdvertisement(
          null,
          params.placeholder,
          data,
          template,
          (params.tag || {}).click_url
        );
        if (params.buttons === false) {
          [].forEach.call(
            params.placeholder.querySelectorAll(".adbro-icon, .adbro-close"),
            function (el) {
              el.remove();
            }
          );
        }
      });
    });
  };
};
if (window["ptag"]) {
  let adbro = (window["adbro"] = window["adbro"] || { config: {} }),
    adbro_initialized = false;
  let r = "ptag",
    q = (window[r] || {})["q"] || [];
  window[r] = function () {
    q.push(arguments);
    CommandsProcessor.process();
  };
  let CommandsProcessor = {
    process: function () {
      while (true) {
        let args = q.shift();
        if (args === undefined) break;
        let command = args[0];
        switch (command) {
          case "config":
            this._config(args);
            break;
          case "render":
            this._render(args);
            break;
        }
      }
      if (
        !adbro_initialized &&
        Object.keys(adbro.config).length > 0 &&
        adbro.slot
      ) {
        adbro_initialized = true;
        adbro_init_function(window.top, window.top.document);
      }
    },
    _config: function (args) {
      if (typeof args[1] == "object") {
        let config = args[1];
        for (let key in config) {
          if (!config.hasOwnProperty(key)) continue;
          adbro.config[key] = config[key];
        }
      } else if (args.length === 3) {
        let key = args[1],
          value = args[2];
        switch (key) {
          case "slot":
            adbro.slot = value;
            break;
          case "ssp.view":
          case "dfp.view":
            adbro.config.ssp = adbro.config.ssp || {};
            adbro.config.ssp.viewMacro = value;
            break;
          case "ssp.click":
          case "dfp.click":
            adbro.config.ssp = adbro.config.ssp || {};
            adbro.config.ssp.clickMacro = value;
            break;
        }
      }
    },
    _render: function (args) {
      if (args.length !== 2)
        throw "Render command requires exactly 2 arguments.";
      args = args[1];
      args.preview = args.preview !== false;
      if (!adbro_initialized) {
        adbro_initialized = true;
        adbro_init_function(window, window.document);
      }
      adbro._render(args);
    },
  };
  CommandsProcessor.process();
} else {
  adbro_init_function(window.top, window.top.document);
}
