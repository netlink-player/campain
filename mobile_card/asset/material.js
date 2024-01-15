var innityAppsGenericBackground = "bg.jpg";
var innityAppsMaterials = [
    {elType: 'img', cssClass: ['card-background'], attrs: {src: 'bg.jpg'}},
    {
        id: 'card-container', childs: [
            {
                id: 'card-a',
                cssClass: ['innity-apps-cards', 'innity-apps-card-transition', 'innity-apps-card-1', 'innity-apps-hide-card'],
                attrs: {'data-track': 'card_a'},
                childs: [
                    {
                        cssClass: ['card-content-wrapper'], childs: [
                            {
                                cssClass: ['card-fades-wrapper'], childs: [
                                    {
                                        elType: 'img',
                                        cssClass: ['card-image'],
                                        attrs: {src: 'card_1.jpg', 'data-clicktag': 'clickTAG'}
                                    },
                                    {
                                        elType: 'img',
                                        cssClass: ['card-image', 'cta'],
                                        attrs: {src: 'cta1.png', 'data-clicktag': 'clickTAG'}
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },

            {
                id: 'card-b',
                cssClass: ['innity-apps-cards', 'innity-apps-card-transition', 'innity-apps-card-2', 'innity-apps-hide-card'],
                attrs: {'data-track': 'card_b'},
                childs: [
                    {
                        cssClass: ['card-content-wrapper'], childs: [
                            {
                                cssClass: ['card-fades-wrapper'], childs: [
                                    {
                                        elType: 'img',
                                        cssClass: ['card-image'],
                                        attrs: {src: 'card_2.jpg', 'data-clicktag': 'clickTAG1'}
                                    },
                                    {
                                        elType: 'img',
                                        cssClass: ['card-image', 'cta'],
                                        attrs: {src: 'cta2.png', 'data-clicktag': 'clickTAG1'}
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },

            {
                id: 'card-c',
                cssClass: ['innity-apps-cards', 'innity-apps-card-transition', 'innity-apps-card-3', 'innity-apps-hide-card'],
                attrs: {'data-track': 'card_c'},
                childs: [
                    {
                        cssClass: ['card-content-wrapper'], childs: [
                            {
                                cssClass: ['card-fades-wrapper'], childs: [
                                    {
                                        elType: 'img',
                                        cssClass: ['card-image'],
                                        attrs: {src: 'card_3.jpg', 'data-clicktag': 'clickTAG2'}
                                    },
                                    {
                                        elType: 'img',
                                        cssClass: ['card-image', 'cta'],
                                        attrs: {src: 'cta3.png', 'data-clicktag': 'clickTAG2'}
                                    },
                                ]
                            }
                        ]
                    }
                ]
            },
        ]
    },

    {
        id: 'card-front-overlay', childs: [
            {
                id: 'educator', cssClass: ['card-education'], childs: [
                    {cssClass: ['small-dot']},
                    {
                        cssClass: ['text'], childs: [
                            {elType: 'img', attrs: {src: 'swipeedu.png'}},
                        ]
                    },
                ]
            }
        ]
    },
    {id: 'desktop-navigation', cssClass: ['innity-apps-desktop-navigation', 'within-desktop']}
];