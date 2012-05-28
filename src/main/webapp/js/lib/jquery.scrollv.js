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
 * @fileoverview scroll top and down.
 *
 * @author <a href="mailto:LLY219@gmail.com">Liyuan Li</a>
 * @version 1.0.0.9, Apr 2, 2012
 */
(function ($) {
    $.fn.extend({
        scrollv: {
            version: "1.0.0.7",
            author: "lly219@gmail.com"
        }
    });

    var dpuuid = new Date().getTime();
    var PROP_NAME = 'scrollv';

    var Scrollv = function () {
        this._defaults = {
            "classNames": {}
        }
    };

    $.extend(Scrollv.prototype, {
        _attach: function (target, settings) {
            if (!target.id) {
                this.uuid++;
                target.id = 'dp' + this.uuid;
            }
            var inst = this._newInst($(target));

            inst.settings = $.extend({}, settings || {});
            $.data(target, PROP_NAME, inst);
            this._init(target);
        },

        /* Create a new instance object. */
        _newInst: function (target) {
            // escape jQuery meta chars
            var id = target[0].id.replace(/([^A-Za-z0-9_])/g, '\\\\$1');
            return {
                id: id
            };
        },

        _getInst: function (target) {
            try {
                return $.data(target, PROP_NAME);
            } catch (err) {
                throw 'Missing instance data for this scrollv';
            }
        },

        _destroyScrollv: function (target) {
           
        },

        _init: function (target) {
            var inst = this._getInst(target);
            var id = inst.id,
            settings = inst.settings;
            var winHeight = document.documentElement.clientHeight,
            winWidth = document.documentElement.clientWidth;
            if (winHeight < 650) {
                winHeight = 650;
            }
            if (winWidth < 990) {
                winWidth = 990;
            }
            
            var $scrollvContentItems = $("#" + id + "Content>div"),
            headerHeight = $(".header").height() + parseInt($(".header").css("paddingBottom")),
            footerHeight = $(".footer").height() + parseInt($(".footer").css("padding-top")) * 2;
            
            // set each panel padding
            $scrollvContentItems.each(function (i) {
                var $it = $(this);
                var paddingTB = parseInt((winHeight - headerHeight - $it.height()) / 3);
                
                if (i === $scrollvContentItems.length - 1) {
                    // timeline has no lien
                    paddingTB = parseInt((winHeight - headerHeight - footerHeight - $it.height()) / 2);
                } else if (i === 2) {
                    paddingTB = parseInt((winHeight - $it.height()) / 3);
                }
                
                paddingTB = paddingTB > 0 ? paddingTB : 10;
                
                $it.css({
                    "paddingTop": paddingTB,
                    "paddingBottom": paddingTB
                });
                
                $it.find(".line").css("marginBottom", paddingTB);
            });

            settings.winHeight = winHeight;
            settings.headerHeight = headerHeight;
            settings.footerHeight = footerHeight;
            
            this._scrollEvent(target);
            this._goto(id, settings);
        },

        _scrollEvent: function (target) {
            var inst = this._getInst(target);
            var id = inst.id;
            var $scrollvContentItems = $("#" + id + "Content>div"),
            space = [],
            $navItem = $("#" + id + " a");

            $scrollvContentItems.each(function (i) {
                var $it = $(this);
                var height = parseInt($it.height() + parseInt($it.css("paddingTop")) * 2);
                if (i === 0) {
                    space.push([0, parseInt(height / 3 * 2)]);
                } else if (i === $scrollvContentItems.length - 1) {
                    space.push([space[i - 1][1], document.body.offsetHeight]);
                } else if (i === 2) {
                    space.push([space[i - 1][1], space[i - 1][1] + parseInt(height / 3 * 2)]);
                } else {
                    space.push([space[i - 1][1], 
                        space[i - 1][1] + parseInt(height / 3 * 4)]);
                }
            });
            
            $(window).scroll(function () {
                var top = document.documentElement.scrollTop || document.body.scrollTop,
                current = 0;
                for (var j = 0; j < space.length; j++) {
                    if (top >= space[j][0] && top < space[j][1]) {
                        current = j;
                        break;
                    }
                }
                
                $navItem.removeClass("current");
                $($navItem.get(current)).addClass("current");
                
                if (current > 1) {
                    $(".header").slideUp("normal", function () {
                        $("#sHeader").show();
                    });
                } else {
                    $("#sHeader").hide();
                    $(".header").slideDown();
                }
            });
            $(window).scroll();
        },
        
        _goto: function (id, settings) {
            var $navItem = $("#" + id + " a");
            $navItem.click(function () {
                var $it = $(this);
                var index = $it.data("index");
                $navItem.removeClass("current");
                $it.addClass("current");
                
                var currentContent = $("#" + id + "Content > div").get(index),
                top = currentContent.offsetTop - settings.headerHeight;
                
                if (index > 1) {
                    top += $(".header").height();
                }
                
                $(window).scrollTop(top);
            });
        },

        _getClassNames: function (theme, classNames) {
            if (theme === "default" || theme === undefined) {
                return classNames;
            }
            var cns = {};
            for (var key in classNames) {
                cns[key] = theme + classNames[key];
            }
            return cns;
        }
    });

    $.fn.scrollv = function (options) {        
        return this.each(function () {
            $.scrollv._attach(this, options);
        });
    };

    $.scrollv = new Scrollv();

    // Add another global to avoid noConflict issues with inline event handlers
    window['DP_jQuery_' + dpuuid] = $;
})(jQuery);