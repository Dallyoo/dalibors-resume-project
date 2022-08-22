//
// Handler for dropdown menus
//

class DropdownHandler {
    static readonly DROPDOWN_ITEMS = document.querySelectorAll(".dropdown");

    constructor() {
        this.handleDropdowns();
    }

   private handleDropdowns(): void {
       window.addEventListener("DOMContentLoaded", event => {
           DropdownHandler.DROPDOWN_ITEMS.forEach(e => {
               var target = e.getAttribute("data-dropdown-target");
               var dropdown = $(target);
               e.addEventListener("click", function (e) {
                   DropdownHandler.closeActiveDropdowns(dropdown.get(0));
                   dropdown.toggleClass("active");
               });

           });
       });
    };

    private static closeActiveDropdowns(exclude:Element): void {
        var activeItems = document.querySelectorAll(".dropdown-content.active");
        activeItems.forEach(e => {           
            if (exclude != e) {
                e.classList.remove("active");
            } 
        });
    }
};

new DropdownHandler();



