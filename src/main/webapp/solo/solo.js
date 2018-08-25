(function () {
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