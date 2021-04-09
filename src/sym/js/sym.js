(function () {
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
