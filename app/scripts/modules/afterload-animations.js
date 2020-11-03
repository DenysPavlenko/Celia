import addAnimationClass from '../common/add-animation-class';

export default function () {
  var $items = $('[data-afterload-animation]');
  if (!$items.length) { return }

  // Add an animation class to each element
  $items.each(function () {
    addAnimationClass($(this), 'data-afterload-animation');
  });
}