//
// Animations
//

// Fade in section elements
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const element = entry.target;
        if (entry.isIntersecting) {
            $(element).fadeTo(1250, 1)
            return;
        }
    });
});

const hideme = document.querySelectorAll(".hideme");
hideme.forEach(hideme => observer.observe(hideme));

// Elements shrink on scroll
$(document).ready(function () {
    $(window).scroll(function () {
        var scroll = 50;
        // Navbar
        $(".navbar").toggleClass("navbar-shrink", $(this).scrollTop() > scroll)
        // Body
        $(".resume-page").toggleClass("resume-shrink", $(this).scrollTop() > scroll)
        // Profile picture
        $(".img-profile").toggleClass("img-profile-shrink", $(this).scrollTop() > scroll)
    });   
});