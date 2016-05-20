function ready () {
  var preloader = document.querySelector('.page-preloader'),
      hiddenEls = document.querySelectorAll('.preload-hidden'),
      curtain = document.querySelector('.curtain-back');
      banners = document.querySelector('.banner');
      window.onload = function() {

          if (curtain && document.body.clientWidth < 768) {
            $.get('/indexpart.html', function(data) {
                $(".content").append(data)
                    .on('click', '.menu-toggler' , function(e) {
                        e.preventDefault();
                        e.stopPropagation();
                        $('.menu-mobile').toggleClass('open');
                    })
                    .on('click', '.menu-mobile + .content__wrapper, .menu-closer', function(e) {
                      $('.menu-mobile').removeClass('open');
                    })
                    .on('click', '.menu-mobile__lv-1_item > a', function(e) { 
                        e.preventDefault();
                        $(this).parent().toggleClass('open').siblings().removeClass('open');
                    });
            });
          }
          for (var i = 0; i < hiddenEls.length; i++) {
            hiddenEls[i].classList.remove('preload-hidden');
          }
          preloader.remove();

          setTimeout(analyticsCall, 1000);
      };

  var btn = document.querySelector('.entry__btn'),
      entry = document.querySelector('.entry'),
      curtainFooter = document.querySelectorAll('.curtain-footer');

  if (curtain) {
      btn.addEventListener('click', function(e) {
          e.preventDefault();

          $.get('/indexpart.html', function(data) {
              $(".content").append(data);
              initSlider('.banner');
          });

          curtain.classList.add('curtain--hide');
          entry.classList.add('entry--hide');
          for (var i = 0; i < curtainFooter.length; i++) {
            curtainFooter[i].classList.add('curtain-footer--show');
          }
      });
  } else if (banners) {
      initSlider('.banner');
  }

  var body = $('body');

  if (!curtain) {
      var menuToggler = $('.menu-toggler'),
          menuMobile = $('.menu-mobile');
  

      menuToggler.on('click', function(e) {
          e.preventDefault();
          menuMobile.toggleClass('open');
      });
      $('.content__wrapper, .menu-closer').on('click', function() {
        menuMobile.removeClass('open');

      });
      $('.menu-mobile__lv-1_item > a').on('click', function(e) {
          e.preventDefault();
          $(this).parent().toggleClass('open').siblings().removeClass('open');
      });
  }
  
  var isChrome = navigator.userAgent.indexOf('Chrome') > -1,
      isSafari = navigator.userAgent.indexOf("Safari") > -1,  
      isMac = (navigator.userAgent.indexOf('Mac OS') != -1),
      className;
      

  if (isChrome && isSafari) {
      isSafari=false;
  }
  if (isSafari && isMac) {
      className = 'mac-safari';
  }
  if (isChrome && isMac) {
    className = 'mac-chrome';
  }
  if (!isMac && isChrome) {
    className = 'win-chrome';
  }

  body.addClass(className);

  var viewport = document.body.clientWidth;

  var clubdaySlider = document.querySelector('.clubday__slider');

  if (clubdaySlider) {

    if (window.location.hash.length > 0) {
      var optionsExt = {
        initialSlide: 1
      };

      initSlider(clubdaySlider, optionsExt);
      $(clubdaySlider).slick('slickPause');
    } else {
      initSlider(clubdaySlider);
    }

    $(document).on('click', '.slick-dots button', function() {
      $(clubdaySlider).slick('slickPlay');
    });
    
  }

  function initSlider(el, obj) { 

    var options = {
      autoplay: true,
      dots: true,
      autoplaySpeed: 7000,
      pauseOnDotsHover: true,
      pauseOnHover: false,
      arrows: false,
    }
    if (obj) {
       for (var key in obj) {
        options[key] = obj[key];
      }
    }

    $(el).slick(options);
  }
  
  if (document.querySelector('.background--stage')) {
      $('.description-stage').slick({
          autoplay: true,
          dots: false,
          fade: true,
          autoplaySpeed: 9000,
          asNavFor: '.slider__wrap',
          arrows: false
      });
      $('.slider__wrap').slick({
          autoplay: true,
          dots: false,
          fade: true,
          autoplaySpeed: 9000,
          asNavFor: '.description-stage',
          arrows: false
      });
  }

  if (document.querySelector('.scrollbar-inner') && viewport > 767) {
      $('.scrollbar-inner').scrollbar({
        autoScrollSize: false
      });
  }

  var descrLink = document.querySelector(".description__link"),
      dish = document.querySelector(".dish"),
      slider = document.querySelector(".slider--dish"),
      intro = document.querySelector(".main--intro");

  if (descrLink) {
      descrLink.addEventListener('click', function(e) {
          e.preventDefault();
          intro.classList.add('main--hide');
          dish.classList.add('dish--show');
          slider.classList.add('slider--show');
          $('.dish__wrap').slick({
              autoplay: true,
              dots: true,
              fade: true,
              autoplaySpeed: 9000,
              asNavFor: '.slider__wrap--dish',
              arrows: false
          });
          $('.slider__wrap--dish').slick({
              autoplay: true,
              dots: false,
              fade: true,
              autoplaySpeed: 9000,
              asNavFor: '.dish__wrap',
              arrows: false
          });
      });
  }
}

document.addEventListener("DOMContentLoaded", ready);

function initialize() {
    
    var myLatlng = new google.maps.LatLng(53.8924836,27.5782985);

    var myOptions = {
        zoom: 17,
        center: myLatlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        zoomControl: true,
        styles: [
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#b5a57c"
                }, {
                  "lightness": 39
                }
              ]
            }, {
              "featureType": "road",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            }, {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "simplified"
                }
              ]
            }, {
              "featureType": "landscape.natural",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a29061"
                }
              ]
            }, {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a29061"
                }
              ]
            }
        ],
        scrollwheel: false
    };

    var map = new google.maps.Map(document.getElementById("map"), myOptions); 
    var map_point = new google.maps.MarkerImage("img/map-point1.png", new google.maps.Size(164, 106), new google.maps.Point(0,0), new google.maps.Point(70, 53));	
    var nerds = new google.maps.LatLng(53.8924836,27.5782985);
    var marker = new google.maps.Marker({
        position: nerds,
        map: map,
        icon: map_point,
        title: "Casino Opera",
        zIndex: 8
    });  

}
var myMap = document.getElementById("map");
if (myMap) {
    google.maps.event.addDomListener(window, "load", initialize);
} 
function analytics(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
          (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
          m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
          }

function analyticsCall() {
    analytics(window,document,'script','http://www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-69627728-1', 'auto');
    ga('send', 'pageview');
}

(function (d, w, c) { (w[c] = w[c] || []).push(function() { try { w.yaCounter36765400 = new Ya.Metrika({ id:36765400, clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true, trackHash:true, ecommerce:"dataLayer" }); } catch(e) { } }); var n = d.getElementsByTagName("script")[0], s = d.createElement("script"), f = function () { n.parentNode.insertBefore(s, n); }; s.type = "text/javascript"; s.async = true; s.src = "https://mc.yandex.ru/metrika/watch.js"; if (w.opera == "[object Opera]") { d.addEventListener("DOMContentLoaded", f, false); } else { f(); } })(document, window, "yandex_metrika_callbacks");
