export default function () {
  var $popUp = $('.popup-youtube');
  if (!$popUp.length) { return }
  $popUp.magnificPopup({
    type: 'iframe'
  });
}