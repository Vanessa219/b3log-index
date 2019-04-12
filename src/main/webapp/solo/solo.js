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
    if (!$(this).data("link")) {
      return
    }
    window.open($(this).data("link"));
    event.stopPropagation();
    event.preventDefault();
  });

  // baidu
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?c83493c5643600999077aaba59edc1e4";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();