angular.module('phonecatFilters',[]).filter('statusmark', function(){
	return function(input){
		return input ? '\u2713' : '\u2718'
	}
})
