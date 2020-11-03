import { SLIDER_SPEED } from '../common/constants';
import { stopSliderOnHover, sliderProgress, sliderTransition } from '../common/swiper-helpers';

export default function () {
  var $projectSliderContainer = $('.project-slider__container')
  if (!$projectSliderContainer.length) { return }

  var projectSlider = new Swiper($projectSliderContainer, {
    direction: 'vertical',
    slidesPerView: 1,
    loop: true,
    speed: SLIDER_SPEED,
    autoplay: {
      delay: 3000,
    },
    parallax: true,
    roundLengths: true,
    grabCursor: true,
    navigation: {
      nextEl: '.project-slider__arrow-right',
      prevEl: '.project-slider__arrow-left',
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
        sliderProgress(swiper, '.project-slide__image');
      },
      setTransition: function (speed) {
        var swiper = this;
        sliderTransition(swiper, '.project-slide__image', speed);
      }
    }
  });

  // Stop slider on hover
  stopSliderOnHover($projectSliderContainer, projectSlider);
}