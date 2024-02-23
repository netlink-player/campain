// Staging
AiActivAd = function(id, host, level) {
    console.log("Ad " + id + " registered to host: " + host);
};
AiActivAd.prototype.log = function(event, status) {
    this.trace(event + ": " + status);
};
AiActivAd.prototype.trace = function(msg) {
    try {
        console.log(msg);
    } catch (e) {}
};

AiActivVideo = function(eid, video, logger) {
    this.video = video;
    this.video.eid = eid;
    this.video.view = false;
    this.video.started = false;
    this.video.playing = false;
    this.video.finished = false;
    this.video.played_25 = false;
    this.video.played_50 = false;
    this.video.played_75 = false;
    this.video.logger = logger;
    this.video.mute = this.video.defaultMuted;
    this.video.addEventListener("play", this.videoHandler, false);
    this.video.addEventListener("pause", this.videoHandler, false);
    this.video.addEventListener("ended", this.videoHandler, false);
    this.video.addEventListener("timeupdate", this.onTimeupdate, false);
    this.video.addEventListener("volumechange", this.onVolumechange, false);
    this.video.pm = function(msg, target) {
        try {
            parent.postMessage(msg, target);
        } catch (e) {}
    }
    try {
        console.log("Video obj:" + video.id + ", id:" + eid + ", registered to logger: " + logger);
    } catch (e) {}
}
AiActivVideo.prototype.videoHandler = function(e) {
    if (this.started && e.type == "pause" && this.currentTime < this.duration) {
        this.logger.log(this.eid, "p");
        this.logger.log(this.eid + "_Pause", "c");
        this.logger.log(this.eid + "_Audio", "p");
        this.pm("interaction|" + this.eid + ",p", "*");
        this.pm("interaction|" + this.eid + "_Pause,c", "*");
        this.pm("interaction|" + this.eid + "_Audio,p", "*");
        this.playing = false;
    }
    if (this.started && e.type == "play") {
        this.logger.log(this.eid, "r");
        this.logger.log(this.eid + "_Play", "c");
        this.pm("interaction|" + this.eid + ",s", "*");
        this.pm("interaction|" + this.eid + "_Play,c", "*");
        if (this.volume > 0 && !this.mute) {
            this.logger.log(this.eid + "_Audio", "s");
            this.pm("interaction|" + this.eid + "_Audio,s", "*");
        }
        this.playing = true;
    }
    if (e.type == "play") {
        if (this.finished) {
            this.logger.log(this.eid + "_Replay", "c");
            this.pm("interaction|" + this.eid + "_Replay,c", "*");
            this.finished = false;
        }
    }
    if (e.type == "ended") {
        this.logger.log(this.eid, "f");
        this.pm("interaction|" + this.eid + ",f", "*");
        if (this.volume > 0 && !this.mute) {
            this.logger.log(this.eid + "_Audio", "f");
            this.pm("interaction|" + this.eid + "_Audio,f", "*");
        }
        this.started = false;
        this.playing = false;
        this.finished = true;
        this.played_25 = false;
        this.played_50 = false;
        this.played_75 = false;
        this.pm(AiActivHTMLAd.id + "_videoEnded", "*");
        this.pm("interaction|" + this.eid + "_100,c", "*");
    }
}
AiActivVideo.prototype.onTimeupdate = function() {
    if (this.currentTime >= 0 && !this.view) {
        this.view = true;
        this.pm("interaction|" + this.eid + "_00,c", "*");
    }
    if (this.currentTime > 0 && !this.started) {
        if (this.volume > 0 && !this.mute) {
            this.logger.log(this.eid + "_Audio", "s");
            this.pm("interaction|" + this.eid + "_Audio,s", "*");
        }
        this.started = true;
        this.playing = true;
        this.logger.log(this.eid, "s");
        this.pm("interaction|" + this.eid + ",s", "*");
    }
    if (this.currentTime > (this.duration * 0.25) && !this.played_25) {
        this.played_25 = true;
        this.logger.log(this.eid + "_25", "c");
        this.pm("interaction|" + this.eid + "_25,c", "*");
    }
    if (this.currentTime > (this.duration * 0.5) && !this.played_50) {
        this.played_50 = true;
        this.logger.log(this.eid + "_50", "c");
        this.pm("interaction|" + this.eid + "_50,c", "*");
    }
    if (this.currentTime > (this.duration * 0.75) && !this.played_75) {
        this.played_75 = true;
        this.logger.log(this.eid + "_75", "c");
        this.pm("interaction|" + this.eid + "_75,c", "*");
    }
    this.pm(AiActivHTMLAd.id + "_current_time|" + Math.ceil(this.currentTime), "*");
}
AiActivVideo.prototype.onVolumechange = function() {
    if (this.muted) {
        this.mute = true;
        this.logger.log(this.eid + "_Mute", "c");
        this.pm("interaction|" + this.eid + "_Mute,c", "*");
        if (this.playing) {
            this.logger.log(this.eid + "_Audio", "p");
            this.pm("interaction|" + this.eid + "_Audio,p", "*");
        }
    }
    if (this.mute && !this.muted && this.volume > 0) {
        this.mute = false;
        this.logger.log(this.eid + "_Unmute", "c");
        this.pm("interaction|" + this.eid + "_Unmute,c", "*");
        if (this.playing) {
            this.logger.log(this.eid + "_Audio", "s");
            this.pm("interaction|" + this.eid + "_Audio,s", "*");
        }
    }
}
var AiActivHTMLAd = {
    "id": "test",
    "host": "http://",
    "urls": [],
    "vids": [],
    "dco": "",
    "cb": new Date().getTime(),
    "init": function(initOnLoad) {
        this.initOnLoad = initOnLoad;
        if (this.initOnLoad) {
            this.AiActivAd = new AiActivAd(this.id, this.host, "");
        }
        var self = this;

        function _setAdReady() {
            self.setAdReady();
        }
        try {
            window.addEventListener("load", _setAdReady, false);
        } catch (e) {}
        window.addEventListener("message", this.messageHandler, false);
    },
    "track": function(event) {
        this.AiActivAd.log(event, "c");
        this.pm("interaction|" + event + ",c", "*");
    },
    "startTimer": function(event) {
        this.AiActivAd.log(event, "s");
        this.pm("interaction|" + event + ",s", "*");
    },
    "stopTimer": function(event) {
        this.AiActivAd.log(event, "p");
        this.pm("interaction|" + event + ",p", "*");
    },
    "resumeTimer": function(event) {
        this.AiActivAd.log(event, "r");
        this.pm("interaction|" + event + ",r", "*");
    },
    "attachVideo": function(obj) {
        this.vids.push(obj);
        this.AiActivVideo = new AiActivVideo("_Video" + this.vids.length, obj, this.AiActivAd);
    },
    "endVideo": function(event) {
        this.AiActivAd.log(event, "f");
        this.pm("interaction|" + event + ",f", "*");
        this.pm(this.id + "_videoEnded", "*");
    },
    "impact": function() {
        this.pm(this.id + "_impact", "*");
    },
    "expand": function() {
        this.pm(this.id + "_expand", "*");
    },
    "expanded": function() {
        if (!this.initOnLoad) {
            this.AiActivAd = new AiActivAd(this.id, this.host, "");
        }
        this.pm(this.id + "_expanded", "*");
    },
    "subExpand": function() {
        this.pm(this.id + "_subExpand", "*");
    },
    "subExpanded": function() {
        this.pm(this.id + "_subExpanded", "*");
    },
    "subShrink": function() {
        this.pm(this.id + "_subShrink", "*");
    },
    "subShrinked": function() {
        this.pm(this.id + "_subShrinked", "*");
    },
    "shrink": function() {
        this.pm(this.id + "_shrink", "*");
    },
    "shrinked": function() {
        this.pm(this.id + "_shrinked", "*");
    },
    "clearRM": function() {
        this.AiActivAd.clear();
    },
    "close": function() {
        this.pm(this.id + "_close", "*");
    },
    "closed": function() {
        this.pm(this.id + "_closed", "*");
    },
    "click": function(options) {
        // Customize for staging.
        if (typeof(DesignerClickTag[options.clickTAG]) !== 'undefined') {
            this.trace(options);
            window.open(DesignerClickTag[options.clickTAG]);
        } else if (typeof options.url == "string") {
            this.trace(options);
            window.open(options.url);
        }

        //		if(typeof options == "object") {
        //			if(typeof options.clickTAG != "undefined" && typeof this.urls[options.clickTAG] != "undefined") {
        //				var lnk = this.dco != "" ? this.urls[options.clickTAG] + "&type=" + this.dco : this.urls[options.clickTAG];
        //			} else if(typeof options.url == "string") {
        //				var lnk = options.url;
        //			}
        //		}else if(typeof options == "string") {
        //			if(typeof this.urls[options] != "undefined") {
        //				var lnk = this.dco != "" ? this.urls[options] + "&type=" + this.dco : this.urls[options];
        //			}
        //		}
        //		if(typeof lnk != "undefined" && lnk != "") {
        //			window.open(lnk);
        //		} else {
        //			this.trace(options);
        //		}
    },
    "setAdReady": function() {
        this.pm(this.id + "_adReady", "*");
    },
    "setDCO": function(dco) {
        this.dco = dco;
        this.trace("DCO captured: " + this.dco);
    },
    "getParam": function(param) {
        return decodeURIComponent((new RegExp("[?|&]" + param + "=" + "([^&;]+?)(&|#|;|$)").exec(self.location.href) || [, ""])[1].replace(/\+/g, "%20")) || "";
    },
    "dispatch": function(data) {
        (new Image()).src = data;
    },
    "trace": function(msg) {
        try {
            console.log(msg);
        } catch (e) {}
    },
    "pm": function(msg, target) {
        try {
            parent.postMessage(msg, target);
        } catch (e) {}
    },
    "messageHandler": function(event) {
        if (event.data == this.id + "_closeAd") {
            // Clear ad body to mute all audio
            document.getElementsByTagName("body")[0].innerHTML = "";
            setTimeout(function() {
                // Clear Rich Media queue
                AiActivHTMLAd.clearRM();
            }, 50);
        }
    }
};

// For Staging Purposes Only

function aiactivAd_getURLParameterData(name) {
    if (location.href.indexOf("?") > 1) {
        var elem = {};
        var params = location.href.split("?")[1].split("&");

        for (i in params)
            elem[params[i].split("=")[0]] = params[i].split("=")[1];

        if (name in elem)
            return elem[name];
    }
};

AiActivHTMLAd.id = (typeof aiactivAd_getURLParameterData("adid") == "undefined") ? "ad-staging" : aiactivAd_getURLParameterData("adid");
if (typeof aiactivAd_getURLParameterData("init") !== "undefined") {
    AiActivHTMLAd.init(aiactivAd_getURLParameterData("init"));
} else {
    AiActivHTMLAd.init(true);
}

AiActivHTMLAd.socialhub = false;

DesignerClickTag = {
    clickTAG: 'http://www.aiactiv.com',
    clickTAG1: 'http://www.aiactiv.com',
    clickTAG2: 'http://www.aiactiv.com',
};