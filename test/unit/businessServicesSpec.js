/* jasmine specs for controllers */
describe('AngularJS Blog Business Service Testing', function () {   


    describe('test setCreds', function () {       
        var $rootScope;
        var setCreds;

        beforeEach(module('angularBlogBusinessServices'));

        beforeEach(inject(function ($injector) {           
            $rootScope = $injector.get('$rootScope');
            setCreds = $injector.get('setCreds');
            setCreds("test", "test");
        }));

        it('should test setCreds service exist', function () {            
            expect(setCreds).toBeDefined();
        });

    });
    
     describe('test checkCreds', function () {       
        var $rootScope;
        var checkCreds;
        var setCreds;

        beforeEach(module('angularBlogBusinessServices'));

        beforeEach(inject(function ($injector) {           
            $rootScope = $injector.get('$rootScope');
            checkCreds = $injector.get('checkCreds');
            setCreds = $injector.get('setCreds');
            setCreds("test", "test");
        }));

        it('should test setCreds service exist', function () {            
            expect(checkCreds()).toEqual(true);
        });

    });
    
    describe('test getToken', function () {       
        var $rootScope;
        var getToken;
        var setCreds;

        beforeEach(module('angularBlogBusinessServices'));

        beforeEach(inject(function ($injector) {           
            $rootScope = $injector.get('$rootScope');
            getToken = $injector.get('getToken');
            setCreds = $injector.get('setCreds');
            setCreds("test", "test");
        }));

        it('should test setCreds service exist', function () {            
            expect(getToken()).toBeDefined();
        });

    });
    
    describe('test getUsername', function () {       
        var $rootScope;
        var getUsername;
        var setCreds;

        beforeEach(module('angularBlogBusinessServices'));

        beforeEach(inject(function ($injector) {           
            $rootScope = $injector.get('$rootScope');
            getUsername = $injector.get('getUsername');
            setCreds = $injector.get('setCreds');
            setCreds("test", "test");
        }));

        it('should test setCreds service exist', function () {            
            expect(getUsername()).toEqual("test");
        });

    });
    
    describe('test deleteCreds', function () {       
        var $rootScope;
        var deleteCreds;
        var setCreds;
        var checkCreds;

        beforeEach(module('angularBlogBusinessServices'));

        beforeEach(inject(function ($injector) {           
            $rootScope = $injector.get('$rootScope');
            deleteCreds = $injector.get('deleteCreds');
            setCreds = $injector.get('setCreds');
            checkCreds = $injector.get('checkCreds');
            setCreds("test", "test");
            deleteCreds();
        }));

        it('should test setCreds service exist', function () {            
            expect(checkCreds()).toEqual(false);
        });

    });
     
     

});
