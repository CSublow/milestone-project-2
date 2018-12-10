//Ensure page refresh forces the page to be scrolled to the top so that the below ScrollReveal() functions work as intended
// window.onbeforeunload = function() {
//     window.scrollTo(0,0);
// }

//Scroll Reveal functionality for the pie chart popup, courtesy of https://scrollrevealjs.org/guide/hello-world.html
ScrollReveal().reveal('.reveal', {
    delay: 1500,
    duration: 1000,
    reset: true,
    mobile: true
});

//The Back to Top function which is invoked when the user clicks on the relevant link in the footer
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}