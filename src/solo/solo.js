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
  hm.src = "https://hm.baidu.com/hm.js?174a1111f4c1724383232f848510cd2c";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
