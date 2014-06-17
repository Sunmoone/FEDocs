var directives = angular.module('directives', []);
/* 
directives.directive('datepicker', function() {
   return function(scope, element, attrs) {
       element.datepicker({
           inline: true,
           dateFormat: 'dd.mm.yy',
           onSelect: function(dateText) {
               var modelPath = $(this).attr('ng-model');
               putObject(modelPath, scope, dateText);
               scope.$apply();
           }
       });
   }
});*/

directives.service("myTemplates",function(){
  return {
    tab:  ['<div class="tabbable">',
              '<ul class="nav nav-tabs">',
                '<li ng-repeat="pane in panes" ng-class="{active:pane.selected}">',
                  '<a href="" ng-click="select(pane)">{{pane.title}}</a>',
                '</li>',
              '</ul>',
              '<div class="tab-content" ng-transclude></div>',
            '</div>'].join(""),
    pane: '<div class="tab-pane" ng-transclude ng-class="{active: selected}"></div>',

    collapsegroup: '<ul class="list-group" ng-transclude></ul>',
    collapse: ['<li class="list-group-item">',
          '<a href="" class="collapse-header" ng-click="toggle=!toggle">{{title}}</a>', 
          '<div class="collapse-cont" ng-show="toggle" ng-transclude></div>',
          '</li>'].join(""),

    navgroup: '<ul class="nav nav-pills" ng-transclude></ul>',
          nav: ['<li ng-class="{active:selected}" ng-mouseenter="select()" ng-mouseleave="select()">',
                '<a href="{{href}}">{{title}}</a>',
                 '<ul class="dropdown-menu" ng-show="selected" ng-transclude></ul>', 
              '</li>'].join(""), 
  }
});


directives.directive('tab',function(myTemplates){
  return {
    restrict: 'E',
    template: myTemplates.tab,
    scope: {},
    controller: function($scope,$element){
      var panes = $scope.panes = [];
      $scope.select = function(pane) {
        angular.forEach(panes, function(pane){
          pane.selected = false
        });
        pane.selected = true
      };
      this.addPane = function(pane){
        if(panes.length == 0) $scope.select(pane);
        panes.push(pane)
      }
    },
    transclude: true,
    replace: true
  }
});

directives.directive('pane',function(myTemplates){
  return {
    restrict: 'E',
    require: '^tab',
    scope:{ title: '@'},
    template: myTemplates.pane,
    link: function(scope, element, attrs, ctrl){
      ctrl.addPane(scope)
    },
    transclude: true,
    replace: true
  }
});


directives.directive('collapsegroup', function(myTemplates){
  return {
    restrict: 'E',
    template: myTemplates.collapsegroup,
    transclude: true,
    replace: true
  }
});

directives.directive('collapse', function(myTemplates){
  return {
    restrict: 'E',
    require: '^collapsegroup',
    scope:{title: '@'},
    template: myTemplates.collapse,
    transclude: true,
    replace: true
  }
});

directives.directive('navgroup',function(myTemplates){
  return {
    restrict: 'E',
    template: myTemplates.navgroup,
    scope: {},
    controller: function($scope,$element){
      var navs = $scope.navs = [];
      this.select = function(nav){
        var t = nav.selected;
        angular.forEach(navs,function(nav){
          nav.selected = false
        });
        nav.selected = !t 
      } 
      this.addNav = function(nav){
        navs.push(nav)
      }
    },
    transclude: true,
    replace: true
  }
  
});

directives.directive('nav',function(myTemplates){
  return {
    restrict: 'E',
    require: '^navgroup',
    scope: {title: '@', href:'@'},
    template: myTemplates.nav,
    link:function(scope,element,attrs,ctrl){
      scope.select = function(){ctrl.select(scope)};
      ctrl.addNav(scope)
    },
    transclude: true,
    replace: true
  }
});