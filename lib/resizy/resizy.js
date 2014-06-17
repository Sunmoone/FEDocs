var Rsz = function(){
		this.obj = null;
		this.preventX = false;
		this.preventY = false;
		this.scopeX = [];
		this.scopeY = [];
		/****************/
	}
Rsz.prototype.init=function(){
	var _this = this,
		dragHandle = document.createElement("div");
	dragHandle.style.cssText=";position:absolute;right:0;bottom:0;width:16px;height:16px;background:url(images/icons.png) -64px -224px no-repeat;";
	if(this.preventX){
		dragHandle.style.cursor="n-resize";
	}else if(this.preventY){
		dragHandle.style.cursor="w-resize";
	}else{
		dragHandle.style.cursor="nw-resize";
	}
	_this.obj.appendChild(dragHandle);
	dragHandle.onmousedown= function(e){return _this.dragStart(e)};
}
Rsz.prototype.dragStart = function(e){
	var _this = this;
	this.startX = event.clientX;
	this.startY = event.clientY;
	this.Width = this.obj.offsetWidth;
	this.Height = this.obj.offsetHeight;
	document.onmousemove= function(e){return _this.drag(e)};
	document.onmouseup= function(){return _this.dragEnd()};
	return false;
}
Rsz.prototype.drag = function(e){
	var W = this.Width + event.clientX - this.startX,
	    H = this.Height + event.clientY - this.startY,
	    obj = this.obj;
	if(this.scopeX[0] != undefined) {
		W = Math.max(this.scopeX[0],W)
	}
	if(this.scopeX[1] != undefined) {
		W = Math.min(this.scopeX[1],W)
	}
	if(this.scopeY[0] != undefined) {
		H = Math.max(this.scopeY[0],H)
	}
	if(this.scopeY[1] != undefined) {
		H = Math.min(this.scopeY[1],H)
	}		
	if(this.preventX == false)obj.style.width = W+"px";
	if(this.preventY == false)obj.style.height = H+"px";
	return false;
}
Rsz.prototype.dragEnd =function(){
	document.onmousemove = null;
	document.onmousup = null;
}