(function () {
  var userName = 'b3log.solo@gmail.com',
    password = 'b3logsolo';
  for (var i = 0; i <= 29; i++) {
    setTimeout(function () {
      var index = $('#userName').val().length;
      if (index < 20) {
        $('#userName').val(userName.substr(0, index + 1));
      } else {
        index = $('#password').val().length;
        $('#password').val(password.substr(0, index + 1));
      }
    }, 150 * i)
  }

  $('.fancybox-thumbs').fancybox({
    nextClick: true,
    helpers: {
      thumbs: {
        width: 50,
        height: 50
      }
    }
  });

  $('.fancybox-thumbs span').click(function (event) {
    window.open($(this).data("link"));
    event.stopPropagation();
    event.preventDefault();
  });

  // baidu
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?f17557e022686a8ff2a6d32403393093";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();