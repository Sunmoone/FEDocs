$(document).ready(function(){
			$(".prev-course").click(function(){
				$(this).siblings(".course-list-container").find(".course-list").animate({marginLeft:"-=42"},500)
			});
			$(".next-course").click(function(){
				$(this).siblings(".course-list-container").find(".course-list").animate({marginLeft:"+=42"},500)
			});
			$(".rank").each(function(){
				$(this).find("tbody tr").each(function(index){
					var bpy = -index*25+"px";
					if(index>7){bpy = -8*25+"px"}
					$(this).find("td:first-child").css("backgroundPositionY",bpy);
				})
			})
		})