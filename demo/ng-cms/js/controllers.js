'use strict';

var cmsControllers = angular.module('cmsControllers', ['cmsServices']);


cmsControllers.controller('WelcomeCtrl', function($scope) {

});

cmsControllers.controller('ViewCtrl', function($scope, viewData, $http, $routeParams, $location) {
        // serialize hashmap 
        $scope.itemSequence={
            keys:[],
            vals:[]
        };
        var datapath='jsonFiles/players.json';
      
        $scope.toggleView = function(leftNavSub, idx) {
            $scope.activeNum_3 = idx;
            if(leftNavSub.datapath){
                
            }
        }
        $http.get(datapath).success(function(data) {
            $scope.items = data;
            viewData.set_data(data);
            var firstItem = $scope.items.shift();
            angular.forEach(firstItem, function(value,key){
                $scope.itemSequence.keys.push(key);
                $scope.itemSequence.vals.push(value);
            })
        });
        console.log($routeParams)

});

cmsControllers.controller('NavCtrl', function($scope, $http,$location,$routeParams) {
    // $scope.navs = Navigators;

    $http.get('jsonFiles/config.json').success(function(data) {
        $scope.navs = data;
        $scope.leftNavs = $scope.navs[0].child;
        $scope.leftNavSubs = $scope.navs[0].child[0].child;

        $scope.currNavId = $scope.navs[0].id; // 初始Nav为第一项
        $scope.currLeftNavId = $scope.navs[0].child[0].id; // 初始leftNav为第一项
        $scope.currLeftNavSubId = $scope.navs[0].child[0].child[0].id; // 初始leftNavSub为第一项
    });
    $scope.activeNum_1 = 0;
    $scope.activeNum_2 = 0;
    $scope.activeNum_3 = 0;

    $scope.toggleLeft = function(nav, idx) {
        $scope.leftNavs = nav.child;
        $scope.leftNavSubs = nav.child[0].child;

        $scope.currNavId = nav.id;
        $scope.currLeftNavId = nav.child[0].id;
        $scope.currLeftNavSubId = nav.child[0].child[0].id;

        $scope.activeNum_1 = idx;
        $scope.activeNum_2 = 0;
        $scope.activeNum_3 = 0;
    };
    $scope.toggleLeftSub = function(leftNav, idx) {
        $scope.leftNavSubs = leftNav.child;

        $scope.currLeftNavId = leftNav.id;
        $scope.currLeftNavSubId = leftNav.child[0].id;

        $scope.activeNum_2 = idx;
        $scope.activeNum_3 = 0;
    };

});


/*function toggleView($routeParams){

        console.log($routeParams);
}
*/
cmsControllers.controller('AlertsCtrl', function($scope, sharedProperties) {

    $scope.alerts = sharedProperties.getAlerts();

});

cmsControllers.controller('myGridCtrl', ['$scope','$modal','$log',
    function($scope, $modal, $log) {

        $scope.mySelections = [];
        $scope.search={};
        $scope.itemSelect = function(idx) {
            var flag = $scope.mySelections.indexOf($scope.items[idx]);
            if (flag != -1) {
                $scope.mySelections.splice(flag, 1)
            } else {
                $scope.mySelections.push($scope.items[idx])
            }
        }
        $scope.allSelect = function() {
            if ($scope.mySelections.length === $scope.items.length) {
                $scope.mySelections = [];
                $scope.selectedFlag = false
            } else {
                $scope.mySelections = [];
                for (var i = 0, l = $scope.items.length; i < l; i++) {
                    $scope.mySelections.push($scope.items[i])
                    $scope.selectedFlag = true
                }
            }
        }

        $scope.deleteSelected = function() {
            angular.forEach($scope.mySelections, function(rowItem) {
                $scope.items.splice($scope.items.indexOf(rowItem), 1);
            });
            $scope.mySelections = [];
        };
        $scope.callModal = function(val) {
            var modalInstance = $modal.open({
                templateUrl: 'myModalContent.html',
                controller: 'ModalInstanceCtrl',
                resolve: {
                    items: function() {
                        return val
                    }
                }
            });

            modalInstance.result.then(function() {
                 $scope.mySelections = [];
                $log.info('Modal ok at: ' + new Date());
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        $scope.modify = function() {
            angular.forEach($scope.mySelections, function(rowItem) {
                $scope.callModal({
                    type: 2,
                    title: "修改",
                    itemSequence: $scope.itemSequence,
                    itemIndex: $scope.items.indexOf(rowItem)
                })
            })
        };

        $scope.add = function() {
            $scope.callModal({
                type: 1,
                title: "新增",
                itemSequence: $scope.itemSequence
            })
        };

        $scope.switchOn = function() {
            angular.forEach($scope.mySelections, function(rowItem) {
                $scope.items[$scope.items.indexOf(rowItem)].status = true;
            });
             $scope.mySelections = [];
        };

        $scope.switchOff = function() {
            angular.forEach($scope.mySelections, function(rowItem) {
                $scope.items[$scope.items.indexOf(rowItem)].status = false;
            });
             $scope.mySelections = [];
        };

    }
]);

cmsControllers.controller('ModalInstanceCtrl', function($scope, $modalInstance, items, viewData) {
    $scope.ModalTitle = items.title;
    $scope.itemSequence = items.itemSequence;
    $scope.editItem = viewData.get_data()[items.itemIndex] || {};
    $scope.models = items.itemSequence.keys;

    console.log(viewData.get_data());
    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };

    $scope.excAdd = function() {
        viewData.add_data($scope.editItem);
        $modalInstance.close();
    };

    $scope.excModify = function() {
        $modalInstance.close();
    };

    switch (items.type) {
        case 1:
            $scope.ok = $scope.excAdd;
            break;
        case 2:
            $scope.ok = $scope.excModify;
            break;
    };

});

cmsControllers.controller('tabCtrl', ['$scope',
    function($scope) {

    }
]);