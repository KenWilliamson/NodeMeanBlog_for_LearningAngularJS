'use strict';

/* Controllers */

var angularBlogControllers = angular.module('angularBlogControllers', []);



angularBlogControllers.controller('BlogCtrl', ['$scope', 'BlogList', '$location', 'checkCreds',
    function BlogCtrl($scope, BlogList, $location, checkCreds) {
        if (!checkCreds()) {
            $location.path('/login');
        }
        $scope.blogList = [];
        $scope.brandColor = "color: white;";
        BlogList.get({},
                function success(response) {
                    //alert($scope.challenge.question);
                    console.log("Success:" + JSON.stringify(response));
                    $scope.blogList = response;

                },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
        );


    }]);

angularBlogControllers.controller('BlogViewCtrl', ['$scope', '$routeParams', 'BlogPost', 'BlogPostComments', '$location', 'checkCreds', '$http', 'getToken', '$route',
    function BlogViewCtrl($scope, $routeParams, BlogPost, BlogPostComments, $location, checkCreds, $http, getToken, $route) {
        if (!checkCreds()) {
            $location.path('/login');
        }
        var blogId = $routeParams.id;
        $scope.blg = 1;
        BlogPost.get({id: blogId},
        function success(response) {
            //alert($scope.challenge.question);
            console.log("Success:" + JSON.stringify(response));
            $scope.blogEntry = response;
            $scope.blogId = response._id;

        },
                function error(errorResponse) {
                    console.log("Error:" + JSON.stringify(errorResponse));
                }
        );
        
        $scope.submit = function() { 
            $scope.sub = true;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
            var postData = {
                "commentText": $scope.commentText,
                "blog" : $scope.blogId
            };
             
            BlogPostComments.save({}, postData,
                    function success(response) {
                        //alert($scope.challenge.question);
                        console.log("Success:" + JSON.stringify(response));
                        $location.path('/blogPost/'+$scope.blogId);
                        $route.reload();
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
            );
            
        };

    }]);

angularBlogControllers.controller('LoginCtrl', ['$scope', '$location', 'Login', 'setCreds', 'checkCreds',
    function LoginCtrl($scope, $location, Login, setCreds, checkCreds) {
        if (checkCreds()) {
            $location.path('/');
        }
        $scope.submit = function() {
            $scope.sub = true;
            var postData = {
                "username": $scope.username,
                "password": $scope.password
            };
            Login.login({}, postData,
                    function success(response) {
                        console.log("Success:" + JSON.stringify(response));
                        if (response.authenticated) {
                            setCreds($scope.username, $scope.password)
                            $location.path('/');
                        } else {
                            $scope.error = "Login Failed"
                        }

                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
            );

        };
    }]);

angularBlogControllers.controller('LogoutCtrl', ['$location', 'deleteCreds',
    function LogoutCtrl($location, deleteCreds) {
        deleteCreds();
        $location.path('/login');
    }]);


angularBlogControllers.controller('NewBlogPostCtrl', ['$scope', 'BlogPost', '$location', 'checkCreds', '$http', 'getToken',
    function NewBlogPostCtrl($scope, BlogPost, $location, checkCreds, $http, getToken) {
        if (!checkCreds()) {
            $location.path('/login');
        }
        $scope.languageList = [
            {
                "id": 1,
                "name" : "English"
            },
            {
                "id": 2,
                "name" : "Spanish"
            }
        ];
        $scope.languageId = 1;
        $scope.newActiveClass = "active";
        $scope.submit = function() { 
            $scope.sub = true;
            $http.defaults.headers.common['Authorization'] = 'Basic ' + getToken();
            var postData = {
                "introText": $scope.introText,
                "blogText" : $scope.blogText,
                "languageId": $scope.languageId
            };
             
            BlogPost.save({}, postData,
                    function success(response) {
                        //alert($scope.challenge.question);
                        console.log("Success:" + JSON.stringify(response));
                        $location.path('/');
                    },
                    function error(errorResponse) {
                        console.log("Error:" + JSON.stringify(errorResponse));
                    }
            );
            
        };

    }]);

angularBlogControllers.controller('AboutBlogCtrl', ['$scope', '$location', 'checkCreds',
    function AboutBlogCtrl($scope, $location, checkCreds) {
        if (!checkCreds()) {
            $location.path('/login');
        }
        $scope.aboutActiveClass = "active";

    }]);
