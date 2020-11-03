import addAnimationClass from '../common/add-animation-class';

export default function () {
  var $items = $('[data-scroll-animation]');
  if (!$items.length) { return }
  var windowHeight = $(window).height();
  var bottomOffset = '85%';
  var resizeEnd;

  // Change windowHeight on resize
  $(window).on('resize', function () {
    clearTimeout(resizeEnd);
    resizeEnd = setTimeout(function () {
      windowHeight = $(window).height();
    }, 100);
  });
  // Run scrollAnimation
  scrollAnimation();
  // ScrollAnimation on window scroll
  $(window).on('scroll', scrollAnimation);

  // Scroll animation function
  function scrollAnimation() {
    var windowScrollTop = $(window).scrollTop();
    var windowOffset = windowScrollTop + windowHeight * parseInt(bottomOffset) / 100;

    // Add an animation class to each element
    $items.each(function () {
      var $elem = $(this);
      if ($elem.offset().top <= windowOffset) {
        addAnimationClass($elem, 'data-scroll-animation')
      }
    })
  }
}