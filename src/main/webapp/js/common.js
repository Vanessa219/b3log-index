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
 * @version 1.0.1.3, Jun 16, 2012
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
            url: "http://symphony.b3log.org:80/get-news",
            type: "GET",
            dataType:"jsonp",
            jsonp: "callback",
            error: function(){
                $("#news").html("加载新闻列表失败 :-(").css("background", "none repeat scroll 0 0 padding-box rgba(182, 182, 182, 0.7)");
            },
            success: function(data, textStatus){
                var articles = data.articles;
                if (0 === articles.length) {
                    $("#news").html("无新闻").css("background", "none repeat scroll 0 0 padding-box rgba(182, 182, 182, 0.7)");
                    return;
                }
                
                var listHTML = "<ul>";
                for (var i = 0; i < articles.length && i < 9; i++) {
                    var article = articles[i];
                    var articleLiHtml = "<li>"
                    + "<span>[" + Index._getDate(article.articleCreateDate) 
                    + "]</span><a target='_blank' href='" + article.articlePermalink + "'>"
                    +  article.articleTitle + "</a></li>"
                    listHTML += articleLiHtml
                }
                listHTML += "</ul>";
                    
                if ($.browser.msie && $.browser.version < 9) {
                    $("#news").html(listHTML).css("background-color", "#C3C3C1");
                    return;
                }
                $("#news").html(listHTML).css("background", "none repeat scroll 0 0 padding-box rgba(182, 182, 182, 0.7)");
                
            }
        });
    },
    
    _getDate: function (a) {
        var c=new Date(a);
        var d=c.getFullYear().toString(),
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
        imageWidth = 164,
        groupLength = 5;
        var $themesScrollPanel = $("#themesScrollPanel");
        $themesScrollPanel.width(imageWidth * imageLength);
        
        $themesScrollPanel.data("current", 0);
        
        $("#themesPre").click(function () {
            var current = $themesScrollPanel.data("current"); 
            if (current <= 0) {
                return;
            }
            current--;
            
            $themesScrollPanel.data("current", current);
            $themesScrollPanel.animate({
                "left": -(imageWidth * groupLength) * current +  "px"
            }, 1000);
        });
        
        
        $("#themesNext").click(function () {
            var current = $themesScrollPanel.data("current"); 
            if (current >= Math.ceil(imageLength / groupLength) - 1) {
                return;
            }
            current++;
            
            $themesScrollPanel.data("current", current);
            $themesScrollPanel.animate({
                "left": -(imageWidth * groupLength) * current + "px"
            }, 1000);
        });
        
        
        $themesScrollPanel.find("img").click(function () {
            var $it = $(this);
            var imageArray = $it.attr("src").split("/");
            var image = imageArray[imageArray.length - 1];
            $("#themesPreview > div").hide();
            $("#themes" + image.split(".")[0]).show();
            
            $themesScrollPanel.find("img").removeClass();
            $it.addClass("selected");
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
        downloads[1] = 'https://github.com/b3log/b3log-solo';
        downloads[3] = 'https://github.com/b3log/b3log-solo';
        downloads[10] = 'https://github.com/Ansen/BlogSkins';
        downloads[11] = 'https://github.com/Ansen/BlogSkins';
        downloads[12] = 'https://github.com/Ansen/BlogSkins';
        downloads[13] = 'http://code.google.com/p/noday/downloads/list';
        downloads[14] = 'http://code.google.com/p/noday/downloads/list';
        
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
            scrollHTML += '<img src="images/themes/' + images[k] + '.png" class=' + scrollClass + ' />';
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
            $("#dragImg").hide();
        }
       
        $nav.css({
            "top": top,
            "left": left
        });
        
        $("#dragImg").css({
            "top": parseInt(top) - 12 + "px",
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
                
                $("#dragImg").hide();
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
        
        if ($.browser.msie && $.browser.version < 9) {
            return;
        }
        var timeline = new VMM.Timeline();
        timeline.init();
    },
    
    share: function () {
        var title = encodeURIComponent("B3log - 免费的个人独立博客，自由•平等•奔放"),
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
    
    initHeader: function () {
        var item = $("#nav a");
        
        $("#sHeader").mouseover(function () {
            $(".header").show();
            $("#sHeader").hide();
        });
    
        $(".header").mouseout(function () {
            if (item[2].className.indexOf("current") > -1
                || item[3].className.indexOf("current") > -1) {
                $(".header").hide();
                $("#sHeader").show();
            }
        });
        
        $(".header").mouseover(function () {
            if (item[2].className.indexOf("current") > -1
                || item[3].className.indexOf("current") > -1) {
                $(".header").show();
                $("#sHeader").hide();
            }
        });
    },
    
    killBrowser: function () {
        if ($.browser.msie) {
            if ($.browser.version < 7) {
                window.location = "/kill-browser.html";
                return;
            }
            
            if ($.browser.version < 9) {
                $("#killBrowser").html("请使用<a href='/kill-browser.html' target='_blank'>高级浏览器</a> ^^");
            } 
        }
         
    }
};

(function () {
    Index.killBrowser();
    Index.initHeader();
    Index.initThemes();
    Index.share();
    Index.getNews();
    Index.moveNav("nav");
    Index.initTimeline();
    $("#nav").scrollv();
})();
