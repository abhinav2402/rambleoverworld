'use strict';


var AppControllers = angular.module('PackageInfoControllers', []);

AppControllers.controller('ROWHomeCtrl', ['$scope', '$rootScope', '$location','$http', function ($scope, $rootScope, $location, $http) {
  
    $http.get('/db/domastic.json').success(function (data) {
        $rootScope.header = data.header;
        var slides = $scope.slides = data.Slides;
        $scope.myinterval = 2000;
        $scope.nowrapslides = false;
        $rootScope.review = data.Review;
        $rootScope.Origions = data.Origions;
        $rootScope.destinations = data.destinations;
        $rootScope.TravellerMonths = data.TravellerMonths;
        $scope.DashbordDoasticPackage = data.DashbordDoasticPackage;
        $scope.DashbordInternationalPackage = data.DashbordInternationalPackage;
        
    });
    $scope.search = function () {
        $location.path('/search');
    }
   
}
]);


AppControllers.controller('PackageHomeCtrl', ['$scope', '$location', '$http','RecentSearchData', function ($scope, $location,$http, RecentSearchData)
{
    $http.get('/db/Filter.json').success(function (data)
    {
        $scope.DomasticPackage = data.DomasticPackage;
        $scope.InternationalPackage = data.InternationalPackage;
        $scope.Duration = data.Duration;
        $scope.Budget = data.Budget;
        $scope.Price = data.Price;
    });
    
    $scope.search = function ( str) {
        RecentSearchData.setObject('recentsearch', { 'location': $scope.location });
        $location.path('/search/' + $scope.location);
    }
}
]);

AppControllers.controller('SearchDetailsCtrl', ['$scope', '$routeParams', '$http', '$uibModal', '$location', '$filter', function ($scope, $routeParams, $http, $uibModal, $location, $filter) {

    $scope.searchFilter = {};
    $scope.sliderConfig = {};
    $http.get('/db/Filter.json').success(function (data) {
        $scope.DomasticPackage = data.DomasticPackage;
        $scope.InternationalPackage = data.InternationalPackage;
        $scope.Duration = data.Duration;
        $scope.Budget = data.Budget;
        $scope.Price = data.Price;
        $scope.packageinfo = data.Package;
    });
    $http.get('/db/Package.json').success(function (data) {
        $scope.packageinfo = data.Package;
    });
    $scope.search = function (str) {
        RecentSearchData.setObject('recentsearch', { 'location': $scope.location });
        $location.path('/search/' + $scope.location);
    }
    $scope.enquiry = function (str) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'MyPackageDetails.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function () {
                    return str;
                }
            }
        });
    }

    $scope.searchOrigin=function(str)
    {
      $scope.searchFilter.To = str;
    }
    $scope.LoadDataFromDiscount = function (data) {
        var data = $filter('filter')($scope.Duration, { Value: true })
        angular.forEach(data, function (data, index) {
            alert(data.Value.Min);
        });
    }
    $scope.Sort = {
        sortBy: '1',
        SortOptions: [
          { id: '1', name: 'Sort By Price' },
          { id: '2', name: 'Sort By Discount' }
        ],
    };
    

    $scope.open = true;
    $scope.open2 = true;
    $scope.open3 = true;
    $scope.open4 = true;
    $scope.open5 = true;
   
}
]);

AppControllers.controller('PackagehDetailsCtrl', ['$scope', '$routeParams', '$http', '$uibModal', '$log', function ($scope, $routeParams, $http, $uibModal, $log) {
 
    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'myModalContent.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });
    }
    $scope.ok = function () {
        modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        modalInstance.dismiss('cancel');
    };

    

   
}
]);
AppControllers.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, $log, items) {

    $scope.items = items;
    $scope.ok = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});