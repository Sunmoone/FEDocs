'use strict';

var app = angular.module('app',['ngRoute','appControllers','directives']);

app.config(['$routeProvider',function($routeProvider){
	$routeProvider
		.when('/',
				{
					templateUrl:"partials/..readme"
				})
		.when('/:navPrimary/:navSecondary', 
				{
					templateUrl: function(params){
										return 'partials/'+params.navPrimary+'/'+params.navSecondary
								},
					controller: 'viewControl'
				})
		.when('/:navPrimary/:navSecondary/:navThird', 
				{
					templateUrl: function(params){
										return 'partials/'+params.navPrimary+'/'+params.navSecondary+'/'+params.navThird+'/'
								},
					controller: 'viewControl'
				})
		.otherwise({redirectTo: '/'});
}]);

