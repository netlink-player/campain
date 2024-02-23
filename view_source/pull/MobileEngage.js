function mePullUp(opts = {}) {
    this.getBannerContentEl = getBannerContentEl;
    this.customResize = customResize;
    this.expanded = expanded;
    this.shrinked = shrinked;

    let extraOptions_ = mergeObject_({
        hideBestView: false,
    }, opts, 'Mobile Pull Up Object.');

    var bannerAd = new Banner();
    let bestViewEl_ = null;
    if (extraOptions_.hideBestView === false) {
        bestViewEl_ = new BestView();
    }

    initClass();

    function initClass() {
        window.addEventListener('resize', onResize, false);
        onResize();
    };

    function onResize() {
        if (bestViewEl_ === null) {
            return;
        }

        bestViewEl_.onResize();
    }

    function customResize(proxyScreenHeight) {
        if (bestViewEl_ === null) {
            return;
        }

        bestViewEl_.onResize(null, proxyScreenHeight);
    }

    function getBannerContentEl() {
        return bannerAd.getContentEl();
    };

    function expanded() {
        msgParent("expanded");
        bannerAd.bannerExpanded();
    };

    function shrinked() {
        bannerAd.bannerShrinked();
    };

    function msgParent(operation, data) {
        switch (operation) {
            case 'expanded':
                AiActivHTMLAd.expanded();
                break;
            case 'onfocus':
                if (data !== null) {
                    AiActivHTMLAd.pm({
                        name: AiActivHTMLAd.id + '_iosKeyboardShown',
                        top: data.dimension
                    }, '*');
                }
                break;
            case 'onblur':
                AiActivHTMLAd.pm(AiActivHTMLAd.id + '_iosKeyboardHide', '*');
                break;
        }
    };

    function mergeObject_(defaultObj, overrideObject, reference) {
        for (let attributeKey in overrideObject) {
            if (defaultObj.hasOwnProperty(attributeKey)) {
                defaultObj[attributeKey] = overrideObject[attributeKey];
            } else {
                console.warn('Key [' + attributeKey + '] not found in object merging process.', reference);
            }
        }

        return defaultObj;
    }

    // Class object.
    function Banner() {
        this.getContentEl = getContentEl;
        this.bannerExpanded = bannerExpanded;
        this.bannerShrinked = bannerShrinked;

        var _contentEl = document.getElementById('ad-banner');

        function getContentEl() {
            return _contentEl;
        };

        function bannerExpanded() {
            // Show full banner in 3:4 ratio screen.
            if (window.innerWidth / window.innerHeight > 0.74) {
                _contentEl.classList.add('small-screen');
            }
        };

        function bannerShrinked() {
            // Show full banner in 3:4 ratio screen.
            if (window.innerWidth / window.innerHeight > 0.74) {
                _contentEl.classList.remove('small-screen');
            }
        };
    };

    function BestView() {
        this.onResize = onResize;

        var bestViewEl = null,
            bestViewTextEl = null;

        initClass();

        function initClass() {
            bestViewEl = document.getElementById('banner-better-experience');
            bestViewTextEl = document.getElementById('banner-better-text');
        };

        function onResize(event, proxyScreenHeight) {
            if (document.querySelector('input:focus') !== null || document.querySelector('textarea:focus') !== null) {
                return;
            }

            if (window.innerWidth > window.innerHeight || window.innerWidth >= proxyScreenHeight) {
                bestViewEl.style.display = '';
                bestViewTextEl.style.paddingTop = ((window.innerHeight - 150) / 4 * 3) + 'px';
            } else {
                bestViewEl.style.display = 'none';
            }
        };
    };
}

function disableDefaultPropagation(e) {
    e.preventDefault();
    e.stopPropagation();
};

function getIntNumber(variable) {
    var intNumber = parseInt(variable);
    if (isNaN(intNumber) === true) {
        intNumber = 0;
    }
    return intNumber;
};