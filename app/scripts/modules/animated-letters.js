import setAnimationDelay from '../common/set-animation-delay';

export default function () {
  var $animatedLetters = $('.animated-letters');
  if (!$animatedLetters.length) { return }

  // Split each letter to span
  $animatedLetters.each(function () {
    $(this).html($(this).text().replace(/[^\s]/g, '<span class="animated-letter">$&</span>'));
  });

  // Set an animation delay for each 'letter from bottom'
  $('.animated-letters--lfb').each(function () {
    setAnimationDelay($(this).children(), 0.02)
  });
  // Set an animation delay for each 'letter from right'
  $('.animated-letters--lfr').each(function () {
    setAnimationDelay($(this).children(), 0.05);
  });
}