// COUNT HEIGHT WINDOW TAG

$(document).ready(function() {
	$(window).resize(function(){
		var heightNavigation = $('#navigation_right').height();
		var heightHeaderFile = $('#navigation_right.file .header').height();
		var heightHeaderView = $('#navigation_right.view .header').innerHeight();
		var heightAction = $('#navigation_right .action').outerHeight();
		var heighWrapperFile = heightNavigation - heightHeaderFile - heightAction;
		var heighWrapperView = heightNavigation - heightHeaderView - heightAction - 10;

		console.log(heightHeaderFile, heightHeaderView)

		$('#navigation_right.file #wrapper').css('height', heighWrapperFile);
		$('#navigation_right.view #wrapper').css('height', heighWrapperView);
	});
	$(window).resize();
});

// SCROLL NAVIGATON

(function($){
	$(window).load(function(){
		$("#navigation #wrapper, #navigation_right #wrapper").mCustomScrollbar({
			scrollbarPosition:"outside"
		});
	});
})(jQuery);

// SELECT

$('select').niceSelect();

// ADD TAG

$('textarea').tagsInput();

// HAMBURGER
(function() {
	"use strict";
	var toggles = document.querySelectorAll(".hamburger");
	for (var i = toggles.length - 1; i >= 0; i--) {
		var toggle = toggles[i];
		toggleHandler(toggle);
	};
	function toggleHandler(toggle) {
		toggle.addEventListener( "click", function(e) {
			e.preventDefault();
			(this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
		});
	}

})();



// DELETE LETER



$(".close-window" ).click(function() {
	$('#add-view-form, #add-tag-form, #add-file-form').hide();
});

$(".add-tag").click(function() {
	$('#add-tag-form').css('display', 'block');
});

$(".add-view").click(function() {
	$('#add-view-form').css('display', 'block');
});

$( "#add-file" ).click(function() {
  	$('#add-file-form').css('display', 'block');
});

$( ".search .button button[type=submit]").click(function() {
  	$('.search .select').toggleClass('open-search');
		$('.search button[type=submit]').toggleClass('button-hover');
});

$( "#add-file" ).click(function() {
  	$('#add-file-form').css('display', 'block');
});

$( "#view_list" ).click(function() {
	$('#files').toggleClass().addClass('list');
});
$( "#view_grid" ).click(function() {
	$('#files').toggleClass().addClass('grid');
});

$( ".open_navigation_view" ).click(function() {
  $( "#navigation_right.view" ).animate({
	  right: 0
  }, 500);
});

$( ".close_navigation_view" ).click(function() {
  $( "#navigation_right.view" ).animate({
	  right: -215
  }, 500);
});

$( ".open_navigation_file" ).click(function() {
  $( "#navigation_right.file" ).animate({
	  right: 0
  }, 300);
});

$( ".close_navigation_file" ).click(function() {
  $( "#navigation_right.file" ).animate({
	  right: -215
  }, 300);
});



$('.hamburger').click(function() {
	 var hidden = $('#navigation').data('hidden');

	 if(hidden){
			 $('#navigation').animate({
					 left: '-215px'
			 },300);
	 } else {
			 $('#navigation').animate({
					 left: '0px'
			 },300);
	 }
    $('#navigation').data("hidden", !hidden);

});
