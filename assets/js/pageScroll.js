//Ensure page refresh forces the page to be scrolled to the top so that the below ScrollReveal() functions work as intended
window.onbeforeunload = function() {
    window.scrollTo(0,0);
}

//Scroll Reveal functionality, courtesy of https://scrollrevealjs.org/guide/hello-world.html
ScrollReveal().reveal('.reveal-one', {
    delay: 500,
    duration: 1000,
    reset: false
});
ScrollReveal().reveal('.reveal-two', {
    delay: 600,
    duration: 1000,
    reset: false
});
ScrollReveal().reveal('.reveal-three', {
    delay: 700,
    duration: 1000,
    reset: false
});
ScrollReveal().reveal('.reveal-four', {
    delay: 700,
    duration: 1000,
    reset: false
}); 

//The Back to Top function which is invoked when the user clicks on the relevant link in the footer
function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}