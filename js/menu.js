! function(a) {
    "function" == typeof define && define.amd ? define(["jquery"], a) : "object" == typeof exports ? module.exports = a : a(jQuery)
}(function(a) {
    function b(b) {
        var g = b || window.event,
            h = i.call(arguments, 1),
            j = 0,
            l = 0,
            m = 0,
            n = 0,
            o = 0,
            p = 0;
        if (b = a.event.fix(g), b.type = "mousewheel", "detail" in g && (m = -1 * g.detail), "wheelDelta" in g && (m = g.wheelDelta), "wheelDeltaY" in g && (m = g.wheelDeltaY), "wheelDeltaX" in g && (l = -1 * g.wheelDeltaX), "axis" in g && g.axis === g.HORIZONTAL_AXIS && (l = -1 * m, m = 0), j = 0 === m ? l : m, "deltaY" in g && (m = -1 * g.deltaY, j = m), "deltaX" in g && (l = g.deltaX, 0 === m && (j = -1 * l)), 0 !== m || 0 !== l) {
            if (1 === g.deltaMode) {
                var q = a.data(this, "mousewheel-line-height");
                j *= q, m *= q, l *= q
            } else if (2 === g.deltaMode) {
                var r = a.data(this, "mousewheel-page-height");
                j *= r, m *= r, l *= r
            }
            if (n = Math.max(Math.abs(m), Math.abs(l)), (!f || f > n) && (f = n, d(g, n) && (f /= 40)), d(g, n) && (j /= 40, l /= 40, m /= 40), j = Math[j >= 1 ? "floor" : "ceil"](j / f), l = Math[l >= 1 ? "floor" : "ceil"](l / f), m = Math[m >= 1 ? "floor" : "ceil"](m / f), k.settings.normalizeOffset && this.getBoundingClientRect) {
                var s = this.getBoundingClientRect();
                o = b.clientX - s.left, p = b.clientY - s.top
            }
            return b.deltaX = l, b.deltaY = m, b.deltaFactor = f, b.offsetX = o, b.offsetY = p, b.deltaMode = 0, h.unshift(b, j, l, m), e && clearTimeout(e), e = setTimeout(c, 200), (a.event.dispatch || a.event.handle).apply(this, h)
        }
    }

    function c() {
        f = null
    }

    function d(a, b) {
        return k.settings.adjustOldDeltas && "mousewheel" === a.type && b % 120 === 0
    }
    var e, f, g = ["wheel", "mousewheel", "DOMMouseScroll", "MozMousePixelScroll"],
        h = "onwheel" in document || document.documentMode >= 9 ? ["wheel"] : ["mousewheel", "DomMouseScroll", "MozMousePixelScroll"],
        i = Array.prototype.slice;
    if (a.event.fixHooks)
        for (var j = g.length; j;) a.event.fixHooks[g[--j]] = a.event.mouseHooks;
    var k = a.event.special.mousewheel = {
        version: "3.1.12",
        setup: function() {
            if (this.addEventListener)
                for (var c = h.length; c;) this.addEventListener(h[--c], b, !1);
            else this.onmousewheel = b;
            a.data(this, "mousewheel-line-height", k.getLineHeight(this)), a.data(this, "mousewheel-page-height", k.getPageHeight(this))
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var c = h.length; c;) this.removeEventListener(h[--c], b, !1);
            else this.onmousewheel = null;
            a.removeData(this, "mousewheel-line-height"), a.removeData(this, "mousewheel-page-height")
        },
        getLineHeight: function(b) {
            var c = a(b),
                d = c["offsetParent" in a.fn ? "offsetParent" : "parent"]();
            return d.length || (d = a("body")), parseInt(d.css("fontSize"), 10) || parseInt(c.css("fontSize"), 10) || 16
        },
        getPageHeight: function(b) {
            return a(b).height()
        },
        settings: {
            adjustOldDeltas: !0,
            normalizeOffset: !0
        }
    };
    a.fn.extend({
        mousewheel: function(a) {
            return a ? this.bind("mousewheel", a) : this.trigger("mousewheel")
        },
        unmousewheel: function(a) {
            return this.unbind("mousewheel", a)
        }
    })
});
$(function() {
    var i = 0;
    var $btn = $('.section-btn li'),
        $wrap = $('.section-wrap'),
        $arrow = $('.arrow');

    function up() {
        if (i != ($btn.length - 1)) {
            i++
        }
    }

    function down() {
        if (i != 0) {
            i--
        }
    }

    $(".navbar-right li").click(function(){
        $(".navbar-right").find("li").removeClass("active");
        $(this).addClass("active");
        var menuid=$(this).attr("data-id")
        i=Number(menuid);
        run();
    });

    $(".nextPageBtn").click(function(){
        i=1;
        run();
    });


    function run() {
        var plat=platForm();
        $btn.eq(i).addClass('on').siblings().removeClass('on');
        $wrap.attr("class", "section-wrap").addClass(function() {
            return "put-section-" + i
        }).find('.section').eq(i).find('.title').addClass('active');
        console.log(i);
    };
    $btn.each(function(index) {
        $(this).click(function() {
            i = index;
            run()
        })
    });
    document.addEventListener('touchstart', touch, false);
    document.addEventListener('touchmove', touch, false);
    document.addEventListener('touchend', touch, false);
    var startY = 0;

    function touch(event) {
        var event = event || window.event;
        var html;
        switch (event.type) {
            case "touchstart":
                startY = event.touches[0].clientY;
                break;
            case "touchend":
                if ((event.changedTouches[0].clientY - startY) > 50) {
                    //alert(event.changedTouches[0].clientY - startY)
                    down();
                    run()
                } else if ((event.changedTouches[0].clientY - startY) < -50) {
                    //alert(event.changedTouches[0].clientY - startY)
                    up();
                    run()
                }
                startY = 0;
                break;
            case "touchmove":
                break
        }
    }
    $arrow.one('click', go);

    function go() {
        up();
        run();
        setTimeout(function() {
            $arrow.one('click', go)
        }, 1000)
    };
    $wrap.one('mousewheel', mouse_);

    function mouse_(event) {
        if (event.deltaY > 0) {
            down()
        } else {
            up()
        }
        run();
        setTimeout(function() {
            $wrap.one('mousewheel', mouse_)
        }, 1000)
    };
    $(document).one('keydown', k);

    function k(event) {
        var e = event || window.event;
        var key = e.keyCode || e.which || e.charCode;
        switch (key) {
            case 38:
                down();
                run();
                break;
            case 40:
                up();
                run();
                break
        };
        setTimeout(function() {
            $(document).one('keydown', k)
        }, 1000)
    }
});

function platForm(){
    var system = {
        win: false,
        mac: false,
        xll: false
    };
    //���ƽ̨
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);
    //��ת���
    if (system.win || system.mac || system.xll) {//ת���̨��½ҳ��
        return 0;//PC
    } else {
        return 1;
    }
}