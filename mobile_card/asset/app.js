let innityAppsCountry = "MY";
let innityAppsCards = null;

function innityAppsBannerLoaded() {
    if (innityAppsCards === null) {
        setCardBackgroundImg(innityAppsGenericBackground);
        innityAppsCards = new InnityAppsMrecCards('card-container', {
            callbackWhenCardSwipe: whenUserSwipeCard,
            callbackAfterCardAppear: startFirstCard
        });
    }
    innityAppsCards.showCards();
    registerClickTagEvent();

    if (innityAppsPlatform.getOS() === 'ios' || innityAppsPlatform.getOS() === 'android') {
        return;
    }

    document.getElementById('innity-apps-ad').classList.add('desktop');
}

function setCardBackgroundImg(bgImgSrc) {
    let cardContentWrappers = document.getElementsByClassName('card-content-wrapper');

    for (let i = 0; i < cardContentWrappers.length; i++) {
        cardContentWrappers[i].style.backgroundImage = 'url(' + bgImgSrc + ')';
    }
}

function whenUserSwipeCard(el) {
    currentActivePost = el.id;

    switch (el.id) {
        case 'card-a':
        case 'card-c':
            break;
    }
}

function bannerShownAtPhoneScreen() {}

function bannerHideFromPhoneScreen() {}

function startFirstCard() { }