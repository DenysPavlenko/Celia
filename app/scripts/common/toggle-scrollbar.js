export default function (options) {
	var action = options.action || '';
	var fixedItems = options.fixedItems || [];
	var $window = $(window);
	var $html = $('html');
	var scroolBarWidth;
	var overflow;

	// Get scroolBarWidth on 'hide' action
	// Set overflow to hidden
	if (action === 'hide') {
		scroolBarWidth = $window.outerWidth() - $html.width();
		overflow = 'hidden';
	}
	// Set scroolBarWidth to 0 on 'show' action
	// Set overflow to auto
	else if (action === 'show') {
		scroolBarWidth = 0;
		overflow = 'auto';
	}

	// Set overfloy-y to fixed items on show or hide action
	if (fixedItems.length >= 1) {
		for (var i = 0; i < fixedItems.length; i++) {
			var fixedElem = $(fixedItems[i]);
			if (action === 'hide') {
				fixedElem.css({ 'position': 'relative', 'right': scroolBarWidth + 'px' });
			}
			if (action === 'show') {
				fixedElem.css({ 'position': 'static' });
			}
		}
	}

	// Set padding and overflow-y to html
	$('html').css({
		'padding-right': scroolBarWidth + 'px',
		'overflow-y': overflow
	});

};