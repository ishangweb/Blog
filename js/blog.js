function addEvent(o, ev, fn) {
    if(o.addEventListener) {
        o.addEventListener(ev, function (ev) {
            if(false === fn.call(o)) {
                ev.cancelBubble=true;
                ev.preventDefault();
            }
        }, false);
    } else if(o.attachEvent) {
        o.attachEvent('on' + ev, function () {
            if(false === fn.call(o)) {
                event.cancelBubble=true;
                return false;
            }
        });
    } else {
        o['on' + ev] = fn;
    }
}
function getScrollTop() {
    var scrollTop = 0;
    if(document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if(document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}
function hasClass(obj, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length === 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + obj.className + ' ');
}
function addClass(obj, cls) {
    if (!hasClass(obj, cls)) {
        obj.className = obj.className === '' ? cls : obj.className + ' ' + cls;
    }
}
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var newClass = ' ' + obj.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        obj.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}

// 头部封面
function setHeader() {
    var seeMore = document.getElementById('seeMore');
    var siteNavBar = document.getElementById('siteNavBar');
    var headerCard = document.getElementById('headerCard');
    var headerMedia = document.getElementById('headerMedia');
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var timer;

    function setBanner() {
        if (windowWidth < 599 || !document.getElementById('Home')) {
            headerCard.style.height = 300 + 'px';
        } else {
            headerCard.style.height = windowHeight + 'px';
            seeMore.setAttribute('data-scroll-to', windowHeight);
        }

        var imgWidth = headerMedia.offsetWidth;
        var imgHeight = headerMedia.offsetHeight;
        var containerHeight = headerCard.offsetHeight;
        var containerWidth = headerCard.offsetWidth;
        var imageRatio = imgWidth / imgHeight;
        var containerRatio = containerWidth / containerHeight;

        var css = {
            position: 'absolute',
            left: 0, top: 0
        };

        // If image is wider than the container
        if (imageRatio > containerRatio) {
            css.left = Math.round((containerWidth - imageRatio * containerHeight) / 2) + 'px';
            css.width = 'auto';
            css.height = '100%';
        }
        // If the container is wider than the image
        else {
            css.top = Math.round((containerHeight - (containerWidth / imgWidth * imgHeight)) / 2) + 'px';
            css.height = 'auto';
            css.width = '100%';
        }

        for (var i in css) {
            headerMedia.style[i] = css[i];
        }
    }
    function setSiteNavBarBg(){
        var scrollT = document.documentElement.scrollTop || document.body.scrollTop;
        var transparency = scrollT / windowHeight;
        if (scrollT >= windowHeight) {
            siteNavBar.style.backgroundColor = 'rgba(0, 0, 0, 1)';
        }else {
            transparency.toFixed(1) > 0.6 ? siteNavBar.style.backgroundColor='rgba(0, 0, 0,'+transparency.toFixed(1)+')': '';
            seeMore.setAttribute('data-scroll-go', scrollT);
        }
    }
    function more(){
        var iScrollGo = parseInt(seeMore.getAttribute('data-scroll-go'));
        var iAson     = 1;
        var iTarget   = parseInt(seeMore.getAttribute('data-scroll-to')) - siteNavBar.offsetHeight;

        timer = setInterval(function(){
            var iScrollTop = (iScrollGo !== 0 && iAson === 1) ? iScrollGo :
                (document.body.scrollTop || document.documentElement.scrollTop);

            var iSpeed= (iTarget-iScrollTop)/8;

            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            iScrollTop = iSpeed + iScrollTop;

            if(iScrollTop >= iTarget){
                clearInterval(timer);
                document.documentElement.scrollTop = document.body.scrollTop = iTarget;
            } else {
                document.documentElement.scrollTop = document.body.scrollTop = iScrollTop;
            }
        }, 20);
        iAson++;
    }

    setBanner();
    window.onresize = setBanner;
    seeMore.onclick = more;
    addEvent(document, 'scroll', setSiteNavBarBg);
    addEvent(document, 'mousewheel', function () {
        clearInterval(timer)
    });
    addEvent(document, 'DOMMouseScroll', function () {
        clearInterval(timer)
    });
}

// 移动端导航
function mobiNav() {
    /**
     * ModalHelper helpers resolve the modal scrolling issue on mobile devices
     * https://github.com/twbs/bootstrap/issues/15852
     * requires document.scrollingElement polyfill https://github.com/yangg/scrolling-element
     */
    var ModalHelper = (function() {
        return {
            afterOpen: function() {
                document.body.style.position = 'fixed';
                document.body.style.top = getScrollTop() + 'px';
                document.body.style.width =  '100%';
            },
            beforeClose: function() {
                // scrollTop lost after set position:fixed, restore it back.
                document.documentElement.scrollTop = document.body.scrollTop = getScrollTop();
                document.body.removeAttribute('style')
            }
        };
    })();

    var navTrigger = document.getElementById('sideNavTrigger');
    var page = document.getElementById('page');
    var body = document.getElementsByTagName('body')[0];
    var Ospan = navTrigger.getElementsByTagName('span')[0];
    var sideBar = document.getElementById('sideBar');
    var dis = document.getElementById('dis');

    navTrigger.onclick = function(e){
        if (Ospan.getAttribute('aria-hidden') === 'true'){
            page.style.left = '50%';
            body.style.overflow= "hidden";
            body.style.height= "100%";
            Ospan.setAttribute('aria-hidden',false);
            sideBar.style.left = 0;
            dis.style.display='block';
            ModalHelper.afterOpen();
            // navTrigger.setAttribute('class',navTrigger.getAttribute('class') + ' expanded');
            addClass(navTrigger, 'expanded');
        } else {
            Ospan.setAttribute('aria-hidden',true);
            page.style.left = 0;
            body.style.overflow= "auto";
            body.style.height= "auto";
            sideBar.style.left= -50+'%';
            dis.style.display='none';
            // navTrigger.setAttribute('class', 'side-nav-trigger');
            removeClass(navTrigger, 'expanded');
            ModalHelper.beforeClose();
        }
        e.stopPropagation();
        return false;
    };

    document.getElementById('dis').onclick = function(e){
        if (Ospan.getAttribute('aria-hidden') === 'false'){
            Ospan.setAttribute('aria-hidden',true);
            page.style.left = 0;
            body.style.overflow= "auto";
            body.style.height= "auto";
            sideBar.style.left= -50+'%';
            dis.style.display='none';
            // navTrigger.setAttribute('class', 'nav-trigger');
            removeClass(navTrigger, 'expanded');
            ModalHelper.beforeClose();
            e.stopPropagation();
            return false;
        }
    };
}

// 标签云
function setTagsCloud() {
    var radius = 90;
    var d = 200;
    var dtr = Math.PI / 180;
    var mcList = [];
    var lasta = 1;
    var lastb = 1;
    var distr = true;
    var tspeed = 6;
    var size = 200;
    var mouseX = 0;
    var mouseY = 10;
    var howElliptical = 1;
    var aA = null;
    var oDiv = null;

    var oTag=null;
    oDiv=document.getElementById('TagsCloud');
    aA=oDiv.getElementsByTagName('a');
    for(var i=0; i<aA.length; i++) {
        oTag={};
        aA[i].onmouseover = (function (obj) {
            return function () {
                obj.on = true;
                this.style.zIndex = 9999;
                this.style.color = '#fff';
                this.style.padding = '5px 5px';
                this.style.filter = "alpha(opacity=100)";
                this.style.opacity = 1;
                this.style.textDecoration = 'none';
            }
        })(oTag);
        aA[i].onmouseout = (function (obj) {
            return function () {
                obj.on = false;
                this.style.zIndex = obj.zIndex;
                this.style.color = '#fff';
                this.style.padding = '5px';
                this.style.filter = "alpha(opacity=" + 100 * obj.alpha + ")";
                this.style.opacity = obj.alpha;
                this.style.zIndex = obj.zIndex;
            }
        })(oTag);
        oTag.offsetWidth = aA[i].offsetWidth;
        oTag.offsetHeight = aA[i].offsetHeight;
        mcList.push(oTag);
    }
    sineCosine( 0,0,0 );
    positionAll();
    (function () {
        update();
        setTimeout(arguments.callee, 20);
    })();

    function update() {
        var a, b, c = 0;
        a = (Math.min(Math.max(-mouseY, -size), size) / radius) * tspeed;
        b = (-Math.min(Math.max(-mouseX, -size), size) / radius) * tspeed;
        lasta = a;
        lastb = b;
        if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
            return;
        }
        sineCosine(a, b, c);
        for (var i = 0; i < mcList.length; i++) {
            if (mcList[i].on) {
                continue;
            }
            var rx1 = mcList[i].cx;
            var ry1 = mcList[i].cy * ca + mcList[i].cz * (-sa);
            var rz1 = mcList[i].cy * sa + mcList[i].cz * ca;

            var rx2 = rx1 * cb + rz1 * sb;
            var ry2 = ry1;
            var rz2 = rx1 * (-sb) + rz1 * cb;

            var rx3 = rx2 * cc + ry2 * (-sc);
            var ry3 = rx2 * sc + ry2 * cc;
            var rz3 = rz2;

            mcList[i].cx = rx3;
            mcList[i].cy = ry3;
            mcList[i].cz = rz3;

            per = d / (d + rz3);

            mcList[i].x = (howElliptical * rx3 * per) - (howElliptical * 2);
            mcList[i].y = ry3 * per;
            mcList[i].scale = per;
            var alpha = per;
            alpha = (alpha - 0.6) * (10 / 6);
            mcList[i].alpha = alpha * alpha * alpha - 0.2;
            mcList[i].zIndex = Math.ceil(100 - Math.floor(mcList[i].cz));
        }
        doPosition();
    }
    function positionAll() {
        var phi = 0;
        var theta = 0;
        var max = mcList.length;
        for (var i = 0; i < max; i++) {
            if (distr) {
                phi = Math.acos(-1 + (2 * (i + 1) - 1) / max);
                theta = Math.sqrt(max * Math.PI) * phi;
            } else {
                phi = Math.random() * (Math.PI);
                theta = Math.random() * (2 * Math.PI);
            }
            //鍧愭爣鍙樻崲
            mcList[i].cx = radius * Math.cos(theta) * Math.sin(phi);
            mcList[i].cy = radius * Math.sin(theta) * Math.sin(phi);
            mcList[i].cz = radius * Math.cos(phi);

            aA[i].style.left = mcList[i].cx + oDiv.offsetWidth / 2 - mcList[i].offsetWidth / 2 + 'px';
            aA[i].style.top = mcList[i].cy + oDiv.offsetHeight / 2 - mcList[i].offsetHeight / 2 + 'px';
            aA[i].style.backgroundColor = setColor();
        }
    }
    function doPosition() {
        var l = oDiv.offsetWidth / 2;
        var t = oDiv.offsetHeight / 2;
        for (var i = 0; i < mcList.length; i++) {
            if (mcList[i].on) {
                continue;
            }
            var aAs = aA[i].style;
            if (mcList[i].alpha > 0.1) {
                if (aAs.display !== '')
                    aAs.display = '';
            } else {
                if (aAs.display !== 'none')
                    aAs.display = 'none';
                continue;
            }
            aAs.left = mcList[i].cx + l - mcList[i].offsetWidth / 2 + 'px';
            aAs.top = mcList[i].cy + t - mcList[i].offsetHeight / 2 + 'px';
            // aAs.fontSize=Math.ceil(12*mcList[i].scale/2)+8+'px';
            // aAs.filter="progid:DXImageTransform.Microsoft.Alpha(opacity="+100*mcList[i].alpha+")";
            aAs.filter = "alpha(opacity=" + 100 * mcList[i].alpha + ")";
            aAs.zIndex = mcList[i].zIndex;
            aAs.opacity = mcList[i].alpha;
        }
    }
    function setColor(){
        var colorElements = "0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f";
        var colorArray = colorElements.split(",");
        var color ="#";
        for(var i =0;i<6;i++){
            color+=colorArray[Math.floor(Math.random()*16)];
        }
        return color;
    }
    function sineCosine( a, b, c) {
        sa = Math.sin(a * dtr);
        ca = Math.cos(a * dtr);
        sb = Math.sin(b * dtr);
        cb = Math.cos(b * dtr);
        sc = Math.sin(c * dtr);
        cc = Math.cos(c * dtr);
    }
}

addEvent(window, 'load', mobiNav);
addEvent(window, 'load', setHeader);
addEvent(window, 'load', setTagsCloud);
