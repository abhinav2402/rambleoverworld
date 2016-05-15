
'use strict';

/* App Module */

var PackagaeInfoApp = angular.module('PackageInfo', ['ngRoute', 'ngAnimate', 'ui.bootstrap', 'PackageInfoControllers',
    'PackageInfoService', 'PackageInfoDirective', 'PackageInfoFilter']);


PackagaeInfoApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
                when('/', {
                  
                    templateUrl:'app/template/site/home.html',
                    controller: 'PackageHomeCtrl'
                }).
            when('/package', {
                templateUrl: 'app/template/site/Package.html',
                controller: 'PackagehDetailsCtrl'
            }).
             when('/search/:location', {
                 templateUrl: 'app/template/site/SearchDetails.html',
                 controller: 'SearchDetailsCtrl'
             }).
                otherwise({
                    redirectTo: '/'
                });
    }]);
