'use strict';

/* App Module */

var angularBlogApp = angular.module('angularBlogApp', [
    'ngRoute',     
    'angularBlogControllers',
    'angularBlogServices',
    'angularBlogBusinessServices',
    'angularBlogDirectives'
    
]);


angularBlogApp.config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'partials/main.html',
                    controller: 'BlogCtrl'
                }).when('/blogPost/:id', {
                    templateUrl: 'partials/blogPost.html',
                    controller: 'BlogViewCtrl'
                }).when('/newBlogPost', {
                    templateUrl: 'partials/newPost.html',
                    controller: 'NewBlogPostCtrl'
                }).when('/about', {
                    templateUrl: 'partials/about.html',
                    controller: 'AboutBlogCtrl'
                }).when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'LoginCtrl'
                }).when('/logOut', {
                    templateUrl: 'partials/login.html',
                    controller: 'LogoutCtrl'
                });

        $locationProvider.html5Mode(false).hashPrefix('!');
    }]);



