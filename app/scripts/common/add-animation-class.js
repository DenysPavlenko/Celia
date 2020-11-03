export default function (elem, dataAttr) {
	var animationClass = elem.attr(dataAttr);
	var animationDelay = elem.attr(dataAttr + '-delay');
	elem
		.css({
			'-webkit-animation-delay': animationDelay,
			'-mox-animation-delay': animationDelay,
			'-o-animation-delay': animationDelay,
			'animation-delay': animationDelay,
		})
		.addClass(animationClass);
}