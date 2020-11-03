export default function (elem, dataAttr) {
  var animationClass = elem.attr(dataAttr);
  elem.removeClass(animationClass);
}