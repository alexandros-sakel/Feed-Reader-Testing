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
        it('Rss Feeds are defined', function() {
            //checks if allFeeds variable has been defined
            expect(allFeeds).toBeDefined();
            //checks if feed length is not empty
            expect(allFeeds.length).not.toBe(0);
        });


        /* Here we are running a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('The urls are been defined', function() {
            allFeeds.forEach(function(feed) {
                //checks if URL is defined
                expect(feed.url).toBeDefined();
                //checks if URL is not empty 
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* We are have written a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it('The names are been defined', function() {
            allFeeds.forEach(function(feed) {
                //checks if name is defined
                expect(feed.name).toBeDefined();
                //checks if name is not an empty string
                expect(feed.name.length).not.toBe('');
            });
        });
    });

    /* We wrote a new test suite named "The menu" */
    describe('The menu', function() {
        /* Here we have a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('the menu element is hidden', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* Here we have made a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
        it('the visibility changes when menu icon is clicked', function() {
            //we are defining a variable to be checked when the element is been clicked 
            var visibilityCheck = $('.menu-icon-link');
            //we are checking if the menu-hidden is false when clicked the first time
            visibilityCheck.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //we are checking if the menu-hidden is true when clicked the second time
            visibilityCheck.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    /* Here is a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
        /* We have written a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test wil require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });
        it('we are defining that the entry has more than 0 entries ', function() {
            var entries = $('.entry').length;
            //expecting that there one entry at least
            expect(entries).toBeGreaterThan(0);
        });
    });

    /* Writing a new test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {
        /* Here we have a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var previousUrl;
        var newUrl;

        beforeEach(function(done) {
			loadFeed(1, function(){
				newUrl = $('.feed').html();
				loadFeed(2, function(){
					done();	
				});
			});
        });
				afterEach(function(){
					loadFeed(0);
				});
		
        it('checking that new feeds are different from the new ones', function() {
            expect (newUrl).toBeDefined();
            previousUrl = $('.feed').html();
            expect(previousUrl).toBeDefined();
			expect(newUrl).not.toEqual(previousUrl);
        });
    });
}());