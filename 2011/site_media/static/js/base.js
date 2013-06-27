




/*
     FILE ARCHIVED ON 1:47:06 Mar 10, 2011 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:16:36 Jun 20, 2013.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
jQuery.fn.autoscroll = function() {
    $('html,body').animate({scrollTop: this.offset().top}, 500);
}

$(function() {
    $("#messages li a").click(function() {
        $(this).parent().fadeOut();
        return false;
    });
});
