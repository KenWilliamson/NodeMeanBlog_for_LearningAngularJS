'use strict';

/* Services */

var angularBlogServices = angular.module('angularBlogServices', ['ngResource']);

angularBlogServices.factory('BlogPost', ['$resource',
    function($resource) {
        return $resource("./NodeBlog/blog/:id", {}, {
            get: {method: 'GET', cache: false, isArray: false},
            save: {method: 'POST', cache: false, isArray: false},
            update: {method: 'PUT', cache: false, isArray: false},
            delete: {method: 'DELETE', cache: false, isArray: false}
        });
    }]);

angularBlogServices.factory('BlogList', ['$resource',
    function($resource) {
        return $resource("./NodeBlog/blogList", {}, {
            get: {method: 'GET', cache: false, isArray: true}            
        });
    }]);


angularBlogServices.factory('Login', ['$resource',
    function($resource) {
        return $resource("./NodeBlog/login", {}, {
            login: {method: 'POST', cache: false, isArray: false}            
        });
    }]);

angularBlogServices.factory('BlogPostComments', ['$resource',
    function($resource) {
        return $resource("./NodeBlog/comment/:id", {}, {           
            save: {method: 'POST', cache: false, isArray: false}           
        });
    }]);