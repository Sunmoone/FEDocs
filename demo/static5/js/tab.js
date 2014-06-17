(function($){
	$.fn.tabable = function(){
		var _this = this;
		var len = $(_this).find(".tabCtrl li").length;
		for(var i = 1;i<=len;i++){
			$(_this).find(".tabCtrl"+i).on("mouseenter", (function(n){
					return function(){
							$(_this).find(".tabCtrl_active").removeClass("tabCtrl_active");
							$(_this).find(".tabCont").hide();
							$(this).addClass("tabCtrl_active");
							$(_this).find(".tabCont"+n).show();
						}
				})(i))
		}
		$(_this).find(".tabCtrl1").trigger("mouseenter");
	}
})(jQuery)