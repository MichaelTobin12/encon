var App = jQuery(document);

// document ready
App.ready(function ($) {
	var $win = $(window);
	var $body = $('body');
	var $header = $('#site-header');
	var $navAnchor = $('#nav-anchor');
	var didScroll;
	var $mobileNav = $('#mobile-nav');
	var $form = $('#contact-form');
	// Animation for Speakers section
	var speakerBlocks = $('#speakers .border-box'),
		offset = 0.3
	;
	// Animation for timeline blocks
	var timelineBlocks = $('#overview .border-box, #location .border-box, #awards-gala .border-box');
	// One page scrolling navigation
	var lastId;
	var nav = $('.nav-list');
	var headerHeight = $header.outerHeight() + 15;
	var menuItems = nav.find('a');
	// Anchors corresponding to menu items
	var scrollItems = menuItems.map(function() {
		var item = $($(this).attr('href'));
		if (item.length) { return item; }
	});
	// Parallax Plugin
	var rellax = new Rellax('.parallax-layer');
	var $heroImage = $('.hero-bg');
	// array of image classes
	var images = [
		'angelica',
		'wil',
		'sable'
	];
	// create random image variable from array
	var size = images.length;
	var x = Math.floor(size * Math.random());
	
	// apply image class to get background
	$heroImage.addClass(images[x]);

	// floating labels
    if ($.fn.floatLabel) {
        App.floatLabel();
    }

    if ($.fn.validate) {
    	$form.validate();
    }

	// handles nav position
	function hasScrolled() {
		var st = $(this).scrollTop();
		var navScrollTop = $navAnchor.offset().top;

		if (st > navScrollTop) {
			$header.addClass('show');
		} else {
			$header.removeClass('show');
		}
	}

	function hideBlocks(blocks, offset) {
		blocks.each(function() {
			( $(this).offset().top > $win.scrollTop() + $win.height() * offset ) && $(this).addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(i) {
			var el = $(this);
			if (el.offset().top <= $win.scrollTop() + $win.height() * offset && el.hasClass('is-hidden')) {
				el.removeClass('is-hidden').addClass('bounce-in');
			}
		});
	}

	function hideBorders(blocks, offset) {
		blocks.each(function() {
			if ($(this).offset().top > $win.scrollTop() + $win.height() * offset ) {
				$(this).addClass('is-hidden');
			} else {
				$(this).find('.border').addClass('active');
			}
		});
	}

	function animateBorders(blocks, offset) {
		blocks.each(function() {
			var el = $(this);
			if (el.offset().top <= $win.scrollTop() + $win.height() * offset && el.hasClass('is-hidden')) {
				el.removeClass('is-hidden');
				el.find('.border').each(function(i) {
					var border = $(this);
					setTimeout(function() {
					    border.addClass('active');
					}, 200 * i);
				});
			}
		});
	}

	function clearForm() {
		$form.find('input:text, input[type="email"]').val('');
		$form.find('input:checkbox').removeAttr('checked');
		$form.find('select').prop('selectedIndex', 0);
	}

	function submitForm(e, checkbox) {
		if (checkbox.is(':checked')) {
	        $
	        	.ajax({
		            type: 'POST',
		            url: $form.attr('action'),
		            data: $form.serialize(),
		        }).done(function(data) {
		        	clearForm();
					$('#success-modal').modal('show');
				})
			;
		} else {
			return false;
		}
	}

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e) {
		var href = $(this).attr('href');
		var offsetTop = href === '#' ? 0 : $(href).offset().top - headerHeight + 1;

		$('html, body').stop().animate({ 
		 	scrollTop: offsetTop
		}, 300);
		e.preventDefault();
	});

	App.on('click', '.nav-toggle', function() {
		var el = $(this);

		$body.toggleClass('nav-open')
		el.toggleClass('active');
		$mobileNav.toggleClass('open');
	});

	App.on('click', '.nav-list >li >a', function(e) {
		e.preventDefault();

		if ($body.hasClass('nav-open')) {
			$('.nav-toggle').trigger('click');
		}
	});

	$win.on('scroll', function() {
		didScroll = true;
		// Get container scroll position
		var fromTop = $(this).scrollTop() + headerHeight;
		// Get id of current scroll item
		var cur = scrollItems.map(function() {
			if ($(this).offset().top < fromTop) {
				return this;
			}
		});
		// Get the id of the current element
		cur = cur[cur.length - 1];
		var id = cur && cur.length ? cur[0].id : '';

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
				.parent().removeClass('active')
				.end().filter('[href="#'+id+'"]').parent().addClass('active')
			;
		}

		// animates speaker blocks
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(speakerBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(speakerBlocks, offset); });

		// animates timeline borders
		(!window.requestTimelineAnimation) 
			? setTimeout(function(){ animateBorders(timelineBlocks, offset); }, 100)
			: window.requestTimelineAnimation(function(){ animateBorders(timelineBlocks, offset); });
	});

	setInterval(function() {
	    if (didScroll) {
	        hasScrolled();
	        didScroll = false;
	    }
	}, 250);

	// get nav position on load
	hasScrolled();

	// hide speaker blocks which are outside the viewport
	hideBlocks(speakerBlocks, offset);
	// remove borders from timeline blocks
	hideBorders(timelineBlocks, offset);

	$form.on('click', 'input[type="submit"]', function(e) {
		e.preventDefault();
		var checkbox = $form.find('input[type="checkbox"]');

		if (!checkbox.is(':checked')) {
			alert('Please select at least one checkbox.');
		}

		if ($form.valid()) {
			submitForm(e, checkbox);
		}
	});

	$('.collapse').on('show.bs.collapse', function() {
		var el = $(this);
		var link = $('a[href="#' + el.attr('id') + '"]');
		link.html('Hide Description');
	});

	$('.collapse').on('hide.bs.collapse', function() {
		var el = $(this);
		var link = $('a[href="#' + el.attr('id') + '"]');
		link.html('Read Description');
	});
});