describe("Blog Application Test", function(){
    it("should test the main blog page", function(){
        // note: this script will fail if you don't:
        // 1. add new blog posts 
        // 2. modify the script to match the blog posts stored in your local MongoDB
        
        browser.get("http://localhost:8080/#!/");
        //log into the blog application
        element(by.model("username")).sendKeys("node");
        element(by.model("password")).sendKeys("password");
        element(by.css('.form-button')).click();
        
        
        expect(browser.getTitle()).toEqual("AngularJS Blog");
        
        //gets the blog list
        var blogList = element.all(by.repeater('blogPost in blogList'));
        
        //test the size of the blogList
        //change this to the count of blog posts that you added
        expect(blogList.count()).toEqual(3);
        
        //change this to the id of one of your new blog posts
        browser.get("http://localhost:8080/#!/blogPost/5387bafe185e4e972996adff");
        expect(browser.getTitle()).toEqual("AngularJS Blog");
        
        //gets the comment list
        var commentList = element.all(by.repeater('comment in blogEntry.comments'));
        
        //checks the size of the commentList
        //change this to the number of blog comments for the blog post above on your local system
        expect(commentList.count()).toEqual(2);
        
        element(by.css('.navbar-brand')).click();
        
        //log out of the blog application
        element(by.id('lo')).click();
        
        expect(browser.getTitle()).toEqual("AngularJS Blog");
        
        
    });
});