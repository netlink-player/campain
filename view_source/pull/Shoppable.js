function shoppableAd(opts) {
    var opts_ = mergeObject_({
        jsonUrls: null,
        template: function() {},
        readyCallback: null
    }, opts, 'shoppableAd');

    var clampJs = (typeof $clamp !== 'undefined') ? $clamp : function() {};
    var shopContainer, shopContent, shopLists, shopShading, continueAlert, userStartScroll = false;

    initClass_();

    function initClass_() {
        shopContainer = document.querySelector('#shoppingContainer');
        shopContent = document.querySelector('#shoppingContent');
        shopLists = document.querySelector('#shoppingLists');
        continueAlert = document.querySelector('.shopping-continue');
        shopShading = document.querySelector('.shopping-shading');

        ajaxForJsonData_();
    }

    function ajaxCompleted_(jsonData) {
        var brandid = jsonData.brandid || '';
        var items = jsonData.item || [];

        parseItemsToMat(items);
        if (typeof opts_.readyCallback === 'function') {
            opts_.readyCallback();
        }
    }

    function ajaxForJsonData_() {
        new AiActivAppsJsonLoader(opts_.jsonUrls, ajaxCompleted_);
    }

    function parseItemsToMat(i) {
        var templates = [];

        if (typeof i === 'undefined' || shopLists == null) {
            return;
        }

        i.forEach(function(k, i) {
            if (typeof k.sale_price !== 'undefined' && typeof k.price !== 'undefined') {
                var promoPercent = Math.floor((1 - (k.sale_price / k.price)) * 100);
            }
            templates[i] = opts_.template({
                image_link: k.image_link,
                title: k.title,
                description: k.description,
                sale_price: k.sale_price,
                price: k.price,
                link: k.link,
                percent: promoPercent > 0 ? '-' + promoPercent + '%' : ''
            }, mergeObject_);
        });

        if (typeof generateMaterial === 'function') {
            templates.forEach(function(k, i) {
                generateMaterial(k, shopLists);
            });
        }

        var paragraphs = Array.from(document.querySelectorAll('.shopping-title > p'));
        paragraphs.forEach(function(p, i) {
            clampJs(p, {
                clamp: 4
            });
        });

        setTimeout(itemShowUp, 100);
        shopContent.addEventListener('scroll', scrollState, !1);
    }

    function itemShowUp() {
        var shopIt = Array.from(document.querySelectorAll('.shopping-item'));
        var speed = 0.1;
        shopIt.forEach(function(k, i) {
            k.style.transitionDelay = (i * speed) + 's';
            k.classList.add('reveal');
        });
    }

    function addContinueScroll() {
        var contH = shopContent.offsetHeight,
            listsH = shopLists.offsetHeight;

        if (contH < listsH) {
            continueAlert.classList.add('force-display');
        }
    }

    function scrollState(event) {
        var scrollLvl_ = shopContent.scrollTop;
        var height_ = shopContent.offsetHeight;

        shopShading.classList.remove('force-display');

        if (scrollLvl_ > height_ / 4) {
            shopShading.classList.add('force-display');
        }
    }
}

function AiActivAppsJsonLoader(url, completedCallback) {
    let jsonData_ = {};

    initClass_();

    function initClass_() {
        initProcessUrls_();
    }

    function initProcessUrls_() {
        get_(url);
    }

    function get_(url) {
        let ajaxRequester = new XMLHttpRequest();
        ajaxRequester.overrideMimeType('application/json');
        ajaxRequester.open('GET', url);
        ajaxRequester.addEventListener('readystatechange', onReadyStateChanged__);
        ajaxRequester.send();

        function onReadyStateChanged__() {
            if (ajaxRequester.readyState === 4) {
                if (ajaxRequester.status !== 200) {
                    console.error('Error happen during JSON ajax request!');
                    requestCompleted_();
                    return;
                }

                try {
                    jsonData_ = JSON.parse(ajaxRequester.responseText);
                } catch (e) {
                    console.error('Error parsing JSON!', e);
                }

                requestCompleted_();
            }
        }
    }

    function requestCompleted_() {
        if (typeof completedCallback === 'function') {
            completedCallback(jsonData_);
        }
    }
}

function mergeObject_(defaultObj, overrideObject, reference) {
    for (let attributeKey_ in overrideObject) {
        if (defaultObj.hasOwnProperty(attributeKey_)) {
            if (overrideObject[attributeKey_] != void 0) {
                defaultObj[attributeKey_] = overrideObject[attributeKey_];
            }
        } else {
            console.warn('Key [' + attributeKey_ + '] not found in object merging process.', reference);
        }
    }

    return defaultObj;
}

/*!
 * Clamp.js 0.5.1
 *
 * Copyright 2011-2013, Joseph Schmitt http://joe.sh
 * Released under the WTFPL license
 * http://sam.zoy.org/wtfpl/
 */
(function() {
    window.$clamp = function(c, d) {
        function s(a, b) {
            n.getComputedStyle || (n.getComputedStyle = function(a, b) {
                this.el = a;
                this.getPropertyValue = function(b) {
                    var c = /(\-([a-z]){1})/g;
                    "float" == b && (b = "styleFloat");
                    c.test(b) && (b = b.replace(c, function(a, b, c) {
                        return c.toUpperCase()
                    }));
                    return a.currentStyle && a.currentStyle[b] ? a.currentStyle[b] : null
                };
                return this
            });
            return n.getComputedStyle(a, null).getPropertyValue(b)
        }

        function t(a) {
            a = a || c.clientHeight;
            var b = u(c);
            return Math.max(Math.floor(a / b), 0)
        }

        function x(a) {
            return u(c) *
                a
        }

        function u(a) {
            var b = s(a, "line-height");
            "normal" == b && (b = 1.2 * parseInt(s(a, "font-size")));
            return parseInt(b)
        }

        function l(a) {
            if (a.lastChild.children && 0 < a.lastChild.children.length) return l(Array.prototype.slice.call(a.children).pop());
            if (a.lastChild && a.lastChild.nodeValue && "" != a.lastChild.nodeValue && a.lastChild.nodeValue != b.truncationChar) return a.lastChild;
            a.lastChild.parentNode.removeChild(a.lastChild);
            return l(c)
        }

        function p(a, d) {
            if (d) {
                var e = a.nodeValue.replace(b.truncationChar, "");
                f || (h = 0 < k.length ?
                    k.shift() : "", f = e.split(h));
                1 < f.length ? (q = f.pop(), r(a, f.join(h))) : f = null;
                m && (a.nodeValue = a.nodeValue.replace(b.truncationChar, ""), c.innerHTML = a.nodeValue + " " + m.innerHTML + b.truncationChar);
                if (f) {
                    if (c.clientHeight <= d)
                        if (0 <= k.length && "" != h) r(a, f.join(h) + h + q), f = null;
                        else return c.innerHTML
                } else "" == h && (r(a, ""), a = l(c), k = b.splitOnChars.slice(0), h = k[0], q = f = null);
                if (b.animate) setTimeout(function() {
                    p(a, d)
                }, !0 === b.animate ? 10 : b.animate);
                else return p(a, d)
            }
        }

        function r(a, c) {
            a.nodeValue = c + b.truncationChar
        }
        d = d || {};
        var n = window,
            b = {
                clamp: d.clamp || 2,
                useNativeClamp: "undefined" != typeof d.useNativeClamp ? d.useNativeClamp : !0,
                splitOnChars: d.splitOnChars || [".", "-", "\u2013", "\u2014", " "],
                animate: d.animate || !1,
                truncationChar: d.truncationChar || "\u2026",
                truncationHTML: d.truncationHTML
            },
            e = c.style,
            y = c.innerHTML,
            z = "undefined" != typeof c.style.webkitLineClamp,
            g = b.clamp,
            v = g.indexOf && (-1 < g.indexOf("px") || -1 < g.indexOf("em")),
            m;
        b.truncationHTML && (m = document.createElement("span"), m.innerHTML = b.truncationHTML);
        var k = b.splitOnChars.slice(0),
            h = k[0],
            f, q;
        "auto" == g ? g = t() : v && (g = t(parseInt(g)));
        var w;
        z && b.useNativeClamp ? (e.overflow = "hidden", e.textOverflow = "ellipsis", e.webkitBoxOrient = "vertical", e.display = "-webkit-box", e.webkitLineClamp = g, v && (e.height = b.clamp + "px")) : (e = x(g), e <= c.clientHeight && (w = p(l(c), e)));
        return {
            original: y,
            clamped: w
        }
    }
})();