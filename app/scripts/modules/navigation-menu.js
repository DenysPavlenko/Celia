import setAnimationDelay from '../common/set-animation-delay';
import toggleScrollBar from '../common/toggle-scrollbar';

export default function () {
  var $burger = $('.navigation-header__burger .burger');
  var $navigationMenuOverlay = $('.navigation-menu__overlay');
  var $navigationHeader = $('.navigation-header');
  var $navigationMenu = $('.navigation-menu');
  var $navigationMenuItem = $('.navigation-menu__list-item');
  var $navigationMenuLink = $('.navigation-menu__list-link');
  var $navigationMenuContentItem = $('.navigation-menu__content').children();
  var overlayDuration = parseInt($navigationMenuOverlay.css('animationDuration')) * 1000;
  var clickDisabled = false;

  // Show or hide the menu on burger click
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
  $navigationMenuContentItem.addClass('animated').addClass('fadeInUp');

  // Show the menu
  function showMenu() {
    clickDisabled = true;
    // Add active class to the overlay
    $navigationMenuOverlay.addClass('navigation-menu__overlay--is-active');
    // Add active class to the menu
    setTimeout(function () {
      $navigationMenu.addClass('navigation-menu--is-active');
      $navigationHeader.addClass('navigation-header--is-fixed');
      toggleScrollBar({ action: 'hide', 'fixedItems': ['.navigation-header__burger .burger'] });
    }, overlayDuration / 2);
    // Remove active class from the overlay on overlays animation end
    $navigationMenuOverlay.one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function () {
      $navigationMenuOverlay.removeClass('navigation-menu__overlay--is-active');
      clickDisabled = false;
    });
  }
  // Hide the menu
  function hideMenu() {
    clickDisabled = true;
    // Add active class to the overlay
    $navigationMenuOverlay.addClass('navigation-menu__overlay--is-active');
    // Remove active class to the menu
    setTimeout(function () {
      $navigationMenu.removeClass('navigation-menu--is-active');
      $navigationHeader.removeClass('navigation-header--is-fixed');
      toggleScrollBar({ action: 'show', 'fixedItems': ['.navigation-header__burger .burger'] });
    }, overlayDuration / 2);
  }

  // Navigation menu
  $navigationMenuLink.on('click', function () {
    var $this = $(this);
    var innerMenus = $this.parent().siblings().find('.navigation-menu__list-inner');
    var currentInnerMenu = $this.siblings();

    $navigationMenuLink.removeClass('navigation-menu__list-link--is-active')
    $this.addClass('navigation-menu__list-link--is-active')
    innerMenus.slideUp(400);
    currentInnerMenu.slideToggle(400);
  });
}