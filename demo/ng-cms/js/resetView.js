function resetView(){
		var pageWidth = window.innerWidth,
	    	pageHeight = window.innerHeight;
	    if (typeof pageWidth != "number") {
		    if (document.compatMode == "CSS1Compat") {
		        pageWidth = document.documentElement.clientWidth;
		        pageHeight = document.documentElement.clientHeight;
		    } else {
		        pageWidth = document.body.clientWidth;
		        pageHeight = document.body.clientHeight;
		    }
		}
		document.getElementById("view").style.height=pageHeight-115+"px";
		document.getElementById("view").style.width=pageWidth-183+"px";
		
	}
window.onresize = resetView;
window.onload = resetView;


