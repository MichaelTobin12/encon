$( document ).ready(function() {
	


});

var App = jQuery(document);

// document ready
App.ready(function ($) {
	var $win = $(window);
	var $body = $('body');
	var $header = $('#site-header');

	var $navAnchor = $('#nav-anchor');
	var $mobileNav = $('#mobile-nav');
	var $form = $('#contact-form');
	var nav = $('.nav-list');
	// Anchors corresponding to menu items

	var scrollTrigger =$('.scrollTrigger');
	var anchorArray = [
	'details',
	'schedule',
	'speakers',
	'sponsors',
	'location',
	'rsvp'
	];


	$(window).scroll(function() { //when window is scrolled
	    // console.log(scrollTrigger.offset());
	    // console.log('scroll')
	    // console.log($(window).scrollTop());


	  });


	 $('.siteNav ul li').click(function(e){
	     	$('.siteNav ul li .dot.active').removeClass('active');
    		$(this).find('.dot').addClass('active');
    		console.log(this);
    		var scrollTo = $(this).find('a').attr('href');
    		console.log(scrollTo);
    		// window.scroll({ top: $('#'+scrollTrigger).offset(), left: 0, behavior: 'smooth' })
	  });

	 

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

});