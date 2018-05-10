function Vblog(a) {
    this.elements = [];
    switch (typeof a) {
        case 'function':
            this.bind(window, 'load', a);
            break;
        case 'string':
            switch ( a.charAt(0) ) {
                case '#':
                    var obj = document.getElementById(a.substring(1));
                    this.elements.push(obj);
                    break;
                case '.':
                    this.elements = this.getClass(document, a.substring(1));
                    break;
                default:
                    this.elements = document.getElementsByTagName(a);
            }
            break;
        case 'object':
            this.elements.push(a);
    }
}
Vblog.prototype.bind = function (o, ev, fn) {
    if(o.addEventListener) {
        o.addEventListener(ev, function (ev) {
            if(false == fn.call(o)) {
                ev.cancelBubble=true;
                ev.preventDefault();
            }
        }, false);
    } else if(o.attachEvent) {
        o.attachEvent('on' + ev, function () {
            if(false == fn.call(o)) {
                event.cancelBubble=true;
                return false;
            }
        });
    } else {
        o['on' + ev] = fn;
    }
};
Vblog.prototype.getClass = function (oParent, sClass) {
    var aEle=oParent.getElementsByTagName('*');
    var aResult=[];
    for(var i=0; i<aEle.length; i++) {
        if(aEle[i].className === sClass) {
            aResult.push(aEle[i]);
        }
    }
    return aResult;
};
Vblog.prototype.getStyle = function (o, a) {
    if(o.currentStyle) {
        return o.currentStyle[a];
    } else {
        return getComputedStyle(o, false)[a];
    }
};
Vblog.prototype.click = function (fn) {
    for (var i = 0; i<this.elements.length; i++) {
        this.bind(this.elements[i], 'click', fn);
    }
};
Vblog.prototype.show = function () {
    for (var i = 0; i<this.elements.length; i++) {
        this.elements[i].style.display = 'block';
    }
};
Vblog.prototype.hide = function () {
    for (var i = 0; i<this.elements.length; i++) {
        this.elements[i].style.display = 'none';
    }
};
Vblog.prototype.hover = function (im, sh) {
    for (var i = 0; i<this.elements.length; i++) {
        this.bind(this.elements[i], 'mouseover', im);
        this.bind(this.elements[i], 'mouseout', sh);
    }
};
Vblog.prototype.css = function (a, v) {
    if(arguments.length === 2) {
        for(i = 0; i<this.elements.length; i++) {
            this.elements[i].style[a] = v;
        }
    } else {
        if(typeof a === 'string') {
            return this.getStyle(this.elements[0], v);
        } else {
            for(i = 0; i<this.elements.length; i++) {
                var k = '';
                for(k in a) {
                    this.elements[i].style[ k ] = a[ k ];
                }
            }
        }
    }
};

function $(vArg) {
    return new Vblog(vArg);
}
