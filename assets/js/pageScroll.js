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
    delay: 750,
    duration: 1000,
    reset: false
});
ScrollReveal().reveal('.reveal-three', {
    delay: 1125,
    duration: 1000,
    reset: false
});
ScrollReveal().reveal('.reveal-four', {
    delay: 1125,
    duration: 1000,
    reset: false
}); 