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
 * @author <a href="http://vanessa.b3log.org>Liyuan Li</a>
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.1.0.1, Mar 12, 2018
 */

var Index = {
  getNews: function () {
    $.ajax({
      url: 'https://ld246.com/apis/news',
      type: 'GET',
      dataType: 'jsonp',
      jsonp: 'callback',
      error: function () {
        $('#dynamic').html('加载新闻列表失败 :-(').css('background-image', 'none')
      },
      success: function (data, textStatus) {
        var articles = data.articles
        if (0 === articles.length) {
          $('#dynamic').html('无新闻').css('background-image', 'none')
          return
        }

        var listHTML = '<ul class="fn-list">'
        for (var i = 0; i < articles.length && i < 9; i++) {
          var article = articles[i]
          var articleLiHtml = '<li>'
            + '<a target=\'_blank\' href=\'' + article.articlePermalink + '\'>'
            + article.articleTitle + '</a>&nbsp;<small class="ft-fade">[' +
            Index._getDate(article.articleCreateTime)
            + ']</small></li>'
          listHTML += articleLiHtml
        }
        listHTML += '</ul>'

        $('#dynamic').html(listHTML).css('background-image', 'none')
      },
    })
  },
  _getDate: function (a) {
    var c = new Date(a)
    var d = c.getFullYear().toString().substr(2, 2),
      e = c.getMonth() + 1,
      f = c.getDate()

    if (e < 10) {
      e = '0' + e
    }

    if (f < 10) {
      f = '0' + f
    }
    return d + '-' + e + '-' + f
  },
  initTimeline: function () {
    $('#timelineRender').height($(window).height() - 66)
    new TL.Timeline('timelineRender',
      'js/index-timeline.json', {
        type: 'timeline',
        width: '100%',
        // start_at_end: true,
        language: 'zh-cn',
      })
  },
  killBrowser: function () {
    if ($.browser.msie && parseInt($.browser.version) < 9) {
      window.location = 'https://b3log.org/kill-browser.html'
    }
  },
};

(function () {
  Index.killBrowser()
  Index.getNews()
  Index.initTimeline()

  var hm = document.createElement('script')
  hm.src = '//hm.baidu.com/hm.js?174a1111f4c1724383232f848510cd2c'
  var s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
