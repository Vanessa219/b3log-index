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
 * @version 1.0.1.4, Nov 24, 2012
 */

var Cookie = {
    readCookie: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
        }
        return "";
    },

    eraseCookie: function (name) {
        this.createCookie(name,"",-1);
    },

    createCookie: function (name,value,days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime()+(days*24*60*60*1000));
            expires = "; expires="+date.toGMTString();
        }
        document.cookie = name+"="+value+expires+"; path=/";
    }
};

var Index = {
    getNews: function () {
        $.ajax({
            url: "http://symphony.b3log.org/apis/news",
            type: "GET",
            dataType:"jsonp",
            jsonp: "callback",
            error: function(){
                $(".news .module-content").html("加载新闻列表失败 :-(").css("background-image", "none");
            },
            success: function(data, textStatus){
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
                    +  article.articleTitle + "</a>&nbsp;<span>[" + Index._getDate(article.articleCreateTime) 
                    + "]</span></li>"
                    listHTML += articleLiHtml
                }
                listHTML += "</ul>";
                    
                $(".news .module-content").html(listHTML).css("background-image", "none");
                
            }
        });
    },
    
    _getDate: function (a) {
        var c=new Date(a);
        var d=c.getFullYear().toString().substr(2, 2),
        e=c.getMonth()+1,
        f=c.getDate();
        
        if (e < 10) {
            e = "0" + e;
        }
        
        if (f < 10) {
            f = "0" + f;
        }
        return d + "-" + e + "-" + f;
    },
    
    initThemes: function () {
        Index._initThemesHTML();
        
        var imageLength =  $("#themesScroll img").length,
        imageWidth = 122;
        var $themesScrollPanel = $("#themesScrollPanel");
        $themesScrollPanel.width(imageWidth * imageLength);
        
        $themesScrollPanel.find("img").click(function () {
            var $it = $(this);
            var imageArray = $it.attr("src").split("/");
            var image = imageArray[imageArray.length - 1];
            $("#themesPreview > div").hide();
            $("#themes" + image.split(".")[0]).show();
            
            $themesScrollPanel.find("img").removeClass();
            $it.addClass("selected");
            
            if ($it.data("index") === 7 || $it.data("index") === 12) {
                $themesScrollPanel.animate({
                    "left": "-727px"
                }, 1000);
            } 
            
            if ($it.data("index") === 6) {
                $themesScrollPanel.animate({
                    "left": "6px"
                }, 1000);
            } 
            
            if ($it.data("index") === 13) {
                $themesScrollPanel.animate({
                    "left": "-1459px"
                }, 1000);
            } 
        });
    },
    
    _initThemesHTML: function () {
        var authors = ['Vanessa', 'Dongxu Wang', 'Vanessa', 'Vanessa', 'Vanessa', 'Lamb', 'Vanessa',
        'Vanessa', 'Vanessa', 'Dongxu Wang', 'Ansen', 'Ansen', 'Ansen', 'Noday', 'Noday'],
        authorUrls = ['vanessa.b3log.org', 'dx.b3log.org', 'vanessa.b3log.org', 'vanessa.b3log.org', 
        'vanessa.b3log.org', 'lamb.b3log.org', 'vanessa.b3log.org',
        'vanessa.b3log.org', 'vanessa.b3log.org', 'dx.b3log.org', 'www.ansen.org', 'www.ansen.org',
        'www.ansen.me', 'www.noday.net', 'www.noday.net'],
        downloads = [],
        images = ['ease', 'mobile', 'andrea', 'classic', 'community', 'favourite', 'tree-house',
        'i-nove', 'neoease', 'owmx', 'dot-b', 'shawn', 'coda', '5stylesm', 'idream'],
        previewHTML = "", 
        previewClass = "",
        scrollHTML = "",
        scrollClass = "selected";
        
        for (var j = 0; j < 10; j++) {
            downloads[j] = 'https://github.com/b3log/b3log-solo-skins/zipball/master';
        }
        downloads[0] = 'https://github.com/b3log/b3log-solo';
        downloads[1] = 'https://github.com/b3log/b3log-solo';
        downloads[10] = 'https://github.com/Ansen/BlogSkins';
        downloads[11] = 'https://github.com/Ansen/BlogSkins';
        downloads[12] = 'https://github.com/Ansen/BlogSkins';
        downloads[13] = 'https://github.com/noday/b3log-solo-third-skins';
        downloads[14] = 'https://github.com/noday/b3log-solo-third-skins';
        
        for (var i = 0; i < images.length; i++) {
            previewHTML += '<div class="preview ' + previewClass + '" id="themes' + images[i] 
            + '"><img src="images/themes/' + images[i] + '.png"/>'
            + '<span class="info"><a href="http://' + authorUrls[i] + '" target="_blank">' + authors[i] + '</a><br/>'
            + '<a href="' + downloads[i] + '" target="_blank">Download</a>'
            + '</span></div>';
            if (i === 0) {
                previewClass = "none";
            }
        }
        
        for (var k = 0; k < images.length; k++) {
            scrollHTML += '<img data-index="' + k 
            + '" src="images/themes/' + images[k] + '.png" class=' + scrollClass + ' />';
            if (k === 0) {
                scrollClass = "";
            }
        }
        
        $("#themesPreview").html(previewHTML);
        $("#themesScrollPanel").html(scrollHTML);
    },
    
    moveNav: function (id) {
        var $nav = $("#" + id),
        winWidth = $(window).width(),
        winHeight = $(window).height();
         
        var top = "",
        left =  "";
        
        if (Cookie.readCookie("top") === "") {
            top = winHeight - $nav.height() - $(".footer").height() - 40 + "px";
            left =  winWidth - 15 - $nav.width() + "px";
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
                window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
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
                } else if(window.captureEvents) {
                    window.captureEvents(Event.MOUSEMOVE|Event.MOUSEUP);
                }
                _document.onmousemove = null;
                _document.onmouseup = null;
                _document.ondragstart = null;
                _document.onselectstart = null;
                _document.onselect = null;
                
                Cookie.createCookie("top", nav.style.top, 365);
                Cookie.createCookie("left", nav.style.left, 365);
            }
        });
    },
    
    initTimeline: function () {
        var height = $(window).height() - 70;
        $(".time-line").height(height);
        $("#timeline").height(height);
        
        if ($.browser.msie && parseInt($.browser.version) < 8) {
            return;
        }
        var timeline = new VMM.Timeline();
        timeline.init();
    },
    
    share: function () {
        var title = encodeURIComponent("B3log - 平等•自由•奔放"),
        url = "http://www.b3log.org",
        pic = "http://www.b3log.org/images/logo.png";
        
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
    
    killBrowser: function () {
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
    },
    
    initNav: function () {
        var $navA = $("#nav li > a");
        
        var $scrollvContentItems = $("body > .wrapper > div"),
        space = [[0, 0]];
        $scrollvContentItems.each(function (i) {
            space.push([space[i][1], this.offsetTop + $(this).height()*3/5 - $(".header").height()]);
        });
        space.splice(0, 1);

        $(window).scroll(function () {
            var top = document.documentElement.scrollTop || document.body.scrollTop,
            current = 0;
            for (var j = 0; j < space.length; j++) {
                if (top > space[space.length - 1][0]) {
                    current = space.length - 1;
                    break;
                }
                if (top >= space[j][0] && top < space[j][1]) {
                    current = j;
                    break;
                }
            }
            $navA.removeClass("current");
            $($navA.get(current)).addClass("current");
        });
        $(window).scroll(); 
        
        $navA.click(function () {
            $navA.removeClass("current");
            $(this).addClass("current");
            
            var currentContent = $("body > .wrapper > div").get($(this).data("index")),
            top = currentContent.offsetTop - $(".header").height() - 30;
            
            if ($.browser.webkit) {
                $('body').animate({
                    "scrollTop": top
                },'slow');
            } else {
                $('html').animate({
                    "scrollTop": top
                },'slow');
            } 
        });
    }
};

(function () {
    Index.killBrowser();
    Index.initThemes();
    Index.initNav();
    Index.share();
    Index.getNews();
    Index.moveNav("nav");
    Index.initTimeline();
})();
