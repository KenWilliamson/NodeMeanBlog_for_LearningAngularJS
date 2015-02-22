'use strict';

/* Directives */

var angularBlogDirectives = angular.module('angularBlogDirectives', []);
angularBlogDirectives.directive('blgMenu', function () {
    return {
        restrict: 'A',
        templateUrl: 'partials/menu.html',
        link: function (scope, el, attrs) {
            scope.label = attrs.menuTitle;
            
        }
    };
});


