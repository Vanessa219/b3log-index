(function () {

  var hm = document.createElement('script')
  hm.src = "https://hm.baidu.com/hm.js?c5987c99adea364abddda47382fec820";
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)

  if (typeof $ === 'undefined') {
    return
  }

  if ($('.first-screen').length === 0) {
    return
  }

  $('.first-screen').circleMagic()

  // scroll
  $(window).scroll(function () {
    if ($(window).scrollTop() > $(window).height()) {
      $('.header').addClass('header-fixed')
      $('.header-a').removeClass('current header-a-first')
    } else {
      $('.header').removeClass('header-fixed')
      $('.header-a').addClass('current header-a-first')
    }
  })
})()
