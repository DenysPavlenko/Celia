import { TIMING_FUNCTION, MOBILE_SCREEN_START } from '../common/constants';
import addAnimationClass from '../common/add-animation-class';
import removeAnimationClass from '../common/remove-animation-class';

export default function () {
  var $section = $('.home-slide');
  var $slidesCount = $('.home-slides-counter__count');
  var $progressCounter = $('.home-slides-counter');
  var $progressBar = $('.home-slides-counter__progress-bar');
  var scrollSpeed = 1000;
  var isMobile = false;
  var totalSlides;

  $('#homeSlides').fullpage({
    sectionSelector: $section,
    scrollingSpeed: scrollSpeed,
    easingcss3: TIMING_FUNCTION,
    continuousVertical: true,
    responsiveWidth: MOBILE_SCREEN_START,
    responsiveHeight: 520,

    // Trigger on the page render
    afterRender: function () {
      var slides = $(this);
      var $oddSlide = $section.filter(':odd');
      totalSlides = slides.children().length;
      // Add an accent color to each odd article
      $oddSlide.addClass('bg-primary');
      // Change an image order for each odd article
      $oddSlide.find('.col-xl-5').addClass('order-lg-2');
      // Add counter number and progressbar width
      $slidesCount.html(1 + '/' + totalSlides);
      slideAnimation($progressCounter, 'add');
    },
    // Trigger after slide load
    afterLoad: function () {
      var $currentSlide = $(this);
      // Add animation to current slide
      slideAnimation($currentSlide, 'add');
    },
    // Trigger on the slide leave
    onLeave: function (prevIndex, index) {
      // Remove animation from prev slide
      if (!isMobile) {
        var $prevSlide = $(this);
        setTimeout(function () {
          slideAnimation($prevSlide, 'remove');
        }, scrollSpeed);
        var progressFill = (index - 1) / (totalSlides - 1) * 100;
        $slidesCount.html(index + '/' + totalSlides);
        $progressBar.css({
          '-webkit-transition': scrollSpeed + 'ms ' + TIMING_FUNCTION,
          '-moz-transition': scrollSpeed + 'ms ' + TIMING_FUNCTION,
          '-o-transition': scrollSpeed + 'ms ' + TIMING_FUNCTION,
          'transition': scrollSpeed + 'ms ' + TIMING_FUNCTION,
          'width': progressFill + '%',
        });
      }
    },
    afterResponsive: function (isResponsive) {
      isMobile = isResponsive ? true : false;
    }
  });

  // Add/remove slide animation
  function slideAnimation(elem, action) {
    var $items = elem.attr('data-slide-animation') ? elem : elem.find('[data-slide-animation]');
    $items.each(function () {
      if (action === 'add') {
        addAnimationClass($(this), 'data-slide-animation')
      } else if (action === 'remove') {
        removeAnimationClass($(this), 'data-slide-animation')
      }
    })
  }
}