$( document ).ready(function() {
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


});