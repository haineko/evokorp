function ready () {
  console.log("запустился");
  var isChrome = navigator.userAgent.indexOf('Chrome') > -1,
      isSafari = navigator.userAgent.indexOf("Safari") > -1,  
      isMac = (navigator.userAgent.indexOf('Mac OS') != -1),
      body = $('body'),
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

  body.addClass(className);
  console.log("закончился");

  $('.partner__item').BlackAndWhite({
      hoverEffect : true, // default true
      // set the path to BnWWorker.js for a superfast implementation
      webworkerPath : false,
      // to invert the hover effect
      invertHoverEffect: false,
      // this option works only on the modern browsers ( on IE lower than 9 it remains always 1)
      intensity:1,
      speed: { //this property could also be just speed: value for both fadeIn and fadeOut
          fadeIn: 200, // 200ms for fadeIn animations
          fadeOut: 800 // 800ms for fadeOut animations
      },
      onImageReady:function(img) {
          // this callback gets executed anytime an image is converted
      }
  });
}

 document.addEventListener("DOMContentLoaded", ready);