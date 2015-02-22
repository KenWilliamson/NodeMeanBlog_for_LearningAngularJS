module.exports = function (config) {
    config.set({
        basePath: '../',
        files: [
            "public/js/libs/angular.min.js",
            "public/js/libs/angular-mocks.js",
            "public/js/libs/angular-route.min.js",
            "public/js/libs/angular-resource.min.js",
            "public/js/libs/angular-cookies.min.js",
            "public/js/*.js",
            'public/partials/*.html',
            "test/**/*Spec.js"
            
        ],
        preprocessors: {
            'public/partials/*.html': ['ng-html2js']
        },
        exclude: [
        ],
        autoWatch: true,
        frameworks: [
            "jasmine"
        ],
        browsers: [
            "Chrome",
            "Firefox"
        ],
        plugins: [
            "karma-junit-reporter",
            "karma-chrome-launcher",
            "karma-firefox-launcher",
            "karma-jasmine",
            "karma-ng-html2js-preprocessor"
        ],
        
        ngHtml2JsPreprocessor: {            
            stripPrefix: 'public/'
        }
        
    });
};