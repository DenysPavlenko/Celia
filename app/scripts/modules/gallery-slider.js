import { SLIDER_SPEED } from '../common/constants';
import { stopSliderOnHover, sliderProgress, sliderTransition } from '../common/swiper-helpers';

export default function () {
  var $galleryLeftSlider = $('.gallery-slider__left');
  var $galleryRightSlider = $('.gallery-slider__right');
  if (!$galleryLeftSlider.length) { return }

  // Left slider
  var leftSlider = new Swiper($galleryLeftSlider, {
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,
    simulateTouch: false,
    allowSlidePrev: false,
    draggable: false,
    speed: SLIDER_SPEED,
    parallax: true,
    roundLengths: true,
    autoplay: {
      delay: 4000,
    },
    navigation: {
      nextEl: '.gallery-slider__nav .arrow',
    },
    on: {
      touchStart: function () {
        var swiper = this;
        var slidesLength = swiper.slides.length;
        for (var i = 0; i < slidesLength; i++) {
          swiper.slides[i].style.transition = '';
        }
      },
      progress: function () {
        var swiper = this;
        sliderProgress(swiper, '.gallery-slider__image');
      },
      setTransition: function (speed) {
        var swiper = this;
        sliderTransition(swiper, '.gallery-slider__image', speed);
      }
    }
  });

  // Right slider
  var rightSlider = new Swiper($galleryRightSlider, {
    direction: 'horizontal',
    slidesPerView: 1,
    loop: true,
    simulateTouch: false,
    allowSlidePrev: false,
    draggable: false,
    speed: SLIDER_SPEED,
    parallax: true,
    roundLengths: true,
    on: {
      init: function () {
        var swiper = this;
        swiper.slides[swiper.activeIndex].querySelector('.animated-letters--lfr').classList.add('animated-letters--lfr-active');
      },
      touchStart: function () {
        var swiper = this;
        var slidesLength = swiper.slides.length;
        for (var i = 0; i < slidesLength; i++) {
          swiper.slides[i].style.transition = '';
        }
      },
      progress: function () {
        var swiper = this;
        sliderProgress(swiper, '.gallery-slider__image');
      },
      setTransition: function (speed) {
        var swiper = this;
        sliderTransition(swiper, '.gallery-slider__image', speed);
      }
    }
  });

  // rightSlider evetns
  rightSlider.on('slideChange', function () {
    var swiper = this;
    swiper.slides[swiper.activeIndex].querySelector('.animated-letters--lfr').classList.add('animated-letters--lfr-active');
  });
  rightSlider.on('fromEdge', function () {
    var swiper = this;
    for (var i = 0; i < swiper.slides.length; i++) {
      swiper.slides[i].querySelector('.animated-letters--lfr').classList.remove('animated-letters--lfr-active');
    }
  });

  // Bind sliders to each other
  leftSlider.controller.control = rightSlider;
  rightSlider.controller.control = leftSlider;

  // Stop sliders on hover
  stopSliderOnHover($('.gallery-slider__left'), leftSlider);
  stopSliderOnHover($('.gallery-slider__right'), leftSlider);
  stopSliderOnHover($('.gallery-slider__nav'), leftSlider);
}