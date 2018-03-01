(function () {

  if($('.first-screen').length === 1) {
    // first screen
    $('.first-screen').height($(window).height());

    $('.first-screen .panel').height($(window).height() - 66);

    // scroll
    $(window).scroll(function () {
      if ($('body').height() < $(window).height() * 2 + $('.header').outerHeight()) {
        return;
      }
      if ($(window).scrollTop() > $(window).height()) {
        $('.header').addClass('header-fixed');
        $('.first-screen .required').css('padding-top', '116px')
        $('.header-a').removeClass('current header-a-first');
      } else {
        $('.header').removeClass('header-fixed');
        $('.first-screen .required').css('padding-top', '50px')
        $('.header-a').addClass('current header-a-first');
      }
    });
  }

  // baidu
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?f17557e022686a8ff2a6d32403393093";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();