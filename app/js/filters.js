'use strict';

/* Filters */
var AppFilter = angular.module('PackageInfoFilter', []);

AppFilter.filter('rangeFilter', function () {
    return function (items, rangeInfo) {
        var filtered = [];
        var min = parseInt(rangeInfo.userMin);
        var max = parseInt(rangeInfo.userMax);
        angular.forEach(items, function (item) {
            if (item.time >= min && item.time <= max) {
                filtered.push(item);
            }
        });
        return filtered;
    };
});

