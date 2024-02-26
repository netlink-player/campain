

const urlImage = "https://cdn.jsdelivr.net/gh/netlink-player/campain@master/vib/revolver/revolver/";
let innityAppsMaterials = [
    {
      id: 'innity-apps-expanded-bg', cssClass: ['innity-apps-hide'], childs: [
        {elType: 'img', cssClass: ['expanded-ad-background'], attrs: {src: urlImage + 'background.png'}},
        {id: 'innity-apps-expanded-ad', childs: [
            {id: 'innity-apps-expanded-scene', cssClass: ['innity-apps-expanded-scene'], childs: [
                {id: 'innity-apps-expanded-carol-container', cssClass: ['innity-apps-expanded-carol-container'], childs: [
                    {cssClass: ['innity-apps-carol-big', 'innity-apps-carol-card-1'], childs: [
                        {elType: 'img', cssClass: ['innity-apps-round-corner', 'innity-apps-banner-image'], attrs: {src: '', 'data-src': urlImage + 'banner_1.png'}, clickTag: 'clickTAG'},
                        {id: 'video-wrapper-1'}
                      ]
                    },
                    {cssClass: ['innity-apps-carol-big', 'innity-apps-carol-card-2'], childs: [
                        {elType: 'img', cssClass: ['innity-apps-round-corner', 'innity-apps-banner-image'], attrs: {src: '', 'data-src': urlImage + 'banner_2.png'}, clickTag: 'clickTAG'},
                        {id: 'video-wrapper-2'}
                      ]
                    },
                    {cssClass: ['innity-apps-carol-big', 'innity-apps-carol-card-3'], childs: [
                        {elType: 'img', cssClass: ['innity-apps-round-corner', 'innity-apps-banner-image'], attrs: {src: '', 'data-src': urlImage +'banner_3.png'}, clickTag: 'clickTAG'},
                        {id: 'video-wrapper-3'}
                      ]
                    },
                    
                    {
                        cssClass: ['innity-apps-carol-big', 'innity-apps-carol-card-4'], childs: [
                        {
                            elType: 'img', cssClass: ['innity-apps-round-corner', 'innity-apps-banner-image'], attrs: {src: '', 'data-src': urlImage +'banner_4.png'}, clickTag: 'clickTAG'
                        },
                        {
                          elType: 'img', cssClass: ['innity-apps-banner-image', 'designer_banner_foreground'], attrs: { src: '', 'data-src': urlImage + 'foreground_4.png' },
                        }
                      ]
                    },
                    
                    {
                        cssClass: ['innity-apps-carol-big', 'innity-apps-carol-card-5'], childs: [
                        {
                            elType: 'img', cssClass: ['innity-apps-round-corner', 'innity-apps-banner-image'], attrs: {src: '', 'data-src': urlImage +'banner_5.png'}, clickTag: 'clickTAG'
                        },
                        {
                          elType: 'img', cssClass: ['innity-apps-banner-image', 'designer_banner_foreground'], attrs: { src: '', 'data-src': urlImage +'foreground_5.png' },
                        }
                      ]
                    },
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'innity-apps-invitation-ad', childs: [
        {
          id: 'innity-apps-invitation-scene', cssClass: ['innity-apps-invitation-scene'], childs: [
            {
              id: 'innity-apps-invitation-carol-container', cssClass: ['innity-apps-invitation-carol-container'], childs: [
                {
                  cssClass: ['innity-apps-carol-small', 'innity-apps-carol-card-1'], childs: [
                    {
                      elType: 'img', attrs: {src: urlImage + 'card_1.png'},
                    }
                  ]
                },
                {
                  cssClass: ['innity-apps-carol-small', 'innity-apps-carol-card-2'], childs: [
                    {
                      elType: 'img', attrs: {src: urlImage + 'card_2.png'},
                    }
                  ]
                },
                {
                  cssClass: ['innity-apps-carol-small', 'innity-apps-carol-card-3'], childs: [
                    {
                      elType: 'img', attrs: {src: urlImage + 'card_3.png'},
                    }
                  ]
                },
                {
                  cssClass: ['innity-apps-carol-small', 'innity-apps-carol-card-4'], childs: [
                    {
                      elType: 'img', attrs: {src: urlImage + 'card_4.png'},
                    }
                  ]
                },
                {
                  cssClass: ['innity-apps-carol-small', 'innity-apps-carol-card-5'], childs: [
                    {
                      elType: 'img', attrs: {src: urlImage + 'card_5.png'},
                    }
                  ]
                },
              ]
            }
          ]
        }
      ]
    }
  ];
  
  let adStudioVideoPosterName = urlImage + 'video1.png';
  let adStudioVideoPosterName2 = urlImage + 'video2.png';
  let adStudioVideoPosterName3 = urlImage + 'video3.png';
  let innityAppsVideoClickTag = 'clickTAG';