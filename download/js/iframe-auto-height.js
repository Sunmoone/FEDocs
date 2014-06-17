var iframes = document.getElementsByTagName("iframe");
var agt =   window.navigator.userAgent.toLowerCase(),
isIE = agt.indexOf("msie") != -1,
isGecko = agt.indexOf("gecko") != -1,
ieVer = isIE ? parseInt(agt.split(";")[1].match(/\d+/)) : 0;

for(var i = 0, len = iframes.length; i<len; i++){
	var fixHeight = function(_i){
	return function(){ 
			var doc = window.frames[_i].document;
			iframes[_i].height = Math.max(doc.documentElement.scrollHeight, doc.body.scrollHeight);
			 }
	}(i);
	if(isIE&&(ieVer<11)){
		window.frames[i].attachEvent("onload",fixHeight);
	}else{
		window.frames[i].addEventListener("DOMContentLoaded", fixHeight);
	}
}