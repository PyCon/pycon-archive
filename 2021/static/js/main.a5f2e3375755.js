/* Project specific Javascript goes here. */

$(function() {
  $('#toggle-nav').click(function(){
    $('#main-nav').toggleClass('show-on-mobile');
  });

  $('.welcome-spacer').lowFloat({ float: 'left' });

  $(window).on('load resize', function () {
      $("body").css({'padding-top':($("header").height()+'px')});
  });
});
