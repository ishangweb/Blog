var oDraggable = document.getElementById('smileyScrollBarDraggable');
var oScrollBar = document.getElementById('smileyScrollBar');
var oContentTable = document.getElementById('smileyContentTable');
var oPanelContent = document.getElementById('smileyPanelContent');
oDraggable.style.height = oScrollBar.offsetHeight * (oScrollBar.offsetHeight / oContentTable.offsetHeight) + 'px';
console.log(oPanelContent.offsetHeight);
console.log(oContentTable.offsetHeight);

function addEvent(obj, sEvent, fn) {
    if(obj.attachEvent) {
        obj.attachEvent('on'+sEvent, fn);
    } else {
        obj.addEventListener(sEvent, fn, false);
    }
}

    
function onMouseWheelTop(ev) {
    var oEvent=ev||event;
    var bDown=true;
    
    bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
    
    if(bDown) {
        setTop(oDraggable.offsetTop+10);
    } else {
        setTop(oDraggable.offsetTop-10);
    }
    
    if(oEvent.preventDefault) {
        oEvent.preventDefault();
    }
    
    return false;
}
    
function onMouseWheelLeft(ev) {
    var oEvent=ev||event;
    var bDown=true;
    
    bDown=oEvent.wheelDelta?oEvent.wheelDelta<0:oEvent.detail>0;
    
    if(bDown) {
        setLeft(oDraggable.offsetWidth+10);
    } else {
        setLeft(oDraggable.offsetWidth-10);
    }
    
    if(oEvent.preventDefault) {
        oEvent.preventDefault();
    }
    
    return false;
}

addEvent(oScrollBar, 'mousewheel', onMouseWheelTop);
addEvent(oScrollBar, 'DOMMouseScroll', onMouseWheelTop);
addEvent(oPanelContent, 'mousewheel', onMouseWheelTop);
addEvent(oPanelContent, 'DOMMouseScroll', onMouseWheelTop);

oDraggable.onmousedown = function (ev)
{
    var oEvent = ev || event;
    var disX=oEvent.clientX-oDraggable.offsetLeft;
    var disY=oEvent.clientY-oDraggable.offsetTop;
    
    document.onmousemove = function (ev)
    {
        var oEvent = ev || event;
        var left = oEvent.clientX-disX;
        var top = oEvent.clientY-disY;
        setTop(top);
    }; 
    
    document.onmouseup = function ()
    {
        document.onmousemove = null;
        document.onmouseup = null;
    }; 

    if (oEvent.preventDefault) {
        oEvent.preventDefault();
    };
    return false;
};


function setLeft(left) {
    if(left < 0) {
        left = 0;
    } else if(left > oScrollBar.offsetWidth-oDraggable.offsetWidth) {
        left = oScrollBar.offsetWidth-oDraggable.offsetWidth;
    }

    var scale = left/(oScrollBar.offsetWidth-oDraggable.offsetWidth);
    oDraggable.style.left = left+'px';
    oContentTable.style.left = -(oContentTable.offsetWidth - oPanelContent.offsetWidth ) * scale + 'px';
    document.title = scale;
}

function setTop(top) {
    if(top < 0) {
        top = 0;
    } else if(top > oScrollBar.offsetHeight-oDraggable.offsetHeight) {
        top = oScrollBar.offsetHeight-oDraggable.offsetHeight;
    }
    var scale = top/(oScrollBar.offsetHeight-oDraggable.offsetHeight);
    oDraggable.style.top = top+'px';
    oContentTable.style.top = -(oContentTable.offsetHeight - oPanelContent.offsetHeight ) * scale + 'px';


    
    // console.log((oContentTable.offsetHeight - oPanelContent.offsetHeight ) * scale);
    // oPanelContent.scrollTop = (oContentTable.offsetHeight - oPanelContent.offsetHeight );





    document.title = scale;
}