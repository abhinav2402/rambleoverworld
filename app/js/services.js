'use strict';

/* Services */

var App = angular.module('PackageInfoService', []);
App.factory('RecentSearchData', ['$window', function ($window) {
    return{
        setObject:function(key,value)
        {
            $window.localStorage[key] = angular.toJson(value);;
        },
        getObject:function(key)
        {
            return angular.fromJson($window.localStorage[key]);
        }
    }
}]);


