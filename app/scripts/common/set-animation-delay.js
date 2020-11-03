export default function (items, step) {
  var delay = 0;
  items.each(function () {
    $(this).css({'animation-delay': delay + 's'});
    delay += step;
  });
}