var Track = {
    clickTag: function() {
        AiActivHTMLAd.click({
            clickTAG: "clickTAG"
        });
    }
}

// ========== AiActiv Tracking Helper ==========

var timerTrackingID = null;

function triggerClickTag(clickTag) {
    if (typeof(pauseAllVideo) === 'function') {
        // Helper function to pause all video.
        pauseAllVideo();
    }
    AiActivHTMLAd.click({
        clickTAG: clickTag
    });
};

function triggerTrack(track) {
    AiActivHTMLAd.track(track);
};

function triggerTimerStart(id) {
    if (timerTrackingID === id) {
        return;
    }
    triggerTimerStop();
    AiActivHTMLAd.startTimer(id);
    timerTrackingID = id;
};

function triggerTimerStop() {
    if (timerTrackingID !== null) {
        AiActivHTMLAd.stopTimer(timerTrackingID);
    }
};

function trackingReset() {
    triggerTimerStop();
    timerTrackingID = null;
};