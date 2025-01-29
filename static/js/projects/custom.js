var requiredTopScroll = false;
var hasSlideshow = false;


document.addEventListener('DOMContentLoaded', (event) => {
	// Ensure jQuery is ready
	if (window.jQuery) {
		accordionBind(); // Bind accordion functionality
		// Other functions to initialize after DOM is ready
	} else {
		console.error("jQuery is not loaded yet.");
	}
});
$(document).ready(function () {
//document.addEventListener('DOMContentLoaded', (event) => {
	"use strict";

	//$('meta[name=viewport]').attr('content', 'width=' + $(window).width() + ',user-scalable=no');

	// Bind events for when we unload
	$(window).on('beforeunload', function () {
		$("#preloader-frame").velocity("fadeIn",
			{
				delay: 0,
				duration: 200
			});
	});

	// Create video elements, do not autoplay, preload only
	//if ($('#hero1-video').length) {
	//	$('#hero1-video').vide('res/video/hero1/hero1', {
	//		muted: true,
	//		resizing: true,
	//		autoplay: false,
	//		loop: true
	//	});
	//}
	//
	//setHeroSize(requiredTopScroll, false);
	//socialIconsBind();
	//introSetBegin();

	//$('.work-content').flickity();

	// Init syntax highlighting :D	
	//SyntaxHighlighter.all();

	// Init image slider
	//try {
	//	$("#background-slider").backstretch(cachedBackgroundSlideshow,
	//		{ duration: 6000, fade: 750 });
	//	hasSlideshow = true;
	//}
	//catch (e) { }

	// Init asset player

	var ppContents = $('#pp-container');

	if (ppContents.length) {
		ppContents.css({ "opacity": 1 });
	}

	$("#preloader-frame").css({ "display": "none" });
	onPreloaderFadeOutDone();

});

window.onload = function () {
	"use strict";

	setTimeout(function () {
		if (!requiredTopScroll) {
			pageScrollToUrlId(false);
		}
		else {
			getPageScrollElemForChanging().scrollTop(0);
		}
	}, 80);

	if (!hasSlideshow) {
		var ppContents = $('#pp-container');

		if (ppContents.length) {
			ppContents.css({ "opacity": 1 });
		}
	}

	if (_livePreview) {
		//var ppContents = $('#pp-container');
		//
		//if (ppContents.length) {
		//	ppContents.css({ "opacity": 1 });
		//}

		//$("#preloader-frame").css({ "display": "none" });
		//onPreloaderFadeOutDone();
	}
	else {
		// Fade out the preloader and start videos
		setTimeout(function () {
			if ($('#hero1-video').length) {
				$('#hero1-video').data('vide').getVideoObject().play();
			}

			$("#preloader-frame").velocity("fadeOut",
				{
					delay: 500,
					duration: 1200,
					complete: onPreloaderFadeOutDone
				});
		}, 100); /* Wait 200ms before fading */
	}
};

var centerIt = function (el /* (jQuery element) Element to center */) {
	if (!el) {
		return;
	}
	var moveIt = function () {
		var winWidth = $(window).width();
		var winHeight = $(window).height();
		el.css("position", "absolute").css("left", ((winWidth / 2) - (el.width() / 2)) + "px").css("top", ((winHeight / 2) - (el.height() / 2) + getPageScrollElem().scrollTop()) + "px");
	};
	$(window).resize(moveIt);
	moveIt();
};

window.onbeforeunload = function () {
	_gaq.push(['_trackPageview', '/bounce']);
	return null;
};

function setPageHeight(elem, multip) {
	function setHeight() {
		var windowHeight = $(window).innerHeight();
		elem.css('min-height', windowHeight * multip);
	}
	setHeight();
}

function getPageScrollElem() {
	return $('body');
}

function getPageScrollElemForChanging() {
	return getPageScrollElem();
}

function getPageScrollTop() {
	return getPageScrollElem().scrollTop();
}

/**************************************
* Preloader functions
**************************************/
function onPreloaderFadeOutDone() {
	"use strict";

	// Enable hamburger functionality in menu bar
	menubarHamburger();
	// Bind the actions for the projects
	workBindActions();
	// Menu bar functionality
	menubarBind();
	// Accordions
	//accordionBind();
	// Show the menu bar after a timeout
	setTimeout(function () { menubarShow(true); }, 400);
	// Shrink the hero after a timeout
	if (requiredTopScroll) {
		setTimeout(function () {
			if (!heroExpanderVisible) { setHeroSize(false, true); }
		}, 1200);
	}

	if ($('#pp-container').length && !_livePreview && hasSlideshow) {
		setTimeout(projectPageShowContents, 1200);
	}

	introDoAnimate();
}


/**************************************
* Menubar functions
**************************************/
var menubarIsActive = false;
var menubarHbgrIsActive = false;
var menubarHbgrIsBusy = false;

function menubarShow(enable) {
	var menubar = $('#menubar-container');

	if (enable === menubarIsActive) {
		return;
	}

	menubar.velocity("stop");

	if (enable) {
		menubar.velocity("transition.slideDownIn", 300);
	}
	else {
		menubar.velocity("transition.slideUpOut", 300);
	}

	menubarIsActive = enable;
}

function hamburgerTransition(enable) {
	var elem = $('#hamburger-menu');

	elem.velocity("stop");

	if (enable) {
		elem.css({ "display": "block" });
	}

	elem.velocity(
		{
			"margin-right": enable ? "0" : "-300px",
		},
		{
			duration: 400,
			complete: function () {
				if (!enable) {
					elem.css({ "display": "none" });
				}
			}
		});
}

function menubarHamburgerShow(enable) {
	var hbgrIcon = $('#menubar-hamburger-icon');
	var hbgrElem = $('#hamburger-menu');
	var page = $('#page');

	page.velocity("stop");

	menubarHbgrIsActive = enable;

	if (enable) {
		/* Enable */
		hbgrIcon.addClass('is-active');
		hamburgerTransition(true);
		page.velocity({ "margin-left": "-300px" }, 400);
	}
	else {
		/* Disable */
		hbgrIcon.removeClass('is-active');
		hamburgerTransition(false);
		page.velocity({ "margin-left": "0px" }, 400);
	}
}

function menubarHamburger() {
	var hbgrIcon = $('#menubar-hamburger-icon');

	hbgrIcon.click(function () {
		menubarHamburgerShow(!menubarHbgrIsActive);
	});
}

function menubarBind() {
	function doMenuItem(elem) {
		var targetId = elem.data("target-element");

		if (targetId == undefined) {
			return;
		}

		var target = $(targetId);
	}

	$(".menubar-item").click(function () {
		doMenuItem($(this));
	});

	$(".hamburger-menu-item").click(function () {
		if (!menubarHbgrIsBusy) {
			menubarHbgrIsBusy = true;
			menubarHamburgerShow(false);
			var target = $(this);
			setTimeout(function () { doMenuItem(target); menubarHbgrIsBusy = false; }, 400);
		}
	});

}

/**************************************
* Work functions
**************************************/
function workBindActions() {
	$('.ws-item--ext').click(function () {
		lity($(this).data('action'));
	});
}


function accordionBind() {
	$('.accordion').click(function (e) {
		e.preventDefault();

		var $this = $(this);

		if ($this.next().hasClass('visible')) {
			$this.next().removeClass('visible');
			$this.next().slideUp(350);
			$this.removeClass('active');
			$this.find('.accordion-icon').removeClass('rotate');
		} else {
			$this.parent().parent().find('li .accordion-inner').removeClass('visible');
			$this.parent().parent().find('li .accordion-inner').slideUp(350);
			$this.next().toggleClass('visible');
			$this.next().slideToggle(350);
			$this.toggleClass('active');
			$this.find('.accordion-icon').toggleClass('rotate');

			var pageTitle = document.getElementsByClassName("pp-title")[0].getElementsByTagName("span")[0].outerText;
			var accordionTitle = $this.children("span").text();
			var eventStr = "A-" + pageTitle + ": " + accordionTitle;

			ga('send', 'event', eventStr, "active");
		}
	});
}





// -------------------------- BACK UP ---------------------------------------- //

//var requiredTopScroll = false;
//var hasSlideshow = false;


//document.addEventListener('DOMContentLoaded', (event) => {
//	// Ensure jQuery is ready
//	if (window.jQuery) {
//		accordionBind(); // Bind accordion functionality
//		// Other functions to initialize after DOM is ready
//	} else {
//		console.error("jQuery is not loaded yet.");
//	}
//});
//$(document).ready(function () {
//	//document.addEventListener('DOMContentLoaded', (event) => {
//	"use strict";

//	//$('meta[name=viewport]').attr('content', 'width=' + $(window).width() + ',user-scalable=no');

//	// Bind events for when we unload
//	$(window).on('beforeunload', function () {
//		$("#preloader-frame").velocity("fadeIn",
//			{
//				delay: 0,
//				duration: 200
//			});
//	});

//	// Create video elements, do not autoplay, preload only
//	//if ($('#hero1-video').length) {
//	//	$('#hero1-video').vide('res/video/hero1/hero1', {
//	//		muted: true,
//	//		resizing: true,
//	//		autoplay: false,
//	//		loop: true
//	//	});
//	//}
//	//
//	//setHeroSize(requiredTopScroll, false);
//	//socialIconsBind();
//	//introSetBegin();

//	//$('.work-content').flickity();

//	// Init syntax highlighting :D	
//	//SyntaxHighlighter.all();

//	// Init image slider
//	//try {
//	//	$("#background-slider").backstretch(cachedBackgroundSlideshow,
//	//		{ duration: 6000, fade: 750 });
//	//	hasSlideshow = true;
//	//}
//	//catch (e) { }

//	// Init asset player

//	var ppContents = $('#pp-container');

//	if (ppContents.length) {
//		ppContents.css({ "opacity": 1 });
//	}

//	$("#preloader-frame").css({ "display": "none" });
//	onPreloaderFadeOutDone();

//});

//window.onload = function () {
//	"use strict";

//	setTimeout(function () {
//		if (!requiredTopScroll) {
//			pageScrollToUrlId(false);
//		}
//		else {
//			getPageScrollElemForChanging().scrollTop(0);
//		}
//	}, 80);

//	if (!hasSlideshow) {
//		var ppContents = $('#pp-container');

//		if (ppContents.length) {
//			ppContents.css({ "opacity": 1 });
//		}
//	}

//	if (_livePreview) {
//		//var ppContents = $('#pp-container');
//		//
//		//if (ppContents.length) {
//		//	ppContents.css({ "opacity": 1 });
//		//}

//		//$("#preloader-frame").css({ "display": "none" });
//		//onPreloaderFadeOutDone();
//	}
//	else {
//		// Fade out the preloader and start videos
//		setTimeout(function () {
//			if ($('#hero1-video').length) {
//				$('#hero1-video').data('vide').getVideoObject().play();
//			}

//			$("#preloader-frame").velocity("fadeOut",
//				{
//					delay: 500,
//					duration: 1200,
//					complete: onPreloaderFadeOutDone
//				});
//		}, 100); /* Wait 200ms before fading */
//	}
//};

//var centerIt = function (el /* (jQuery element) Element to center */) {
//	if (!el) {
//		return;
//	}
//	var moveIt = function () {
//		var winWidth = $(window).width();
//		var winHeight = $(window).height();
//		el.css("position", "absolute").css("left", ((winWidth / 2) - (el.width() / 2)) + "px").css("top", ((winHeight / 2) - (el.height() / 2) + getPageScrollElem().scrollTop()) + "px");
//	};
//	$(window).resize(moveIt);
//	moveIt();
//};

//window.onbeforeunload = function () {
//	_gaq.push(['_trackPageview', '/bounce']);
//	return null;
//};

//function setPageHeight(elem, multip) {
//	function setHeight() {
//		var windowHeight = $(window).innerHeight();
//		elem.css('min-height', windowHeight * multip);
//	}
//	setHeight();
//}

//function getPageScrollElem() {
//	return $('body');
//}

//function getPageScrollElemForChanging() {
//	return getPageScrollElem();
//}

//function getPageScrollTop() {
//	return getPageScrollElem().scrollTop();
//}

///**************************************
//* Preloader functions
//**************************************/
//function onPreloaderFadeOutDone() {
//	"use strict";

//	// Remove preloader elements
//	//$('#preloader-frame').remove();
//	// Reset overflow
//	//$('#outer-container').css({"overflow":"visible"});
//	// Will automatically toggle the menu bar if needed
//	//menubarAutoResize();
//	// Activate page scroll spies
//	///bindScrollSpies();
//	// Enable hamburger functionality in menu bar
//	menubarHamburger();
//	// Bind the actions for the projects
//	workBindActions();
//	// Menu bar functionality
//	menubarBind();
//	// Accordions
//	//accordionBind();
//	// Show the menu bar after a timeout
//	setTimeout(function () { menubarShow(true); }, 400);
//	// Shrink the hero after a timeout
//	if (requiredTopScroll) {
//		setTimeout(function () {
//			if (!heroExpanderVisible) { setHeroSize(false, true); }
//		}, 1200);
//	}

//	if ($('#pp-container').length && !_livePreview && hasSlideshow) {
//		setTimeout(projectPageShowContents, 1200);
//	}

//	introDoAnimate();
//}

////function bindScrollSpies() {
////	// hero resizing
////	heroScrollSpy();
////}


///**************************************
//* Menubar functions
//**************************************/
//var menubarIsActive = false;
//var menubarHbgrIsActive = false;
//var menubarHbgrIsBusy = false;

//function menubarShow(enable) {
//	var menubar = $('#menubar-container');

//	if (enable === menubarIsActive) {
//		return;
//	}

//	menubar.velocity("stop");

//	if (enable) {
//		menubar.velocity("transition.slideDownIn", 300);
//	}
//	else {
//		menubar.velocity("transition.slideUpOut", 300);
//	}

//	menubarIsActive = enable;
//}

//function hamburgerTransition(enable) {
//	var elem = $('#hamburger-menu');

//	elem.velocity("stop");

//	if (enable) {
//		elem.css({ "display": "block" });
//	}

//	elem.velocity(
//		{
//			"margin-right": enable ? "0" : "-300px",
//		},
//		{
//			duration: 400,
//			complete: function () {
//				if (!enable) {
//					elem.css({ "display": "none" });
//				}
//			}
//		});
//}

//function menubarHamburgerShow(enable) {
//	var hbgrIcon = $('#menubar-hamburger-icon');
//	var hbgrElem = $('#hamburger-menu');
//	var page = $('#page');

//	page.velocity("stop");

//	menubarHbgrIsActive = enable;

//	if (enable) {
//		/* Enable */
//		hbgrIcon.addClass('is-active');
//		hamburgerTransition(true);
//		page.velocity({ "margin-left": "-300px" }, 400);
//	}
//	else {
//		/* Disable */
//		hbgrIcon.removeClass('is-active');
//		hamburgerTransition(false);
//		page.velocity({ "margin-left": "0px" }, 400);
//	}
//}

//function menubarHamburger() {
//	var hbgrIcon = $('#menubar-hamburger-icon');

//	hbgrIcon.click(function () {
//		menubarHamburgerShow(!menubarHbgrIsActive);
//	});
//}

//function menubarBind() {
//	function doMenuItem(elem) {
//		var targetId = elem.data("target-element");

//		if (targetId == undefined) {
//			return;
//		}

//		var target = $(targetId);

//		if (target.length) {
//			/* On the current page */
//			pageScrollToElement(target, true);
//		}
//		else {
//			/* Go back to the home page */
//			window.location.href = _siteUrl + targetId;
//		}
//	}

//	$(".menubar-item").click(function () {
//		doMenuItem($(this));
//	});

//	$(".hamburger-menu-item").click(function () {
//		if (!menubarHbgrIsBusy) {
//			menubarHbgrIsBusy = true;
//			menubarHamburgerShow(false);
//			var target = $(this);
//			setTimeout(function () { doMenuItem(target); menubarHbgrIsBusy = false; }, 400);
//		}
//	});

//	$("#menubar-title").click(function () {
//		var target = $("#hero1-video");

//		if (target.length) {
//			pageScrollToElement(target, true);
//		}
//		else {
//			window.location.href = _siteUrl;
//		}
//	});
//}

///**************************************
//* Work functions
//**************************************/
//function workBindActions() {
//	$('.ws-item--ext').click(function () {
//		//var $url = $(this).data('action');
//		//var $win = window.open($url, '_blank');
//		//$win.focus();
//		lity($(this).data('action'));
//	});
//}

//function pageScrollToUrlId(doAnimate) {
//	var url = window.location.href;

//	if (!url.includes('#')) {
//		return;
//	}

//	var id = url.substring(url.lastIndexOf('#'));

//	if (id.length > 1) {
//		pageScrollToElement($(id), doAnimate);
//	}
//}

//function pageScrollToElement(elem, doAnimate) {
//	var scroller = getPageScrollElemForChanging();

//	if (!doAnimate) {
//		scroller.scrollTop(elem.offset().top);
//	}
//	else {
//		scroller.velocity("stop");
//		scroller.velocity("scroll", { offset: elem.offset().top, duration: 500, easing: "easeInOutQuat" });
//	}
//}

//function accordionBind() {
//	$('.accordion').click(function (e) {
//		e.preventDefault();

//		var $this = $(this);

//		if ($this.next().hasClass('visible')) {
//			$this.next().removeClass('visible');
//			$this.next().slideUp(350);
//			$this.removeClass('active');
//			$this.find('.accordion-icon').removeClass('rotate');
//		} else {
//			$this.parent().parent().find('li .accordion-inner').removeClass('visible');
//			$this.parent().parent().find('li .accordion-inner').slideUp(350);
//			$this.next().toggleClass('visible');
//			$this.next().slideToggle(350);
//			$this.toggleClass('active');
//			$this.find('.accordion-icon').toggleClass('rotate');

//			var pageTitle = document.getElementsByClassName("pp-title")[0].getElementsByTagName("span")[0].outerText;
//			var accordionTitle = $this.children("span").text();
//			var eventStr = "A-" + pageTitle + ": " + accordionTitle;

//			ga('send', 'event', eventStr, "active");
//		}
//	});
//}

///**************************************
//* Project page functions
//**************************************/
//function projectPageShowContents() {
//	var projectpage = $('#pp-container');

//	projectpage.velocity("transition.fadeIn");
//}

///**************************************
//* GA functions
//**************************************/
//function trackResume() {
//	ga('send', 'event', "Resume (menubar)", "click");
//}
















