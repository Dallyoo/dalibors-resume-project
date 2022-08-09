//
// Scripts
//
///<reference path="../../node_modules/bootstrap-dark-5/dist/js/darkmode.d.ts"/>

// Import animations
import "./animations.js";

// Import Blazor reconnection modal
import "./blazor-modal.js";

// Bootstrap dropdown placement in navbar
// https://stackoverflow.com/questions/56198913/allow-popper-js-for-dropdowns-in-navbar-on-bootstrap-4
//
/*
(function () {
    // Fix Bootstrap caveat regarding to Poppers.js placement capabilities
    // Allow overriding Dropdown placement in navbar
    var _detectNavbar = bootstrap.Dropdown.prototype._detectNavbar;
    bootstrap.Dropdown.prototype._detectNavbar = function _detectNavbar() {
        return false;
    }
});
*/

// Fade in body and hide page loading spinner
$(window).on('load', function () {
    $("#pageLoading").fadeOut("slow", function () {
        $("#page").fadeTo("fast", 1);
    });
});

// Do not preserve scroll on reload
if (history && history.scrollRestoration) {
    history.scrollRestoration = "manual";
} else {
    window.onload = function () {
        if (window.scrollTo) window.scrollTo(0, 0);
    };
}

// Collapse responsive navbar on click outside
// https://stackoverflow.com/questions/50359249/bootsrap-v4-1-closing-a-collapse-menu-when-clicking-outside-of-div
$(document).mouseup(function (e) {
    var container = $("#sideNav");
    var navbarResponsive = $("#navbarResponsive");

    if (container.is(null) && navbarResponsive.is(null)) {
        return;
         }

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.toElement) && container.has(e.toElement).length === 0) {
        navbarResponsive.collapse('hide');
    }
}); 

// Navigation
window.addEventListener("DOMContentLoaded", event => {
    /*
    * Smooth Scroll on Pageload
    * Smooth scrolling on page load if URL have a hash
    * Author: Franco Moya - @iamravenous
    */

    if (window.location.hash) {
        var hash = window.location.hash;

        if ($(hash).length) {
            $("html, body").animate({
                scrollTop: $(hash).offset().top
            }, 900, "swing");
        }
    }

    // Assign onlick function to dark mode selector
    const darkModeSelector = document.querySelector("div[id=darkmodeSwitch]") ;
    if (darkModeSelector) {
        (document.querySelector("#darkmode-button") as HTMLButtonElement).onclick = function (e) {
            darkmode.toggleDarkMode();
        };

        (document.querySelector("#darkmode-button-l-1") as HTMLButtonElement).onclick = function (e) {
            darkmode.setDarkMode(false);
        };

        (document.querySelector("#darkmode-button-d-1") as HTMLButtonElement).onclick = function (e) {
            darkmode.setDarkMode(true);
        };

        (document.querySelector("#darkmode-forget") as HTMLButtonElement).onclick = function (e) {
            darkmode.resetDarkMode();
        };
    }

    // Autohide floting icons
    // https://bootstrap-menu.com/detail-autohide.html
    var el_autohide = document.querySelector('.floating-icons');
    if (el_autohide) {
        var last_scroll_top = 0;
        window.addEventListener('scroll', function () {
            let scroll_top = window.scrollY;
            // Detect iOS overscroll bounce effect
            if (!(scroll_top < 0) && !(scroll_top + window.innerHeight > document.body.scrollHeight)) {
                if (scroll_top < last_scroll_top) {
                    el_autohide.classList.remove('scrolled-down');
                    el_autohide.classList.add('scrolled-up');
                }
                else {
                    el_autohide.classList.remove('scrolled-up');
                    el_autohide.classList.add('scrolled-down');
                }
                last_scroll_top = scroll_top;
            }
            
        });
    }
      
    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new window["bootstrap"].ScrollSpy(document.body, {
            target: '#sideNav',
            offset: 74,
        });
    }
    else {
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector(".navbar-toggler") as HTMLElement;
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll("#navbarResponsive .nav-link:not(#cultureSwitcherMenu)")
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener("click", () => {
            if (window.getComputedStyle(navbarToggler).display !== "none") {
                navbarToggler.click();
            }
        });
    });

});




