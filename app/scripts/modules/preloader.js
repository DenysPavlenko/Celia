export default function (callbacks) {
  var $body = $('body');
  var $preloader = $('.preloader');
  var $preloaderOverlayOne = $('.preloader__overlay-one');
  var $preloaderOverlayTwo = $('.preloader__overlay-two');
  var $preloaderLogo = $('.preloader__logo');

  // hide preloader logo
  $preloaderLogo.addClass('preloader__logo--is-hidden');

  // Add active class to the overlay
  $preloaderOverlayTwo.addClass('preloader__overlay-two--is-shown');
  $preloaderOverlayTwo.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
    $preloaderOverlayOne.addClass('preloader__overlay-one--is-hidden');
    $body.removeClass('loaded');
  });
  // Hide overlay and run callbacks
  $preloaderOverlayOne.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
    $preloader.hide();
    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
  });
}