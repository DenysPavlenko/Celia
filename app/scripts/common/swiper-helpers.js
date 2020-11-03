/* Slider stop on hover */
export function stopSliderOnHover(elem, sliderInstance) {
	elem.on('mouseenter', function () {
		sliderInstance.autoplay.stop();
	});
	elem.on('mouseleave', function () {
		sliderInstance.autoplay.start();
	});
}

/* Slider progress function */
export function sliderProgress(elem, selector) {
	var leaveOffset = 0.75;
	var translateVector;
	var elemSize;
	if (elem.params.direction === 'vertical') {
		translateVector = 'translateY';
		elemSize = elem.height;
	} if (elem.params.direction === 'horizontal') {
		translateVector = 'translateX';
		elemSize = elem.width;
	}
	for (var i = 0; i < elem.slides.length; i++) {
		var slideProgress = elem.slides[i].progress;
		var innerOffset = elemSize * leaveOffset;
		var translateValue = slideProgress * innerOffset;
		elem.slides[i].querySelector(selector).style.transform = translateVector + '(' + translateValue + 'px)';
	}
}

/* Slider transition function */
export function sliderTransition(elem, selector, speed) {
	for (var i = 0; i < elem.slides.length; i++) {
		elem.slides[i].style.transition = speed + 'ms';
		elem.slides[i].querySelector(selector).style.transition =
			speed + 'ms';
	}
}