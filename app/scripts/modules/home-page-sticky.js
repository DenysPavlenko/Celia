import { MOBILE_SCREEN_START } from '../common/constants';

export default function () {
  var $articleHeading = $('.home-sticky-article__heading');
  if (!$articleHeading.length) { return }
  var articleHeadingOffset = [];
  var windowHeight = $(window).height();

  // Initialize stickyHeader
  runStickyHeader();

  // Recalculate on resize
  var resizeDelay;
  $(window).on('resize', function () {
    // Set a small delay for each resize
    clearTimeout(resizeDelay);
    resizeDelay = setTimeout(function () {
      windowHeight = $(window).height();
      runStickyHeader();
    }, 100);
  });

  // runStickyHeader function
  function runStickyHeader() {
    if ($(window).width() >= MOBILE_SCREEN_START) {
      getOffsets();
      stickyHeading();
      $(window).on('scroll', stickyHeading);
    } else {
      $(window).off('scroll', stickyHeading);
      $articleHeading.removeClass('home-sticky-article__heading--is-fixed');
    }
  }

  // stickyHeading function
  function stickyHeading() {
    var windowTopOffset = $(window).scrollTop();
    $articleHeading.each(function (idx) {
      var heading = $(this);
      var headingWrap = heading.children();
      var nextHeadingOffset = articleHeadingOffset[idx + 1];
      // Stick or unstick headings on scroll
      if (windowTopOffset >= articleHeadingOffset[idx]) {
        heading.addClass('home-sticky-article__heading--is-fixed');
        // Animated opacity for each element
        var opacity = ((nextHeadingOffset - windowTopOffset) / windowHeight);
        headingWrap.css('opacity', opacity);
      } else {
        heading.removeClass('home-sticky-article__heading--is-fixed');
      }
    });
  }

  /* Get each articleHeading offset */
  function getOffsets() {
    // Set a static position before getting the offsets
    $articleHeading.css('position', 'static');
    $articleHeading.each(function (idx) {
      articleHeadingOffset[idx] = $(this).offset().top;
    })
    // Clear style attr
    $articleHeading.attr('style', '');
  }
}