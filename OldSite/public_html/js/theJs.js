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

	var menuWasClicked = false;
	var lastScrolled;
	var lastScrolledTop;

	// Anchors corresponding to menu items

	var scrollTrigger =$('.scrollTrigger');
	var scrollTriggerTop = $('.scrollTriggerTop');

	// var scrollWindowSave = $win.scrollTop();
	var detailsAnchor = $('#details');
	var scheduleAnchor = $('#schedule');
	var speakersAnchor = $('#speakers');
	var sponsorsAnchor = $('#sponsors');
	var locationAnchor = $('#location');
	var rsvpAnchor = $('#rsvp');

	var anchorArray = [
	'details',
	'schedule',
	'speakers',
	'sponsors',
	'location',
	'rsvp'
	];

	// floating labels
    if ($.fn.floatLabel) {
        App.floatLabel();
    }

    if ($.fn.validate) {
    	$form.validate();
    }

    function processURL(response, urlPath){
    	document.getElementById("content").innerHTML = response.html;
     	document.title = response.pageTitle;
     	window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", urlPath);
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

	function checkPosition(){

	}

	var pusherArray = [];
	var lastScrollTop = 0;

	$(window).scroll(function() {
  		var fixed_position = scrollTrigger.offset().top;
  		var fixed_height = scrollTrigger.height();

  		var fixedTop_Position = scrollTriggerTop.offset().top;
  		var fixedTop_height = scrollTriggerTop.height().top;

  		var toCross_position = $('.scroller').offset().top;

  		if (fixed_position + fixed_height  < toCross_position) {
  			console.log(toCross_position);
	    	fixed.removeClass('white');
	  	} else if (fixed_position > toCross_position + toCross_height) {
	    	fixed.removeClass('white');
	  	} else {
	    	fixed.addClass('white');
	  	}

  	// 	if(menuWasClicked == false){
  	// 		for (var i = 0; i < anchorArray.length; i++) {
			// 	var tempAnchor = $('#'+anchorArray[i]);

			// 	var toCross_position = tempAnchor.offset().top;
  	// 			var toCross_height = tempAnchor.height();

  	// 			if (fixed_position + fixed_height  < toCross_position) {
  	// 				if((pusherArray.indexOf(anchorArray[i]) > -1)){
  	// 					pusherArray.splice(i, 1);
  	// 				}
			// 	}
			// 	else if (fixed_position > toCross_position + toCross_height) {
			// 	}
			// 	else {
			// 	    if((pusherArray.indexOf(anchorArray[i]) > -1)){
			// 	    }else{
			// 	    	if(lastScrolled != anchorArray[i]){
			// 	    		// processURL();
			// 	    		// window.history.pushState("object or string", "", '/'+'#'+anchorArray[i]);
			// 	    		$('html, body').animate({
			// 			        scrollTop: tempAnchor.offset().top
			// 			    }, 'slow');
			// 			    lastScrolled = anchorArray[i];
			// 			    $('.siteNav ul li .dot.active').removeClass('active');
			// 				$(".siteNav a[href*='"+anchorArray[i]+"']").find('.dot').addClass('active');
			// 			}
			// 	    	pusherArray.push(anchorArray[i]);
			// 	    }
			// 	}

			//     if (fixedTop_Position + fixedTop_height  < toCross_position) {
			// 	}
			// 	else if (fixedTop_Position > toCross_position + toCross_height) {
			// 	} 
			// 	else {
			// 	    if((pusherArray.indexOf(anchorArray[i]) > -1)){
			// 	    	// window.history.pushState("object or string", "", '/'+'#'+anchorArray[i]);
			// 	    	lastScrolledTop = anchorArray[i];
			// 	    	$('.siteNav ul li .dot.active').removeClass('active');
			// 			$(".siteNav a[href*='"+lastScrolledTop+"']").find('.dot').addClass('active');
			// 	    }else{
				    	

			// 	    }
			// 	}
				
			// }
  	// 	}

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


	 $('.siteNav ul li').click(function(e){
	     	$('.siteNav ul li .dot.active').removeClass('active');
    		$(this).find('.dot').addClass('active');
    		menuWasClicked = true;
    		setTimeout(function(){ menuWasClicked = false; }, 3000);
	  });

	 $('.nav-list a').click(function(e){
    		menuWasClicked = true;
    		setTimeout(function(){ menuWasClicked = false; }, 10000);
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
		}else{
			$mobileNav.addClass('active');
		}
	});

	App.on('click', '.nav-list >a >li', function(e) {
		e.preventDefault();
		$mobileNav.removeClass('active');
	});

});