//
// Animations
//

class WebsiteAnimations {

    constructor() {
        WebsiteAnimations.HIDE_ME.forEach(hideme => this.hidemeObserver.observe(hideme));
        this.ShrinkOnScroll();
        this.DocumentLoaded();
    }

    // Fade in section elements
    private static readonly HIDE_ME = document.querySelectorAll(".hideme");

    private hidemeObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const element = entry.target;
            if (entry.isIntersecting) {
                $(element).fadeTo(1250, 1)
                return;
            }
        });
    });

    private ShrinkOnScroll(): void {
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
    };

    private DocumentLoaded(): void {
        // Fade in body and hide page loading spinner
        $("#pageLoading").fadeOut("slow", function () {
            $("#page").fadeTo("fast", 1);
        });
    }
}
export default new WebsiteAnimations();