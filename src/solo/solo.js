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
})();
