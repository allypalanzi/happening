$(document).ready(function() {

    $('.menu-settings-toggle').on('click', function(e){
	$('.settings-module').fadeToggle("show hide");
	e.preventDefault();
    });

    $(".settings-nav li").click(function() {
        $(".settings-nav li").removeClass('active');
        $(this).addClass("active");
        $(".settings-content").hide();
        var selected_tab = $(this).find("a").attr("href");
        $(selected_tab).fadeIn();
        return false;
    });

    $(".colors li").click(function() {
    	var new_color = $(this).css('background-color');
    	$('.main, button').css('background-color', new_color);

    });

});
