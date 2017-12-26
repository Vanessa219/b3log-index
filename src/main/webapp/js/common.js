/*
 * Copyright (c) 2009, 2010, 2011, 2012, B3log Team
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
 * @version 1.0.2.4, May 4, 2014
 */

var Cookie = {
    readCookie: function(name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ')
                c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0)
                return c.substring(nameEQ.length, c.length);
        }
        return "";
    },
    eraseCookie: function(name) {
        this.createCookie(name, "", -1);
    },
    createCookie: function(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
};

var Index = {
    getNews: function() {
        $.ajax({
            url: "http://symphony.b3log.org/apis/news",
            type: "GET",
            dataType: "jsonp",
            jsonp: "callback",
            error: function() {
                $(".news .module-content").html("加载新闻列表失败 :-(").css("background-image", "none");
            },
            success: function(data, textStatus) {
                var articles = data.articles;
                if (0 === articles.length) {
                    $(".news .module-content").html("无新闻").css("background-image", "none");
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

                $(".news .module-content").html(listHTML).css("background-image", "none");

            }
        });
    },
    _getDate: function(a) {
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
    initThemes: function() {
        $('.fancybox-thumbs').fancybox({
            nextClick: true,
            helpers: {
                thumbs: {
                    width: 50,
                    height: 50
                }
            }
        });

        $('.fancybox-thumbs span').click(function(event) {
            window.open($(this).data("link"));
            event.stopPropagation();
            event.preventDefault();
        });
    },
    moveNav: function(id) {
        var $nav = $("#" + id),
                winWidth = $(window).width(),
                winHeight = $(window).height();

        var top = "",
                left = "";

        if (Cookie.readCookie("top") === "") {
            top = winHeight - $nav.height() - $(".footer").height() - 40 + "px";
            left = winWidth - 15 - $nav.width() + "px";
        } else {
            top = Cookie.readCookie("top");
            left = Cookie.readCookie("left");
        }

        $nav.css({
            "top": top,
            "left": left
        });

        $nav.mousedown(function(event) {
            var _document = document;
            if (!event) {
                event = window.event;
            }
            var nav = $nav[0];
            var x = event.clientX - parseInt(nav.style.left),
                    y = event.clientY - parseInt(nav.style.top);
            _document.ondragstart = "return false;";
            _document.onselectstart = "return false;";
            _document.onselect = "document.selection.empty();";

            if (this.setCapture) {
                this.setCapture();
            } else if (window.captureEvents) {
                window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
            }

            _document.onmousemove = function(event) {
                if (!event) {
                    event = window.event;
                }
                var positionX = event.clientX - x,
                        positionY = event.clientY - y;
                if (positionX < 0) {
                    positionX = 0;
                }
                if (positionX > winWidth - $(nav).width()) {
                    positionX = winWidth - $(nav).width();
                }
                if (positionY < 0) {
                    positionY = 0;
                }
                if (positionY > winHeight - $(nav).height() - 11) {
                    positionY = winHeight - $(nav).height() - 11;
                }
                nav.style.left = positionX + "px";
                nav.style.top = positionY + "px";
            };

            _document.onmouseup = function() {
                if (this.releaseCapture) {
                    this.releaseCapture();
                } else if (window.captureEvents) {
                    window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
                }
                _document.onmousemove = null;
                _document.onmouseup = null;
                _document.ondragstart = null;
                _document.onselectstart = null;
                _document.onselect = null;

                Cookie.createCookie("top", nav.style.top, 365);
                Cookie.createCookie("left", nav.style.left, 365);
            };
        });
    },
    initTimeline: function() {
        var height = $(window).height() - 70;
        $(".time-line").height(height);
        $("#timeline").height(height);

        if ($.browser.msie && parseInt($.browser.version) < 8) {
            $("#timeline").css("overflow-y", "auto");
            return;
        }
        var timeline = new VMM.Timeline();
        timeline.init();
    },
    share: function() {
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

        $(".share span").click(function() {
            var key = this.className.replace("-ico", "");
            window.open(urls[key], "_blank", "top=100,left=200,width=648,height=618");
        });
    },
    killBrowser: function() {
        if ($.browser.msie) {
            var version = parseInt($.browser.version);
            if (version < 7) {
                window.location = "/kill-browser.html";
                return;
            }

            if (version < 9) {
                $("#killBrowser").html("请使用<a href='/kill-browser.html' target='_blank'>高级浏览器</a> ^^");
            }
        }
    }
};

(function() {
    Index.killBrowser();
    if ($("#timeline").length === 0) {
        return false;
    }
    Index.initThemes();
    Index.share();
    Index.getNews();
    Index.moveNav("nav");
    Index.initTimeline();
})();
