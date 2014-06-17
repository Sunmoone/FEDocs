var cmsServices = angular.module('cmsServices', ['ngResource']);

/*cmsServices.provider('Navigators',function(){
	var data = [
                        {},
                        {}
                  ];

      this.$get = function(){
      	return data
      }

});*/


cmsServices.service('pageInfo',function(){
  var alerts = [1,2,3];
  return {
    getAlerts: function(val){
      return alerts;
    },
    rmAlerts: function(index){
      index = index || 0 ; 
      alerts.splice(index, 1);
    }
  }
});

cmsServices.service('viewData', function(){
      var data = [];
       return {
          get_data : function(){
            return data;
          },
          set_data : function(val){
            data = val;
          },
          update_data : function(pos,val){
            data.splice(pos,1,val);
          },
          add_data : function(val){
            data.unshift(val);
          }
      }
});
