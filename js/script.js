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
  if (!isMac && isChrome) {
    className = 'win-chrome';
  }

  body.addClass(className);
  console.log("закончился");
}

 document.addEventListener("DOMContentLoaded", ready);