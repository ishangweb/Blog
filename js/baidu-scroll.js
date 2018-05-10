_.Module.define({
    path: "common/widget/ScrollPanel",
    sub: {
        dom: null,
        $content: null,
        $scrollBar: null,
        $scrollButton: null,
        _hasScroll: !1,
        _scrollStep: 50,
        _scrollTop: 0,
        _maxHeight: 0,
        initial: function(t) {
            this._buildUI(t),
            this._bindEvents(t),
            $(t.container).append(this.dom),
            this.setHeight(t.height || 100),
            t.content && this.setContent(t.content),
            t.scrollBarShow && this.bind("onScrollBarShow", t.scrollBarShow),
            t.scrollBarHide && this.bind("onScrollBarHide", t.scrollBarHide)
        },
        _buildUI: function(t) {
            this.dom = $('<div class="tbui_scroll_panel"></div>'),
            this.dom.html(['<div class="tbui_panel_content j_panel_content clearfix"><ul></ul></div>', '<div class="tbui_scroll_bar j_scroll_bar">', '<div class="tbui_scroll_button j_scroll_button">&nbsp;</div>', "</div>"].join("")),
            this.$content = this.dom.find(".j_panel_content:first"),
            this.$scrollBar = this.dom.find(".j_scroll_bar:first"),
            this.$scrollButton = this.dom.find(".j_scroll_button:first"),
            t.padding && this.$content.css("padding", t.padding)
        },
        _bindEvents: function() {
            var t = this,
            o = t.$content.get(0);
            this.$scrollButton.on("drag",
            function(i, l) {
                if (l) {
                    var s = l.position;
                    o.scrollTop = s.top / t.$content.height() * o.scrollHeight
                }
            }),
            this.$content.mousewheel(function(o, i) {
                o.preventDefault(),
                o.stopPropagation(),
                t._hasScroll && t.scrollTopTo(t._scrollTop - i * t._scrollStep)
            })
        },
        scrollTopTo: function(t) {
            var o = this,
            i = o.$content.get(0),
            t = Math.max(Math.min(t, i.scrollHeight - o.$content.height()), 0);
            t != o._scrollTop && (o._scrollTop = t, o.$content.stop(), o.$content.scrollTop(o._scrollTop), o._resizeScroll())
        },
        setHeight: function(t) {
            this._maxHeight = t,
            this._resizeHeight(),
            this._resizeScroll(),
            this.$scrollButton.draggable({
                containment: "parent"
            })
        },
        setContent: function(t) {
            this.$content.html(t),
            this.$content.get(0).scrollTop = this._scrollTop = 0,
            this._resizeHeight(),
            this._resizeScroll()
        },
        appendContent: function(t) {
            this.$content.append(t),
            this._resizeHeight(),
            this.scrollTopTo(2e4)
        },
        clearContent: function() {
            this.setContent("")
        },
        _resizeHeight: function() {
            this.$content.css("height", "");
            var t = this.$content.get(0),
            o = t.scrollHeight,
            i = Math.min(o, this._maxHeight);
            this.$content.css("height", i)
        },
        _resizeScroll: function() {
            var t = this.$content.get(0),
            o = t.scrollHeight,
            i = t.scrollTop,
            l = this.$content.innerHeight();
            l >= o ? (this.$scrollBar.hide(), this.dom.addClass("tbui_no_scroll_bar"), this.trigger("onScrollBarHide"), this._hasScroll = !1) : (this.$scrollBar.show(), this.$scrollBar.height(l), this.$scrollButton.height(l / o * l), this.$scrollButton.css("top", i / o * l), this.trigger("onScrollBarShow"), this._hasScroll = !0)
        }
    }
});