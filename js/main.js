$(document).ready(function() {

    $('.menu-settings-toggle').on('click', function(e){
	$('.settings-module, .settings-bg').fadeToggle("show hide");
	e.preventDefault();
    });
    $('.settings-bg, .close').on('click', function(e){
    $('.settings-module, .settings-bg').fadeOut("hide");
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
    	$('.main, button, .title').css('background-color', new_color);

    });

});
