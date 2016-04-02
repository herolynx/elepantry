// COUNT HEIGHT WINDOW TAG

$(document).ready(function() {
	$(window).resize(function(){
		var heightNavigation = $('#navigation_right').height();
		var heightHeaderFile = $('#navigation_right.file .header').height();
		var heightHeaderView = $('#navigation_right.view .header').innerHeight();
		var heightAction = $('#navigation_right .action').outerHeight();
		var heighWrapperFile = heightNavigation - heightHeaderFile - heightAction;
		var heighWrapperView = heightNavigation - heightHeaderView - heightAction - 10;

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


$(".close-window" ).click(function() {
	$('#add-view-form, #add-tag-form').hide();
});

$(".add-tag").click(function() {
	$('#add-tag-form').css('display', 'block');
});

$("#add-tag-close").click(function() {
	$('#add-tag-form').hide();
});

$(".add-view").click(function() {
	$('#add-view-form').css('display', 'block');
});

$("#add-view-close").click(function() {
	$('#add-view-form').hide();
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

var showTagsMenu = function() {
	$( "#navigation_right" ).animate({
		right: 0
	}, 300);
	hideLeftMenu();
}

var hideRightMenu = function() {
	$( "#navigation_right" ).animate({
		right: -215
	}, 300);
};

$( ".close_navigation_file" ).click(function() {
  	hideRightMenu();
});

$( "#add-file" ).click(function() {
  $( "#add-file-form" ).animate({
	 right: 10
 }, 300);
});

$( ".close-window" ).click(function() {
  $( "#add-file-form" ).animate({
	 right: -400
 }, 300);
});



$('.hamburger').click(function() {
	 if(leftMenuShown){
			hideLeftMenu();
	 } else {
			showLeftMenu();
	 }
});

var leftMenuShown = false;
var showLeftMenu = function() {
	$('#navigation').animate({
			left: '0px'
	},300);
 $('#leftMenuButton').addClass('is-active');
	hideRightMenu();
	leftMenuShown = true;
};

var hideLeftMenu = function() {
	$('#navigation').animate({
			left: '-215px'
	},300);
	$('#leftMenuButton').removeClass('is-active');
	leftMenuShown = false;
};
