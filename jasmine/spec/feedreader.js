/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
		 it('has defined urls and they are not empty', function() {
			 for(var feed of allFeeds){
				expect(feed.url).toBeDefined();
				expect(feed.url).not.toBe(''); 
			 }
		 });
			 


        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
		 it('has defined names and they are not empty', function() {
			 for(var feed of allFeeds){
				expect(feed.name).toBeDefined();
				expect(feed.name).not.toBe(''); 
			 }
		 });		 
		 
    });


    /* Test suite named "The menu" */
   describe('The menu', function() {

        /* Test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
		 it('has a hidden menu when loading', function() {
			expect($('body').hasClass('menu-hidden')).toBe(true);
		 });
		 
         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
		 it('has a menu that shows and hides when the menu icon is clicked', function() {
			 
				$('.menu-icon-link').click();
				expect($('body').hasClass('menu-hidden')).toBe(false);
				$('.menu-icon-link').click();
				expect($('body').hasClass('menu-hidden')).toBe(true);				
		 });	

		if('The header has to change to the selected feed', function(){
			//Click on the menu to see it
			$('.menu-icon-link').click();
			//Click on the thrid menu (HTML5 Rocks)
			$($(".feed-list").find("a")[2]).click();
			//Validate that the header is HTML5 Rocks
			expect($('.header-title').text()).toBe('HTML5 Rocks');
		});
		 
    });


    /* Test suite named "Initial Entries" */
   describe('Initial Entries', function() {

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		 beforeEach(function(done) {
			 //Load the first feed
			 loadFeed(0, done);

		 });
		 
		it(' has at least one entry in the feed container', function(done){
			 expect($(".feed .entry").length).not.toBeLessThan(1);
			 done();
		 });			 
    });
	
	
	/* Test suite named "New Feed Selection" */
	describe('New Feed Selection', function() {
 
		var headers = new Array();
		 
		beforeEach(function(done) {
			//Load the first feed
			loadFeed(0, function(){
				//Get the first title
				headers.push($($(".feed").find(".entry")[0]).find("h2").text());				
				//Load the second feed
				loadFeed(1, function(){
					//Get the second title
					headers.push($($(".feed").find(".entry")[0]).find("h2").text());
					done();
							
				});				
			});
		});			

			
		it(' must load new content when loading new feeds', function(done){	
			//When it enters here it should have call the load feed twice
			expect(headers[0]).toBeDefined();
			expect(headers[1]).toBeDefined();
			expect(headers[0]).not.toBe(headers[1]);
			done();
		 });
	});
	
}());
