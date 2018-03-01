/*
 * Copyright (c) 2009-1028, B3log Team
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @fileoverview b3log index js.
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @author <a href="mailto:DL88250@gmail.com">Liang Ding</a>
 * @version 1.1.0.0, Mar 1, 2018
 */

var Index = {
  getNews: function () {
    $.ajax({
      url: "http://symphony.b3log.org/apis/news",
      type: "GET",
      dataType: "jsonp",
      jsonp: "callback",
      error: function () {
        $("#dynamic").html("加载新闻列表失败 :-(").css("background-image", "none");
      },
      success: function (data, textStatus) {
        var articles = data.articles;
        if (0 === articles.length) {
          $("#dynamic").html("无新闻").css("background-image", "none");
          return;
        }

        var listHTML = "<ul>";
        for (var i = 0; i < articles.length && i < 9; i++) {
          var article = articles[i];
          var articleLiHtml = "<li>"
            + "<a target='_blank' href='" + article.articlePermalink + "'>"
            + article.articleTitle + "</a>&nbsp;<span>[" + Index._getDate(article.articleCreateTime)
            + "]</span></li>";
          listHTML += articleLiHtml;
        }
        listHTML += "</ul>";

        $("#dynamic").html(listHTML).css("background-image", "none");
      }
    });
  },
  _getDate: function (a) {
    var c = new Date(a);
    var d = c.getFullYear().toString().substr(2, 2),
      e = c.getMonth() + 1,
      f = c.getDate();

    if (e < 10) {
      e = "0" + e;
    }

    if (f < 10) {
      f = "0" + f;
    }
    return d + "-" + e + "-" + f;
  },
  initTimeline: function () {
    var height = $(window).height() - 110;
    $("#timeline").height(height);

    if ($.browser.msie && parseInt($.browser.version) < 8) {
      $("#timeline").css("overflow-y", "auto");
      return;
    }
    var timeline = new VMM.Timeline();
    timeline.init();
  },
  share: function () {
    var title = encodeURIComponent("B3log - 平等•自由•奔放"),
      url = "http://b3log.org",
      pic = "http://b3log.org/images/logo.png";

    var urls = {};
    urls.tencent = "http://share.v.t.qq.com/index.php?c=share&a=index&title=" + title +
      "&url=" + url + "&pic=" + pic;
    urls.sina = "http://v.t.sina.com.cn/share/share.php?title=" +
      title + "&url=" + url + "&pic=" + pic;
    urls.google = "https://plus.google.com/share?url=" + url;
    urls.twitter = "https://twitter.com/intent/tweet?status=" + title + " " + url;

    $(".share span").click(function () {
      var key = this.className.replace("-ico", "");
      window.open(urls[key], "_blank", "top=100,left=200,width=648,height=618");
    });
  },
  killBrowser: function () {
    if ($.browser.msie && parseInt($.browser.version) < 9) {
      window.location = "/kill-browser.html";
    }
  }
};

(function () {
  Index.killBrowser();
  Index.share();
  Index.getNews();
  Index.initTimeline();

  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?174a1111f4c1724383232f848510cd2c";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();
