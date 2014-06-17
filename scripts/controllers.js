'use strict';

var appControllers = angular.module("appControllers", []);
var ImagePATH = '/images';
function getObjInArray(arr,s){
	for(var i=0,len=arr.length; i<len; i++){
		if(arr[i].pathID==s)
			return arr[i]
	}
}

appControllers.controller('routeControl',['$scope', '$http','$location', function($scope, $http, $location){
    $http.get('jsonFile/config.json').success(function(data){
        $scope.navPrimary = data;
        var path = $location.$$url.split('/');

        if(path[1]){
        	var obj1 = getObjInArray(data,path[1]);
          $scope.currNavPrm = obj1;
          $scope.currNavPrmIdx = data.indexOf(obj1);
        	$scope.navSecondary = obj1.subset;
        	if(path[2]){
        		var obj2 = getObjInArray(obj1.subset,path[2]);
        		$scope.currNavSed = obj2;
            $scope.currNavSedIdx = (obj1.subset).indexOf(obj2);
        	}else{
        		$scope.currNavSed = obj1.subset[0];
            $scope.currNavSedIdx = 0;
        	}
        }
        else{
        	$scope.currNavPrm = data[0];
       		$scope.navSecondary = data[0].subset;
       		$scope.currNavSed = data[0].subset[0];
        }
    });

    $scope.tgNavPrm = function(curr, idx){
      $scope.currNavPrmIdx = idx;
      $scope.currNavSedIdx = 0;
    	$scope.currNavPrm = curr;
    	$scope.navSecondary = curr.subset;
    }
    $scope.tgNavSed = function(curr, idx){
      $scope.currNavSedIdx = idx;
    }

}])

appControllers.controller('viewControl', ['$scope', function($scope){
    $scope.ImagePATH = ImagePATH;
    prettyPrint();
    $(".dropdown-toggle").dropdown();
    $('.bs-docs-example [href^=#]').click(function(e){
        e.preventDefault()
    });
    $('#myTab a').click(function (e) {
      e.preventDefault();
      $(this).tab('show');
    });

    $('#navbar').scrollspy();

    // add-ons
    $('.add-on :checkbox').on('click', function () {
      var $this = $(this)
        , method = $this.attr('checked') ? 'addClass' : 'removeClass'
      $(this).parents('.add-on')[method]('active')
    })

    // add tipsies to grid for scaffolding
    if ($('#gridSystem').length) {
      $('#gridSystem').tooltip({
          selector: '.show-grid > [class*="span"]'
        , title: function () { return $(this).width() + 'px' }
      })
    }

    // tooltip demo
    $('.tooltip-demo').tooltip({
      selector: "a[data-toggle=tooltip]"
    })

    $('.tooltip-test').tooltip()
    $('.popover-test').popover()

    // popover demo
    $("a[data-toggle=popover]")
      .popover()
      .click(function(e) {
        e.preventDefault()
      })

    // button state demo
    $('#fat-btn')
      .click(function () {
        var btn = $(this)
        btn.button('loading')
        setTimeout(function () {
          btn.button('reset')
        }, 3000)
      })

    // carousel demo
    $('#myCarousel').carousel()


}])