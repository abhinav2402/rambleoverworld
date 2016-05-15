/// <reference path="../template/site/header.html" />
'use strict';

/* Directives */
var AppDirectives = angular.module('PackageInfoDirective', []);

AppDirectives.directive('hcheader', function () {
    return {
        restrict: 'E',
        scope: {
            data: '=',
        },
        templateUrl: 'app/template/site/header.html',
        link: function (scope, element) {
        }
    };
});

AppDirectives.directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    });

AppDirectives.directive('myMap', function () {
 
    var link = function (scope, element, attrs) {
       
        var map, infoWindow;
        map = [];
        var markers = [];
        var directionsDisplay;
        var directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer();
        var GF = new google.maps.LatLng(24.891893, 77.945239);
        var mapOptions = {
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            center: GF
        };
        function initMap(url) {
           
            if (map == null || map == "") {
              
                map = new google.maps.Map(element[0], mapOptions);
            }
            var center = map.getCenter();
            google.maps.event.trigger(map, 'resize');
            map.setCenter(center);
            directionsDisplay.setMap(map);
            var wp = [];
           
            if (url.wayout!=0) {
                var myarray = url.wayout.split('|');
                for (var i = 0; i < myarray.length-1; i++) {
                    wp.push({
                        location: myarray[i],
                        stopover: true
                    });
                   
                }
            }
            console.log(wp.length);
                var request = {
                    origin: url.source, // Changeable
                    destination: url.destination, // Changeable
                    waypoints: wp,
                    travelMode: google.maps.DirectionsTravelMode.WALKING
                };
                directionsService.route(request, function (response, status) {
                    if (status == google.maps.DirectionsStatus.OK)
                        directionsDisplay.setDirections(response);
                });
            }
     
        setTimeout(function () {
            initMap(attrs)
            }, 60);
       

    };

    return {
        restrict: 'A',
        
        template: '<div id="gmaps" ></div>',
        replace: true,
        link: link
    };
});
