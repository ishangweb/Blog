function SmileyScroll(obj) {
	this.element = obj;
	this.initial();
}

function addEvent(obj, sEvent, callback) {
    if(obj.attachEvent) {
        obj.attachEvent('on'+sEvent, callback);
    } else {
        obj.addEventListener(sEvent, callback, false);
    }
}

SmileyScroll.prototype = {
    initial: function() {
        this.scrollPanel   = document.createElement("div");
        this.scrollContent = document.createElement("div");
        this.scrollBar     = document.createElement("div");
        this.oDraggable    = document.createElement("div");
        this.cTable    = document.createElement("div");
        this.buildUI();
        this.barHeight = 277;

        this.scrollBar.style.height =  this.barHeight + 'px';

        this.cTableHeight = this.cTable.offsetHeight;
        this.oDraggableHeight  = this.barHeight * (this.barHeight / this.cTableHeight);
        this.oDraggable.style.height = this.oDraggableHeight + 'px';
        this.scrollBar.style.display = this.cTableHeight > this.element.offsetHeight ? 'block' : 'none';
        this.scrollContent.style.height = 277 + 'px';

        this.bindEvents(this);

        addEvent(oScrollBar, 'mousewheel', onMouseWheelTop);
        addEvent(oScrollBar, 'DOMMouseScroll', onMouseWheelTop);
        addEvent(oPanelContent, 'mousewheel', onMouseWheelTop);
        addEvent(oPanelContent, 'DOMMouseScroll', onMouseWheelTop);

    },
    buildUI: function(self) {
        this.scrollPanel.className = "smiley-scroll-panel";
        this.scrollContent.className = "smiley-panel-content";
        this.scrollBar.className = "smiley-scroll-bar";
        this.oDraggable.className = "smiley-scroll-draggable";

        this.cTable.innerHTML = this.element.innerHTML;
        this.element.innerHTML = "";

        this.element.appendChild(this.scrollPanel);

        this.scrollPanel.appendChild(this.scrollContent);

        this.scrollContent.appendChild(this.cTable);


        this.scrollPanel.appendChild(this.scrollBar);
        this.scrollBar.appendChild(this.oDraggable);
    },
    bindEvents: function(self) {
        self.oDraggable.onmousedown = function (ev) {
            var oEvent = ev || event;
            var disX=oEvent.clientX-self.oDraggable.offsetLeft;
            var disY=oEvent.clientY-self.oDraggable.offsetTop;

            document.onmousemove = function (ev)
            {
                var oEvent = ev || event;
                var top = oEvent.clientY-disY;
                self.scrollTopTo(self,top);
            };

            document.onmouseup = function ()
            {
                document.onmousemove = null;
                document.onmouseup = null;
            };

            if (oEvent.preventDefault) {
                oEvent.preventDefault();
            }
            oEvent.stopPropagation();
            return false;
        };
    },
    scrollTopTo: function(self ,top) {
        if(top < 0) {
            top = 0;
        } else if(top > self.barHeight-self.oDraggableHeight) {
            top = self.barHeight-self.oDraggableHeight;
        }
        var scale = top/(self.barHeight-self.oDraggableHeight);
        self.oDraggable.style.top = top+'px';
        console.log((self.cTable.offsetHeight - self.scrollPanel.offsetHeight ) * scale);
        self.scrollContent.scrollTop = (self.cTable.offsetHeight - self.scrollContent.offsetHeight ) * scale;

        document.title = scale;
    },
    setHeight: function() {

    },
    setContent: function() {

    },
    appendContent: function() {

    },
    clearContent: function() {

    },
    resizeHeight: function() {

    },
    resizeScroll: function() {

    }
};
var obj = document.getElementById('smileyScrollContent');
var scroll = new SmileyScroll(obj);
