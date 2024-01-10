function meStandard() {
    this.onResize = onResize;
    this.getBannerContentEl = getBannerContentEl;

    var bannerAd = new Banner();

    initClass();

    function initClass() {
        window.addEventListener('resize', onResize, false);
        onResize();
    };

    function onResize() {
        bannerAd.onResize();
    };

    function getBannerContentEl() {
        return bannerAd.getContentEl();
    };

    // Class object.
    function Banner() {
        this.onResize = onResize;
        this.getContentEl = getContentEl;

        var _contentEl = document.getElementById('banner-content');
        // debugger;

        function onResize() {};

        function getContentEl() {
            return _contentEl;
        };
    };
};

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