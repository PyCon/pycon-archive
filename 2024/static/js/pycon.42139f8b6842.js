function openMenu() {
  $(".menu-panel")
    .animate({ width: "toggle" }, 400)
    .fadeIn(400)
    .addClass("open");
  $(".main-nav").delay(100).fadeIn(600);
  $(".close-menu-button").delay(200).fadeIn(600);

  $(function () {
    function showLink(item) {
      item.animate({ opacity: 1 }, 60, function () {
        showLink(item.next(".main-nav > ul > li"));
      });
    }
    showLink($(".main-nav > ul > li").css({ opacity: 0 }).eq(0));
  });
}

function closeMenu() {
  $(".main-nav").fadeOut(200);
  $(".close-menu-button").fadeOut(200);
  $(".main-nav > ul > li").css({ opacity: 0 });
  $(".menu-panel")
    .animate({ width: "toggle" }, 200)
    .fadeOut(200)
    .removeClass("open");
  $("a.active").removeClass("active");
}

$(document).ready(function () {
  $(".open-menu").on("click", function () {
    if ($(".menu-panel").hasClass("open")) {
      return false;
    } else {
      openMenu();
    }
  });

  $(".auth-link").on("click", function (e) {
    if ($(this).siblings("div .dropdown").length > 0) {
      // It's a sibling of .dashboard, prevent default action
      e.preventDefault();
    }
    if ($(".dropdown").hasClass("open")) {
      $(".dropdown").removeClass("open");
    } else {
      setTimeout(function () {
        $(".dropdown")
          .find("a")
          .each(function () {
            $(this).attr("tabindex", "0");
          });
      }, 10);
      $(".dropdown").addClass("open");
    }
  });

  $(".close-menu-button").on("click", function () {
    closeMenu();
  });

  // open and close top level menu items
  $(".main-nav > ul > li.has-children > a").on("click", function (event) {
    event.preventDefault();
    if ($(this).hasClass("active")) {
      $(this).removeClass("active");
      $(this).next("ul").find("a.active").removeClass("active");
    } else {
      $(this).addClass("active");
    }
  });

  //open and close subsequent level menu items
  $(".toggle-children").on("click", function (event) {
    event.preventDefault();
    if ($(this).parent().hasClass("active")) {
      $(this).parent().removeClass("active");
      $(this).parent().next("ul").find("a.active").removeClass("active");
    } else {
      $(this).parent().addClass("active");
    }
  });
});

$(document).keyup(function (e) {
  if (e.keyCode == 27) {
    // escape key maps to keycode `27`
    closeMenu();
  }
});
