export default function () {
  var $topArrow = $('.top-arrow');

  // Show/hide the arrow on scroll
  $(window).on('scroll', function () {
    if ($(window).scrollTop() >= 200) {
      $topArrow.addClass('top-arrow--is-active');
    } else {
      $topArrow.removeClass('top-arrow--is-active');
    }
  });
  // ScrollTop on arrow click
  $topArrow.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 700)
  });

  var $darkSections = $('[data-skin]');
  if (!$darkSections.length) { return }
  var topArrowBottomOffset = parseInt($('.top-arrow').css('bottom'));
  var sectionsOffsets = [];
  var sectionsHeights = [];

  // Initialize changeArrowColor on document ready
  changeArrowColor();

  // Get sections' offsets and heights
  calcOffsets();

  // Recalclate sections' offsets and heights
  $(window).on('resize', function () {
    calcOffsets();
  });

  // Toggle navbar color on scroll
  $(window).on('scroll', function () {
    changeArrowColor();
  });

  // changeArrowColor function
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
  }

  // calcOffsets function
  function calcOffsets() {
    $darkSections.each(function (idx) {
      var $this = $(this);
      sectionsOffsets[idx] = $this.offset().top + topArrowBottomOffset;
      sectionsHeights[idx] = $this.outerHeight();
    })
  }
}