'use strict';

var cmsApp = angular.module('cms',['ngRoute','cmsControllers','ui.bootstrap','cmsServices','directives']);

cmsApp.config(['$routeProvider', function($routeProvider){
	$routeProvider
		.when('/', 
				{
					templateUrl: 'partials/view/publicInfoManage/notice/noticeSend', 
					controller: 'ViewCtrl'
				})
		.when('/:navId/:leftNavId/:leftNavSubId/', 
				{
					templateUrl: function(params){
										return 'partials/view/'+params.navId+'/'+params.leftNavId+'/'+params.leftNavSubId
								},
					controller: 'ViewCtrl'
				})
		.when('/:navId/:leftNavId/:leftNavSubId/:template', 
				{
					templateUrl: function(params){
									
										return 'partials/templates/'+params.template
									
								},
					controller: 'ViewCtrl'
				})
		.otherwise({redirectTo: '/'});
}]);

