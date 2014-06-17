Object.prototype.miniScroll= function() {
    var ch = this.clientHeight,
        sh = this.scrollHeight,
        _this = this;
    // 内容高度不超出，无需滚动条的情况
    if (sh &lt;= ch) return;
    var sObit = document.createElement("div"),
        sBar = document.createElement("div"),
        sCont = document.createElement("div"),
        sBox = _this.cloneNode(false); //克隆外壳及属性
    sBox.appendChild(sCont);
    sBox.appendChild(sObit);
    _this.parentNode.replaceChild(sBox, _this);
    sObit.appendChild(sBar);
    sCont.innerHTML = _this.innerHTML; //将内容装入sCont
    sCont.style.cssText = ";padding-right:10px;height:100%;position:relative;top:0";
    sObit.style.cssText = ";position:absolute;width:10px;height:100%;right:0;top:0;background:#ccc;";
    // sBar高度与滚动区域高度的映射，最低不小于10
    var sBarH = ch*ch/sh&lt;10 ? 10 : ch*ch/sh;
    sBar.style.cssText = ";position:absolute;width:100%;top:0;background:#444;border-bottom:1px solid #444;"+ ";height:" + sBarH + "px";

    // 拖拽sBar,只允许竖直方向,拖拽范围[0，ch-sBarH]
    miniDrag.init(sBar, 0, ch - sBarH);
    // 初始化miniDrag.init()中申明sBar.onDragging，在miniDrag.dragging()中被调用
    sBar.onDragging = function(bst) {
        // sObit中可滚动高度／sCont可滚动高度 ＝ sBar.top/sCont.style.top , 等比映射
        sCont.style.top = -bst * (sh - ch) / (ch - sBarH) + "px";
    }
    sBox.onmousewheel = function() {
        var cst = parseInt(sCont.style.top) + event.wheelDelta;
        // sCont.style.top的取值范围[-sh+ch, 0]
        if (cst &lt; -sh+ch) cst = -sh+ch;
        if (cst &gt; 0) cst = 0;
        var bst = -cst * (ch - sBarH) / (sh - ch);
        sCont.style.top = cst + "px";
        sBar.style.top = bst + "px";
    }
};

//竖直方向的滚动,给定滚动区间
var miniDrag = {
 "hand": null,
 "init": function(handler,sMin,sMax) {
   dragBody=handler;
   //给Arguments[0](DOM元素)绑定事件，创建新的函数实例
   handler.onmousedown = miniDrag.start;
   //DOM元素绑定一个属性，值为另一个DOM元素
   handler.root = dragBody;
   //初始化dragBody的top,需设置position
   if (isNaN(parseInt(dragBody.style.top))) dragBody.style.top = "0px";
   handler.onDragging = new Function();
   handler.sMin = sMin;
   handler.sMax = sMax;
  },
 "start": function(e) {
   e = miniDrag.fixEvent(e);
   var handler = miniDrag.hand = this;
   handler.intmouseY = e.pageY;
   handler.Y = parseInt(handler.root.style.top);
   document.onmousemove = miniDrag.dragging;
   document.onmouseup = miniDrag.end;
   return false; //重要，避免事件冲突
  },
 "dragging": function(e) {
   var handler = miniDrag.hand;
   e = miniDrag.fixEvent(e);
   if (document.all) {
   handler.setCapture();
   } else {
   e.preventDefault();
   }
   var st = handler.Y + e.pageY - handler.intmouseY;
   if(st=handler.sMax) st=handler.sMax;
   handler.root.style.top = st + "px";
   handler.onDragging(st);
   return false;
  },
 "end": function() {
   if (document.all) {
   miniDrag.hand.releaseCapture()
   };
   document.onmousemove = null;
   document.onmouseup = null;
   miniDrag.hand = null;
  },
 "fixEvent": function(e) {
   var st = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
   if (typeof e == "undefined") e = window.event;
   if (typeof e.pageY == "undefined") e.pageY=e.clientY+st+document.body.clientTop;
   if (typeof e.layerY == "undefined") e.layerY = e.offsetY;
   return e;
  }
}