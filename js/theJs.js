var App = jQuery(document);

// document ready
App.ready(function ($) {
	var $win = $(window);
	var $body = $('body');

	var $mobileNav = $('#mobile-nav');
	var $form = $('#contact-form');
	var formFail = false;
	var nav = $('.nav-list');
	var siteNav = $('.siteNav');
	var scroller = scrollama();

	// floating labels
    if ($.fn.floatLabel) {
        App.floatLabel();
    }

    if ($.fn.validate) {
    	$form.validate();
    }


	function clearForm() {
		formFail = false;
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


	// function showBlocks(blocks, offset) {
	// 	var scrollTrigger = $('.scrollTrigger');
	// 	console.log(blocks)
	// 	blocks.each(function(i) {
	// 		var el = $(this);
	// 		if (el.offset().top <= scrollTrigger.offset().top + scrollTrigger.height() * offset && el.hasClass('is-hidden')) {
	// 			el.removeClass('is-hidden').addClass('fly-in');
	// 		}
	// 	});
	// }

	// initialize the scrollama
	

	function updateMenu(response){
		$(".siteNav ul li .dot.active").removeClass('active');
		$(".siteNav a").removeClass('gradesBottom');
		$(".siteNav a").removeClass('gradesUp');
		if(response.direction == 'up'){
			if(response.element.id == 'location'){
				$(".siteNav a[href*='rsvp']").addClass('gradesUp');	
			}else if (response.element.id == 'sponsors'){
				$(".siteNav a[href*='location']").addClass('gradesUp');
			}else if(response.element.id == 'speakers'){
				$(".siteNav a[href*='sponsors']").addClass('gradesUp');
			}else if(response.element.id == 'schedule'){
				$(".siteNav a[href*='speakers']").addClass('gradesUp');
			}else if(response.element.id == 'details'){
				$(".siteNav a[href*='schedule']").addClass('gradesUp');
			}
		}else if(response.direction == 'down'){
			$(".siteNav a[href*='"+response.element.id+"']").addClass('gradesBottom');
		}
		
		$(".siteNav a[href*='"+response.element.id+"']").find('.dot').addClass('active');
	}

	// scrollama event handlers
	function handleStepEnter(response) {
		updateMenu(response);
		response.element.classList.add('is-active');
	}

	function handleStepExit(response) {
		updateMenu(response);
		response.element.classList.remove('is-active');
	}

	function init() {

		// 1. setup the scroller with the bare-bones options
		// this will also initialize trigger observations
		// 3. bind scrollama event handlers (this can be chained like below)
		scroller.setup({
			step: '.step',
			offset: 0.85,
			debug: false,
		})
			.onStepEnter(handleStepEnter)
			.onStepExit(handleStepExit);

		// setup resize event
		window.addEventListener('resize', scroller.resize);
	}

	// kick things off
	init();


	// var flyinsections = $('.flyInClass'),
	// 	offset = 0.3
	// ;

	// $win.on('scroll', function() {
	// 	didScroll = true;		

	// 	// animates speaker blocks
	// 	(!window.requestAnimationFrame) 
	// 		? setTimeout(function(){ showBlocks(flyinsections, offset); }, 100)
	// 		: window.requestAnimationFrame(function(){ showBlocks(flyinsections, offset); });

	// });

	$( window ).resize(function() {
	  scroller.resize();
	});

	$('.siteNav ul li').click(function(e){
		// scroller.disable();
		// $('html, body').animate({
	 //        scrollTop: $("#"+response.element.id).offset().top
	 //    }, 1000);
		// setTimeout(function(){ scrollDelay = false; }, 3000);
	});

	$('a[href^="#"]').on('click', function(event) {
	    var target = $(this.getAttribute('href'));
	    if( target.length ) {
	        event.preventDefault();
	        $("html body").stop(false,true).animate({
	            scrollTop: target.offset().top
	        }, 1000);
	    }
	});

	$('.checkbox').click(function(e){
		if($(this).find('.rectangle').hasClass('active')){
			$(this).find('.rectangle').removeClass('active');
			$(this).find($(":input")).attr( "checked", false );
		}else{
			$(this).find('.rectangle').addClass('active');
			$(this).find($(":input")).attr( "checked", true );
		}
    		
	});



	$form.on('click', '.form-control', function(e){
		if(formFail){
			$('#' + $(this).attr("id") + '-error').remove();
		}
		
	});

	$form.on('click', 'input[type="submit"]', function(e) {
		e.preventDefault();
		var checkbox = $form.find('input[type="checkbox"]');

		if (!checkbox.is(':checked')) {
			alert('Please select at least one checkbox.');
		}

		if ($form.valid()) {
			submitForm(e, checkbox);
		}else{
			formFail = true;
		}
	});

	//Trigger menu on click... obvi
	App.on('click', '.mobileBanner', function() {
		var el = $(this);
		if($mobileNav.hasClass('active')){
			$mobileNav.removeClass('active');
			$('#mobileHam').removeClass('active');
			$('#mobileHam').addClass('not-active');

		}else{
			$('#mobileHam').removeClass('not-active');
			$mobileNav.addClass('active');
			$('#mobileHam').addClass('active');
		}
	});

	App.on('click', '.nav-list >a >li', function(e) {
		e.preventDefault();
		$mobileNav.removeClass('active');
		$('#mobileHam').removeClass('active');
		$('#mobileHam').addClass('not-active');
	});

});