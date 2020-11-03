export default function () {
	var el = document.createElement('fake');
	var transEndEventNames = {
		'WebkitTransition': 'webkitTransitionEnd',
		'MozTransition'   : 'transitionend',
		'OTransition'     : 'otransitionend',
		'transition'      : 'transitionend'
	};
	for (var t in transEndEventNames) {
		if (el.style[t] !== undefined) {
			return transEndEventNames[t];
		}
	}
}