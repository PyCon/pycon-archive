$(document).ready(function() {
    // menu panel
    $(".open-menu").on("click", function() {
        $("#menu-panel").fadeIn(300);
    });
    $(".close-menu-button").on("click", function() {
        $("#menu-panel").fadeOut(300);
        $("a.active").next().fadeOut();
        $("a.active").removeClass("active");
    });

    // main menu
    $("li.has-children a").on("click", function() {
        // close any open sub menus
        $("a.active").next().hide();
        $("a.active").removeClass("active");

        // open appropriate sub menu
        $(this).addClass("active");
        $(this).next().show();
    });

    // animate scroll down button on homepage
    $(".scroll-down").on("click", function() {
        $("html, body").animate({
            scrollTop: $(window).height()
        }, 600);
    });

    // toggle sponsor details on mobile
    $(".sp-button").click(function() {
        $(this).next(".sp-description").toggleClass("open");
    });

    $(window).bind("resize", function() {
        if ($(window).width() > 850) {
            $(".sp-description").removeClass("open");
        }
    });
});

$(document).keyup(function(e) {
    if (e.keyCode == 27) { // escape key maps to keycode `27`
        $("#menu-panel").fadeOut(300);
        $("a.active").next().fadeOut();
        $("a.active").removeClass("active");
    }
});