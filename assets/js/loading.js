$( window ).on("load", function() {
    //Remove the loading overlay when the document is loaded. A delay is set to ensure that users on quick connections, 
    //or those who have already visited the site and have cookies saved, can see the screen is a loading screen and 
    //not get confused if it disappears quickly
    $('body').delay(1000).queue(function() { //The loading screen will appear for at least one second
        $(this).addClass('loaded');
    });   
})