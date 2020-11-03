import { TIMING_FUNCTION } from '../common/constants';
import { shuffleFiltering } from '../common/shuffle-helpers';

export default function () {
  var blogArticles = document.querySelector('.blog-articles');
  if (!blogArticles) { return }
  var Shuffle = window.Shuffle;
  var $navLinks = $('.blog-nav .filter-nav__link');
  var filterVal = '';

  var blogFilter = new Shuffle(blogArticles, {
    itemSelector: '.blog-article',
    easing: TIMING_FUNCTION,
    isCentered: true,
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
    shuffleFiltering(blogFilter, filterVal);
  });
};