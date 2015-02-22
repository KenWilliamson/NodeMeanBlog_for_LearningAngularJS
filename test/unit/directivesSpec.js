/* jasmine specs for directives */
describe('AngularJS Blog Application', function () {

    beforeEach(module('angularBlogDirectives'));    

    describe('Unit test of Menu Directive', function () {
        var rootScope, compile;
        
         // The external template file referenced by templateUrl
        beforeEach(module('partials/menu.html'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {           

            compile = _$compile_;
            rootScope = _$rootScope_;           

        }));


        it('Replaces the menu attribute with the menu', function () {
             
            var elm = angular.element("<div blg-menu menu-title=\"AngularJS Blog\"></div>");
            var menu = compile(elm)(rootScope);            
            
            rootScope.$digest();  
            
           expect(menu.html()).toContain("AngularJS Blog");

        });
    });




});
