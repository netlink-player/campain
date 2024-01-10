function AiActivAppsCards(elID, opts) {
    this.showCards = showCards;
    this.hideCards = hideCards;
    this.swipeToNext = swipeToNext;
    this.politeLoad = politeLoadingCard;
    this.mouseClicking = mouseClicking;

    const CARD_SEQUENCE_CSS_CLASS = 'aiactiv-apps-card-';
    const INIT_HIDING_CSS_CLASS = 'aiactiv-apps-hide-card';
    const ANIMATED_TO_LEFT_CSS_CLASS = 'aiactiv-apps-moving-to-left';
    const ANIMATED_TO_RIGHT_CSS_CLASS = 'aiactiv-apps-moving-to-right';
    const CARD_TRANSITION_CSS_CLASS = 'aiactiv-apps-card-transition';
    const FOLLOW_FINGER_CSS_CLASS = 'aiactiv-apps-cards-follow-finger';
    const OVERFLOW_CARD_CSS_CLASS = 'aiactiv-apps-hidding-cards';
    const APPPEND_CARD_CSS_CLASS = 'aiactiv-apps-append-cards';

    let extraOptions = mergeObject({
        callbackWhenCardAppear: null
    }, opts, 'extraOptions');
    let containerEl = null;
    let curActiveCardEl = null;;
    let cardCssClasses = [];
    let cardEls = [];
    let curCardIndex = 0;
    let cardIndexForDisplay = 0;
    let cardStillAnimate = false;
    // This must be same as animation duration inside AiActivAppsCards.css aiactiv-apps-moving-to-left | aiactiv-apps-moving-to-right
    let animationDuration = 500;
    let politeLoaded = false,
        loadedCardsTotal;
    let initX = 0,
        updatedLeft = 0,
        cardLeftPosition = 0.06,
        isTouch = false,
        isFirstSwipe = true;
    // let defaultTracker = new AiActivAppsCardsDefaultTracking();
    var mouseClickedEvent = true;

    let version = '4.3.2';

    initClass();

    function initClass() {
        containerEl = document.getElementById(elID);

        retrieveAllCard();
        bindEvent();
        onResize();
    }

    function retrieveAllCard() {
        for (let i = 1; i < 100; i++) {
            let cards = document.getElementsByClassName(CARD_SEQUENCE_CSS_CLASS + i);
            if (cards.length === 0) {
                break;
            }

            cardCssClasses.push(CARD_SEQUENCE_CSS_CLASS + i);
            cardEls.push(cards[0]);
        }

        cardIndexForDisplay = cardEls.length - 1;
    }

    function bindEvent() {
        window.addEventListener('resize', onResize, false);

        for (var i = 0; i < cardEls.length; i++) {
            cardEls[i].addEventListener('touchstart', touchStart, false);
            cardEls[i].addEventListener('touchmove', touchMove, false);
            cardEls[i].addEventListener('touchend', touchEnd, false);

            cardEls[i].addEventListener('mousedown', mouseStart, false);
            cardEls[i].addEventListener('mousemove', mouseMove, false);
            cardEls[i].addEventListener('mouseup', mouseEnd, false);
            document.addEventListener('mouseout', mouseEnd, false);
        }
    }

    function touchStart(e) {
        if (cardStillAnimate === false) {
            isTouch = true;
            initX = e.changedTouches[0].clientX;
            updatedLeft = (window.innerWidth * cardLeftPosition);
            curActiveCardEl = cardEls[curCardIndex];

            slideFingerWithAnimationFrame();
        }
    }

    function touchMove(e) {
        e.preventDefault();
        if (isTouch === true) {
            updatedLeft = (window.innerWidth * cardLeftPosition) + e.changedTouches[0].clientX - initX;

            curActiveCardEl.classList.add(FOLLOW_FINGER_CSS_CLASS);
            curActiveCardEl.classList.remove(CARD_TRANSITION_CSS_CLASS);
        }
    }

    function touchEnd(e) {
        if (isTouch === true) {
            isTouch = false;

            var xMovement = e.changedTouches[0].clientX - initX;
            if (xMovement < -containerEl.offsetWidth * 0.25) {
                cardStillAnimate = true;
                runCardAnimation(ANIMATED_TO_LEFT_CSS_CLASS);
                // defaultTracker.trackToLeft();
            } else if (xMovement > containerEl.offsetWidth * 0.25) {
                cardStillAnimate = true;
                runCardAnimation(ANIMATED_TO_RIGHT_CSS_CLASS);
                // defaultTracker.trackToRight();
            } else {
                curActiveCardEl.style.left = '';
            }

            updatedLeft = 0;
            curActiveCardEl.classList.remove(FOLLOW_FINGER_CSS_CLASS);
            curActiveCardEl.classList.add(CARD_TRANSITION_CSS_CLASS);
        }
    }

    function mouseStart(e) {
        if (cardStillAnimate === false) {
            isTouch = true;
            initX = e.pageX;
            updatedLeft = (window.innerWidth * cardLeftPosition);
            curActiveCardEl = cardEls[curCardIndex];

            slideFingerWithAnimationFrame();
        }
        mouseClickedEvent = true;
    };

    function mouseMove(e) {
        e.preventDefault();
        mouseClickedEvent = false;
        if (isTouch === true) {
            updatedLeft = (window.innerWidth * cardLeftPosition) + e.pageX - initX;

            curActiveCardEl.classList.add(FOLLOW_FINGER_CSS_CLASS);
            curActiveCardEl.classList.remove(CARD_TRANSITION_CSS_CLASS);
        }
    };

    function mouseClicking() {
        return mouseClickedEvent;
    };

    function mouseEnd(e) {
        if (isTouch === true) {
            isTouch = false;

            var xMovement = e.pageX - initX;
            if (xMovement < -containerEl.offsetWidth * 0.25) {
                cardStillAnimate = true;
                runCardAnimation(ANIMATED_TO_LEFT_CSS_CLASS);
                // defaultTracker.trackToLeft();
            } else if (xMovement > containerEl.offsetWidth * 0.25) {
                cardStillAnimate = true;
                runCardAnimation(ANIMATED_TO_RIGHT_CSS_CLASS);
                // defaultTracker.trackToRight();
            } else {
                curActiveCardEl.style.left = '';
            }

            updatedLeft = 0;
            curActiveCardEl.classList.remove(FOLLOW_FINGER_CSS_CLASS);
            curActiveCardEl.classList.add(CARD_TRANSITION_CSS_CLASS);
        }
    };

    function onResize() {
        containerEl.style.width = window.innerWidth + 'px';
        containerEl.style.height = window.innerWidth * 0.5625 + 'px';

        let newLeft = ((window.innerWidth - containerEl.clientWidth) / 2) / window.innerWidth * 100;
        if (newLeft < 0) {
            newLeft = 0;
        }
        containerEl.style.left = newLeft + '%';

        let newTop = ((window.innerHeight - containerEl.clientHeight) / 2) / window.innerHeight * 100;
        if (newTop < 0) {
            newTop = 0;
        }
        containerEl.style.top = newTop + '%';
    }

    function slideFingerWithAnimationFrame() {
        if (isTouch === true) {
            curActiveCardEl.style.left = updatedLeft + 'px';
            window.requestAnimFrame(slideFingerWithAnimationFrame);
        }
    };

    function runCardAnimation(cssClass) {
        if (curActiveCardEl.classList.contains('aiactiv-apps-last-card') === true) {
            return;
        }

        hideSkinner();

        curActiveCardEl.classList.add(cssClass);

        setTimeout(function() {
            curActiveCardEl.style.left = '';
            swapCardPosition();
            increaseCurCardIndex();
        }, animationDuration / 2.5);

        setTimeout(function() {
            curActiveCardEl.classList.remove(cssClass);
            cardStillAnimate = false;
            // cardAppearEvent();
        }, animationDuration);
    }

    // function cardAppearEvent() {
    //     defaultTracker.trackTimer(cardEls[curCardIndex].getAttribute('data-track'));

    //     if (typeof(extraOptions.callbackWhenCardAppear) === 'function') {
    //         extraOptions.callbackWhenCardAppear(cardEls[curCardIndex]);
    //     }
    // }

    function hideSkinner() {
        if (isFirstSwipe === true) {
            isFirstSwipe = false;
            document.getElementById('aiactiv-apps-cards-skinner').style.display = 'none';
        }
    };

    function swapCardPosition() {
        for (let i = 0; i < cardEls.length; i++) {
            let curEl = cardEls[i];

            for (let j = 0; j < cardCssClasses.length; j++) {
                if (curEl.classList.contains(cardCssClasses[0])) {
                    curEl.classList.remove(cardCssClasses[0]);
                    //curEl.classList.add('aiactiv-apps-out-of-screen-cards');
                    curEl.classList.add(cardCssClasses[cardCssClasses.length - 1]);
                    if (cardCssClasses.length - 1 > 4) {
                        curEl.classList.add(OVERFLOW_CARD_CSS_CLASS);
                    }
                    break;
                } else if (curEl.classList.contains(cardCssClasses[j])) {
                    curEl.classList.remove(cardCssClasses[j]);
                    if (curEl.classList.contains(OVERFLOW_CARD_CSS_CLASS)) {
                        curEl.classList.remove(OVERFLOW_CARD_CSS_CLASS);
                    }
                    curEl.classList.add(cardCssClasses[j - 1]);
                    break;
                }
            }
        }

        // let card4ElToVisible = document.querySelector('.aiactiv-apps-card-4.aiactiv-apps-hidding-cards');
        // if (card4ElToVisible === null) {
        //   return;
        // }

        // card4ElToVisible.classList.remove('aiactiv-apps-hidding-cards');
    }

    function increaseCurCardIndex() {
        curCardIndex++;
        if (curCardIndex > cardEls.length - 1) {
            curCardIndex = 0;
        }
    }

    function mergeObject(defaultObj, overrideObject, reference) {
        for (let attributeKey in overrideObject) {
            if (defaultObj.hasOwnProperty(attributeKey)) {
                defaultObj[attributeKey] = overrideObject[attributeKey];
            } else {
                console.warn('[Version ' + version + '] Key [' + attributeKey + '] not found in object merging process.', reference);
            }
        }

        return defaultObj;
    }

    function showCards() {
        setTimeout(displayCards, 600);

    }

    function displayCards() {
        cardEls[cardIndexForDisplay].classList.remove(INIT_HIDING_CSS_CLASS);
        cardIndexForDisplay--;

        if (cardIndexForDisplay < 0) {
            cardIndexForDisplay = cardEls.length - 1;
            // if (timerTrackingID === null) {
            //     defaultTracker.trackTimer(cardEls[curCardIndex].getAttribute('data-track') + '_default');
            // }
            return;
        }

        setTimeout(displayCards, 80);
    }

    function hideCards() {
        for (let i = 0; i < cardEls.length; i++) {
            cardEls[i].classList.add(INIT_HIDING_CSS_CLASS);
        }
    }

    function swipeToNext() {
        if (cardStillAnimate === true) {
            return;
        }

        cardStillAnimate = true;
        curActiveCardEl = cardEls[curCardIndex];
        runCardAnimation(ANIMATED_TO_LEFT_CSS_CLASS);
    }

    function politeLoadingCard() {
        if (politeLoaded === true) {
            return;
        }
        politeLoaded = true;
        loadedCardsTotal = cardEls.length;
        if (document.getElementsByClassName(APPPEND_CARD_CSS_CLASS).length == 0) {
            return;
        }
        for (var ac = 1; ac <= document.getElementsByClassName(APPPEND_CARD_CSS_CLASS).length; ac++) {
            var _c = document.getElementsByClassName(CARD_SEQUENCE_CSS_CLASS + (loadedCardsTotal + ac));
            cardCssClasses.push(CARD_SEQUENCE_CSS_CLASS + (loadedCardsTotal + ac));
            cardEls.push(_c[0]);
        }
        document.getElementsByClassName(cardCssClasses[loadedCardsTotal - 1])[0].classList.add(CARD_SEQUENCE_CSS_CLASS + cardEls.length);
        document.getElementsByClassName(cardCssClasses[loadedCardsTotal - 1])[0].classList.remove(CARD_SEQUENCE_CSS_CLASS + loadedCardsTotal);
        for (var l = loadedCardsTotal; l < cardEls.length; l++) {
            var removeIndex = cardEls.length + 1 - (cardEls.length % l);
            cardEls[l].classList.add(CARD_SEQUENCE_CSS_CLASS + l);
            cardEls[l].classList.remove(CARD_SEQUENCE_CSS_CLASS + removeIndex);
            cardEls[l].addEventListener('touchstart', touchStart, false);
            cardEls[l].addEventListener('touchmove', touchMove, false);
            cardEls[l].addEventListener('touchend', touchEnd, false);
        }
        for (var m = 0; m < cardCssClasses.length; m++) {
            if (m >= 4) {
                document.getElementsByClassName(cardCssClasses[m])[0].classList.add(OVERFLOW_CARD_CSS_CLASS);
            } else {
                document.getElementsByClassName(cardCssClasses[m])[0].classList.remove(OVERFLOW_CARD_CSS_CLASS);
            }
        }
    }
}

function AiActivAppsCardsDefaultTracking() {
    this.trackToLeft = trackToLeft;
    this.trackToRight = trackToRight;
    this.trackTimer = trackTimer;

    function trackToLeft() {
        triggerTrack('btn_card_left');
    }

    function trackToRight() {
        triggerTrack('btn_card_right');
    }

    function trackTimer(id) {
        triggerTimerStart(id);
    }
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();