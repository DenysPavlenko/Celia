'use strict';

function preloader (callbacks) {
  var $body = $('body');
  var $preloader = $('.preloader');
  var $preloaderOverlayOne = $('.preloader__overlay-one');
  var $preloaderOverlayTwo = $('.preloader__overlay-two');
  var $preloaderLogo = $('.preloader__logo'); // hide preloader logo

  $preloaderLogo.addClass('preloader__logo--is-hidden'); // Add active class to the overlay

  $preloaderOverlayTwo.addClass('preloader__overlay-two--is-shown');
  $preloaderOverlayTwo.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
    $preloaderOverlayOne.addClass('preloader__overlay-one--is-hidden');
    $body.removeClass('loaded');
  }); // Hide overlay and run callbacks

  $preloaderOverlayOne.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
    $preloader.hide();

    for (var i = 0; i < callbacks.length; i++) {
      callbacks[i]();
    }
  });
}

function addAnimationClass (elem, dataAttr) {
  var animationClass = elem.attr(dataAttr);
  var animationDelay = elem.attr(dataAttr + '-delay');
  elem.css({
    '-webkit-animation-delay': animationDelay,
    '-mox-animation-delay': animationDelay,
    '-o-animation-delay': animationDelay,
    'animation-delay': animationDelay
  }).addClass(animationClass);
}

function afterloadAnimations () {
  var $items = $('[data-afterload-animation]');

  if (!$items.length) {
    return;
  } // Add an animation class to each element


  $items.each(function () {
    addAnimationClass($(this), 'data-afterload-animation');
  });
}

function scrollAnimations () {
  var $items = $('[data-scroll-animation]');

  if (!$items.length) {
    return;
  }

  var windowHeight = $(window).height();
  var bottomOffset = '85%';
  var resizeEnd; // Change windowHeight on resize

  $(window).on('resize', function () {
    clearTimeout(resizeEnd);
    resizeEnd = setTimeout(function () {
      windowHeight = $(window).height();
    }, 100);
  }); // Run scrollAnimation

  scrollAnimation(); // ScrollAnimation on window scroll

  $(window).on('scroll', scrollAnimation); // Scroll animation function

  function scrollAnimation() {
    var windowScrollTop = $(window).scrollTop();
    var windowOffset = windowScrollTop + windowHeight * parseInt(bottomOffset) / 100; // Add an animation class to each element

    $items.each(function () {
      var $elem = $(this);

      if ($elem.offset().top <= windowOffset) {
        addAnimationClass($elem, 'data-scroll-animation');
      }
    });
  }
}

var SLIDER_SPEED = 1200;
var TIMING_FUNCTION = 'ease-in-out';
var MOBILE_SCREEN_START = 992;

function homePageSticky () {
  var $articleHeading = $('.home-sticky-article__heading');

  if (!$articleHeading.length) {
    return;
  }

  var articleHeadingOffset = [];
  var windowHeight = $(window).height(); // Initialize stickyHeader

  runStickyHeader(); // Recalculate on resize

  var resizeDelay;
  $(window).on('resize', function () {
    // Set a small delay for each resize
    clearTimeout(resizeDelay);
    resizeDelay = setTimeout(function () {
      windowHeight = $(window).height();
      runStickyHeader();
    }, 100);
  }); // runStickyHeader function

  function runStickyHeader() {
    if ($(window).width() >= MOBILE_SCREEN_START) {
      getOffsets();
      stickyHeading();
      $(window).on('scroll', stickyHeading);
    } else {
      $(window).off('scroll', stickyHeading);
      $articleHeading.removeClass('home-sticky-article__heading--is-fixed');
    }
  } // stickyHeading function


  function stickyHeading() {
    var windowTopOffset = $(window).scrollTop();
    $articleHeading.each(function (idx) {
      var heading = $(this);
      var headingWrap = heading.children();
      var nextHeadingOffset = articleHeadingOffset[idx + 1]; // Stick or unstick headings on scroll

      if (windowTopOffset >= articleHeadingOffset[idx]) {
        heading.addClass('home-sticky-article__heading--is-fixed'); // Animated opacity for each element

        var opacity = (nextHeadingOffset - windowTopOffset) / windowHeight;
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
    }); // Clear style attr

    $articleHeading.attr('style', '');
  }
}

function removeAnimationClass (elem, dataAttr) {
  var animationClass = elem.attr(dataAttr);
  elem.removeClass(animationClass);
}

function homePageSlides () {
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
    responsiveHeight: 600,
    // Trigger on the page render
    afterRender: function afterRender() {
      var slides = $(this);
      var $oddSlide = $section.filter(':odd');
      totalSlides = slides.children().length; // Add an accent color to each odd article

      $oddSlide.addClass('bg-primary'); // Change an image order for each odd article

      $oddSlide.find('.col-xl-5').addClass('order-lg-2'); // Add counter number and progressbar width

      $slidesCount.html(1 + '/' + totalSlides);
      slideAnimation($progressCounter, 'add');
    },
    // Trigger after slide load
    afterLoad: function afterLoad() {
      var $currentSlide = $(this); // Add animation to current slide

      slideAnimation($currentSlide, 'add');
    },
    // Trigger on the slide leave
    onLeave: function onLeave(prevIndex, index) {
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
          'width': progressFill + '%'
        });
      }
    },
    afterResponsive: function afterResponsive(isResponsive) {
      isMobile = isResponsive ? true : false;
    }
  }); // Add/remove slide animation

  function slideAnimation(elem, action) {
    var $items = elem.attr('data-slide-animation') ? elem : elem.find('[data-slide-animation]');
    $items.each(function () {
      if (action === 'add') {
        addAnimationClass($(this), 'data-slide-animation');
      } else if (action === 'remove') {
        removeAnimationClass($(this), 'data-slide-animation');
      }
    });
  }
}

function topArrow () {
  var $topArrow = $('.top-arrow'); // Show/hide the arrow on scroll

  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 200) {
      $topArrow.addClass('top-arrow--is-active');
    } else {
      $topArrow.removeClass('top-arrow--is-active');
    }
  }); // ScrollTop on arrow click

  $topArrow.on('click', function () {
    $('html, body').animate({
      scrollTop: 0
    }, 700);
  });
  var $darkSections = $('[data-skin]');

  if (!$darkSections.length) {
    return;
  }

  var topArrowBottomOffset = parseInt($('.top-arrow').css('bottom'));
  var sectionsOffsets = [];
  var sectionsHeights = []; // Initialize changeArrowColor on document ready

  changeArrowColor(); // Get sections' offsets and heights

  calcOffsets(); // Recalclate sections' offsets and heights

  $(window).on('resize', function () {
    calcOffsets();
  }); // Toggle navbar color on scroll

  $(window).on('scroll', function () {
    changeArrowColor();
  }); // changeArrowColor function

  var i = 0;

  function changeArrowColor() {
    var windowBottomLine = $(window).scrollTop() + $(window).height();

    if (windowBottomLine >= sectionsOffsets[i] + sectionsHeights[i]) {
      i++;
    } else if (i !== 0 && windowBottomLine <= sectionsOffsets[i - 1] + sectionsHeights[i - 1]) {
      i--;
    }

    if (windowBottomLine >= sectionsOffsets[i] && windowBottomLine <= sectionsOffsets[i] + sectionsHeights[i]) {
      $topArrow.addClass('top-arrow--is-light');
    } else {
      $topArrow.removeClass('top-arrow--is-light');
    }
  } // calcOffsets function


  function calcOffsets() {
    $darkSections.each(function (idx) {
      var $this = $(this);
      sectionsOffsets[idx] = $this.offset().top + topArrowBottomOffset;
      sectionsHeights[idx] = $this.outerHeight();
    });
  }
}

function setAnimationDelay (items, step) {
  var delay = 0;
  items.each(function () {
    $(this).css({
      'animation-delay': delay + 's'
    });
    delay += step;
  });
}

function toggleScrollBar (options) {
  var action = options.action || '';
  var fixedItems = options.fixedItems || [];
  var $window = $(window);
  var $html = $('html');
  var scroolBarWidth;
  var overflow; // Get scroolBarWidth on 'hide' action
  // Set overflow to hidden

  if (action === 'hide') {
    scroolBarWidth = $window.outerWidth() - $html.width();
    overflow = 'hidden';
  } // Set scroolBarWidth to 0 on 'show' action
  // Set overflow to auto
  else if (action === 'show') {
      scroolBarWidth = 0;
      overflow = 'auto';
    } // Set overfloy-y to fixed items on show or hide action


  if (fixedItems.length >= 1) {
    for (var i = 0; i < fixedItems.length; i++) {
      var fixedElem = $(fixedItems[i]);

      if (action === 'hide') {
        fixedElem.css({
          'position': 'relative',
          'right': scroolBarWidth + 'px'
        });
      }

      if (action === 'show') {
        fixedElem.css({
          'position': 'static'
        });
      }
    }
  } // Set padding and overflow-y to html


  $('html').css({
    'padding-right': scroolBarWidth + 'px',
    'overflow-y': overflow
  });
}

function navigationMenu () {
  var $burger = $('.navigation-header__burger .burger');
  var $navigationMenuOverlay = $('.navigation-menu__overlay');
  var $navigationHeader = $('.navigation-header');
  var $navigationMenu = $('.navigation-menu');
  var $navigationMenuItem = $('.navigation-menu__list-item');
  var $navigationMenuLink = $('.navigation-menu__list-link');
  var $navigationMenuContentItem = $('.navigation-menu__content').children();
  var overlayDuration = parseInt($navigationMenuOverlay.css('animationDuration')) * 1000;
  var clickDisabled = false; // Show or hide the menu on burger click

  $burger.on('click', function () {
    var $this = $(this);

    if (!clickDisabled) {
      $this.toggleClass('burger--is-active');

      if ($this.hasClass('burger--is-active')) {
        showMenu();
      } else {
        hideMenu();
      }
    }
  });
  /* Set a delay for each animated element,
    Set 'animated' class for each animated element */

  setAnimationDelay($navigationMenuItem, 0.1);
  setAnimationDelay($navigationMenuContentItem, 0.1);
  $navigationMenuItem.addClass('animated').addClass('fadeInUp');
  $navigationMenuContentItem.addClass('animated').addClass('fadeInUp'); // Show the menu

  function showMenu() {
    clickDisabled = true; // Add active class to the overlay

    $navigationMenuOverlay.addClass('navigation-menu__overlay--is-active'); // Add active class to the menu

    setTimeout(function () {
      $navigationMenu.addClass('navigation-menu--is-active');
      $navigationHeader.addClass('navigation-header--is-fixed');
      toggleScrollBar({
        action: 'hide',
        'fixedItems': ['.navigation-header__burger .burger']
      });
    }, overlayDuration / 2); // Remove active class from the overlay on overlays animation end

    $navigationMenuOverlay.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
      $navigationMenuOverlay.removeClass('navigation-menu__overlay--is-active');
      clickDisabled = false;
    });
  } // Hide the menu


  function hideMenu() {
    clickDisabled = true; // Add active class to the overlay

    $navigationMenuOverlay.addClass('navigation-menu__overlay--is-active'); // Remove active class to the menu

    setTimeout(function () {
      $navigationMenu.removeClass('navigation-menu--is-active');
      $navigationHeader.removeClass('navigation-header--is-fixed');
      toggleScrollBar({
        action: 'show',
        'fixedItems': ['.navigation-header__burger .burger']
      });
    }, overlayDuration / 2);
  } // Navigation menu


  $navigationMenuLink.on('click', function () {
    var $this = $(this);
    var innerMenus = $this.parent().siblings().find('.navigation-menu__list-inner');
    var currentInnerMenu = $this.siblings();
    $navigationMenuLink.removeClass('navigation-menu__list-link--is-active');
    $this.addClass('navigation-menu__list-link--is-active');
    innerMenus.slideUp(400);
    currentInnerMenu.slideToggle(400);
  });
}

/* Slider stop on hover */
function stopSliderOnHover(elem, sliderInstance) {
  elem.on('mouseenter', function () {
    sliderInstance.autoplay.stop();
  });
  elem.on('mouseleave', function () {
    sliderInstance.autoplay.start();
  });
}
/* Slider progress function */

function sliderProgress(elem, selector) {
  var leaveOffset = 0.75;
  var translateVector;
  var elemSize;

  if (elem.params.direction === 'vertical') {
    translateVector = 'translateY';
    elemSize = elem.height;
  }

  if (elem.params.direction === 'horizontal') {
    translateVector = 'translateX';
    elemSize = elem.width;
  }

  for (var i = 0; i < elem.slides.length; i++) {
    var slideProgress = elem.slides[i].progress;
    var innerOffset = elemSize * leaveOffset;
    var translateValue = slideProgress * innerOffset;
    elem.slides[i].querySelector(selector).style.transform = translateVector + '(' + translateValue + 'px)';
  }
}
/* Slider transition function */

function sliderTransition(elem, selector, speed) {
  for (var i = 0; i < elem.slides.length; i++) {
    elem.slides[i].style.transition = speed + 'ms';
    elem.slides[i].querySelector(selector).style.transition = speed + 'ms';
  }
}

function projectSlider () {
  var $projectSliderContainer = $('.project-slider__container');

  if (!$projectSliderContainer.length) {
    return;
  }

  var projectSlider = new Swiper($projectSliderContainer, {
    direction: 'vertical',
    slidesPerView: 1,
    loop: true,
    speed: SLIDER_SPEED,
    autoplay: {
      delay: 3000
    },
    parallax: true,
    roundLengths: true,
    grabCursor: true,
    navigation: {
      nextEl: '.project-slider__arrow-right',
      prevEl: '.project-slider__arrow-left'
    },
    on: {
      touchStart: function touchStart() {
        var swiper = this;
        var slidesLength = swiper.slides.length;

        for (var i = 0; i < slidesLength; i++) {
          swiper.slides[i].style.transition = '';
        }
      },
      progress: function progress() {
        var swiper = this;
        sliderProgress(swiper, '.project-slide__image');
      },
      setTransition: function setTransition(speed) {
        var swiper = this;
        sliderTransition(swiper, '.project-slide__image', speed);
      }
    }
  }); // Stop slider on hover

  stopSliderOnHover($projectSliderContainer, projectSlider);
}

function videoPopup () {
  var $popUp = $('.popup-youtube');

  if (!$popUp.length) {
    return;
  }

  $popUp.magnificPopup({
    type: 'iframe'
  });
}

function animatedLetters () {
  var $animatedLetters = $('.animated-letters');

  if (!$animatedLetters.length) {
    return;
  } // Split each letter to span


  $animatedLetters.each(function () {
    $(this).html($(this).text().replace(/[^\s]/g, '<span class="animated-letter">$&</span>'));
  }); // Set an animation delay for each 'letter from bottom'

  $('.animated-letters--lfb').each(function () {
    setAnimationDelay($(this).children(), 0.02);
  }); // Set an animation delay for each 'letter from right'

  $('.animated-letters--lfr').each(function () {
    setAnimationDelay($(this).children(), 0.05);
  });
}

function shuffleFiltering(Obj, val) {
  Obj.filter(val);
}

function blogArticles () {
  var blogArticles = document.querySelector('.blog-articles');

  if (!blogArticles) {
    return;
  }

  var Shuffle = window.Shuffle;
  var $navLinks = $('.blog-nav .filter-nav__link');
  var filterVal = '';
  var blogFilter = new Shuffle(blogArticles, {
    itemSelector: '.blog-article',
    easing: TIMING_FUNCTION,
    isCentered: true,
    speed: 700
  });
  $navLinks.on('click', function () {
    var $this = $(this);
    $navLinks.removeClass('filter-nav__link--is-active');
    $this.addClass('filter-nav__link--is-active');
    filterVal = $this.attr("data-filter-name");

    if (filterVal === "all") {
      filterVal = '';
    }

    shuffleFiltering(blogFilter, filterVal);
  });
}

function galleryAlbum () {
  var galleryAlbum = document.querySelector('.gallery-album__row');

  if (!galleryAlbum) {
    return;
  }

  var Shuffle = window.Shuffle;
  var $navLinks = $('.gallery-album__nav .filter-nav__link');
  var filterVal = '';
  var galleryFilter = new Shuffle(galleryAlbum, {
    itemSelector: '.gallery-album__item',
    easing: TIMING_FUNCTION,
    isCentered: true,
    sizer: '.gallery-album__sizer',
    speed: 700
  });
  $navLinks.on('click', function () {
    var $this = $(this);
    $navLinks.removeClass('filter-nav__link--is-active');
    $this.addClass('filter-nav__link--is-active');
    filterVal = $this.attr("data-filter-name");

    if (filterVal === "all") {
      filterVal = '';
    }

    shuffleFiltering(galleryFilter, filterVal);
  });
}

function gallerySlider () {
  var $galleryLeftSlider = $('.gallery-slider__left');
  var $galleryRightSlider = $('.gallery-slider__right');

  if (!$galleryLeftSlider.length) {
    return;
  } // Left slider


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
      delay: 4000
    },
    navigation: {
      nextEl: '.gallery-slider__nav .arrow'
    },
    on: {
      touchStart: function touchStart() {
        var swiper = this;
        var slidesLength = swiper.slides.length;

        for (var i = 0; i < slidesLength; i++) {
          swiper.slides[i].style.transition = '';
        }
      },
      progress: function progress() {
        var swiper = this;
        sliderProgress(swiper, '.gallery-slider__image');
      },
      setTransition: function setTransition(speed) {
        var swiper = this;
        sliderTransition(swiper, '.gallery-slider__image', speed);
      }
    }
  }); // Right slider

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
      init: function init() {
        var swiper = this;
        swiper.slides[swiper.activeIndex].querySelector('.animated-letters--lfr').classList.add('animated-letters--lfr-active');
      },
      touchStart: function touchStart() {
        var swiper = this;
        var slidesLength = swiper.slides.length;

        for (var i = 0; i < slidesLength; i++) {
          swiper.slides[i].style.transition = '';
        }
      },
      progress: function progress() {
        var swiper = this;
        sliderProgress(swiper, '.gallery-slider__image');
      },
      setTransition: function setTransition(speed) {
        var swiper = this;
        sliderTransition(swiper, '.gallery-slider__image', speed);
      }
    }
  }); // rightSlider evetns

  rightSlider.on('slideChange', function () {
    var swiper = this;
    swiper.slides[swiper.activeIndex].querySelector('.animated-letters--lfr').classList.add('animated-letters--lfr-active');
  });
  rightSlider.on('fromEdge', function () {
    var swiper = this;

    for (var i = 0; i < swiper.slides.length; i++) {
      swiper.slides[i].querySelector('.animated-letters--lfr').classList.remove('animated-letters--lfr-active');
    }
  }); // Bind sliders to each other

  leftSlider.controller.control = rightSlider;
  rightSlider.controller.control = leftSlider; // Stop sliders on hover

  stopSliderOnHover($('.gallery-slider__left'), leftSlider);
  stopSliderOnHover($('.gallery-slider__right'), leftSlider);
  stopSliderOnHover($('.gallery-slider__nav'), leftSlider);
}

// Help slider
function map () {
  var mapId = document.getElementById('map');

  if (!mapId) {
    return;
  }

  var myLatLng = {
    lat: -33.908476,
    lng: 151.092644
  };
  var map = new google.maps.Map(mapId, {
    center: myLatLng,
    scrollwheel: false,
    zoom: 14,
    styles: [{
      "elementType": "geometry",
      "stylers": [{
        "color": "#212121"
      }]
    }, {
      "elementType": "labels.icon",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#757575"
      }]
    }, {
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#212121"
      }]
    }, {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{
        "color": "#757575"
      }]
    }, {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#9e9e9e"
      }]
    }, {
      "featureType": "administrative.land_parcel",
      "stylers": [{
        "visibility": "off"
      }]
    }, {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#bdbdbd"
      }]
    }, {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#757575"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{
        "color": "#181818"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#616161"
      }]
    }, {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [{
        "color": "#1b1b1b"
      }]
    }, {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{
        "color": "#2c2c2c"
      }]
    }, {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#8a8a8a"
      }]
    }, {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{
        "color": "#373737"
      }]
    }, {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{
        "color": "#3c3c3c"
      }]
    }, {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [{
        "color": "#4e4e4e"
      }]
    }, {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#616161"
      }]
    }, {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#757575"
      }]
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{
        "color": "#000000"
      }]
    }, {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{
        "color": "#3d3d3d"
      }]
    }]
  });
  new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'Your title'
  });
}

function contactsPopup () {
  // Popup
  var $contactsPopup = $('.contacts-popup');

  if (!$contactsPopup.length) {
    return;
  } // Info


  var $contactsInfo = $('.contacts-info');
  var $contactsButton = $('.contacts__button'); // Form

  var $contactsPopupClose = $('.contacts-popup__close');
  var $contactsForm = $('.contacts-popup__form');
  var $contactsFormInputs = $('.contacts-popup__input'); // Show popup

  $contactsButton.on('click', showPopup); // Hide popup

  $contactsPopupClose.on('click', hidePopup); // Check form on submit

  $contactsForm.on('submit', function () {
    $contactsFormInputs.each(function () {
      var $this = $(this); // Validate inputs

      checkInput($this); // If input is not valid, then set
      // input listener on it

      if ($this.hasClass('input--is-invalid')) {
        $this.on('input', function () {
          checkInput($this);
        });
      }
    });

    if (!$contactsFormInputs.hasClass('input--is-invalid')) {
      hidePopup();
      setTimeout(function () {
        $contactsFormInputs.val('');
      }, 400);
    } else {
      return false;
    }
  }); // Check input

  function checkInput(input) {
    var value = input.val();

    if (validateInput(input, value)) {
      input.removeClass('input--is-invalid');
    } else {
      input.addClass('input--is-invalid');
    }
  } // Input validator


  function validateInput(input, value) {
    var regx; // Regex for an email

    if (input.attr('type') === 'email') {
      regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    } // Regex for a text


    if (input.attr('type') === 'text') {
      regx = /^.*[\d\w]+.*$/;
    }

    return regx.test(String(value).toLowerCase());
  } // Show popup function


  function showPopup() {
    $contactsPopup.addClass('contacts-popup--is-active');
    $contactsInfo.addClass('contacts-info--is-hidden');
  } // Hide popup function


  function hidePopup() {
    $contactsPopup.removeClass('contacts-popup--is-active');
    $contactsInfo.removeClass('contacts-info--is-hidden');
  }
}

$(function () {
  homePageSticky();
  homePageSlides();
  topArrow();
  navigationMenu();
  animatedLetters();
  projectSlider();
  videoPopup();
  blogArticles();
  galleryAlbum();
  gallerySlider();
  contactsPopup();
  map();
}); // On window load

$(window).on('load', function () {
  /* Run scroll animations after preloader */
  preloader([afterloadAnimations, scrollAnimations]);
});
