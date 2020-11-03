import { TIMING_FUNCTION } from '../common/constants';
import { shuffleFiltering } from '../common/shuffle-helpers';

export default function () {
  var galleryAlbum = document.querySelector('.gallery-album__row');
  if (!galleryAlbum) { return }

  var Shuffle = window.Shuffle;
  var $navLinks = $('.gallery-album__nav .filter-nav__link');
  var filterVal = '';

  var galleryFilter = new Shuffle(galleryAlbum, {
    itemSelector: '.gallery-album__item',
    easing: TIMING_FUNCTION,
    isCentered: true,
    sizer: '.gallery-album__sizer',
    speed: 700,
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


};