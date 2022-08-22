//
// Handler for modal popups
//

class ModalHandler {
    private static readonly MODAL_ITEMS = document.querySelectorAll("[data-modal-target]");
    private static readonly MODAL_CLOSE = document.querySelectorAll("[data-modal-close]");

    private static _animDuration = 280;

    // Animation for when user clicks on static backdrop
    private static readonly BACKDROP_CLICK_ANIM = [
        { transform: "scale(102%)" },
        { transform: "scale(100%)" }
    ];
    private static readonly BACKDROP_CLICK_ANIM_OPTIONS = {
        duration: this._animDuration,
        fill: <FillMode>"both",

    };

    // Animation on modal show and or hide
    // CSS animations cannot be played backwards (or atleast i don't know how), and instead of using animations on multiple elements in CSS, this looks like a better choice
    // Also Blazor components rendered by server does not accept class changes, as they are rendered on the server.
    public static readonly MODAL_ANIM = [
        { top: "-300px", opacity: 0 },
        { top: 0, opacity: 1}
    ];

    public static readonly MODAL_ANIM_SHOW = {
        duration: this._animDuration,
        fill: <FillMode>"both",
    };

    public static readonly MODAL_ANIM_HIDE = {
        duration: this._animDuration,
        fill: <FillMode>"both",
        direction: <PlaybackDirection>"reverse"
    };

    public static readonly BACKDROP_ANIM = [
        { opacity: 0, visibility: "hidden" },
        { opacity: 1, visibility: "visible" }
    ];

    public static readonly BACKDROP_ANIM_SHOW = {
        duration: this._animDuration,
        fill: <FillMode>"both",
    };

    public static readonly BACKDROP_ANIM_HIDE = {
        duration: this._animDuration,
        fill: <FillMode>"both",
        direction: <PlaybackDirection>"reverse"
    };

    constructor() {
        this.handleModals();
    }

    private handleModals(): void {
        window.addEventListener("DOMContentLoaded", event => {
            ModalHandler.MODAL_ITEMS.forEach(e => {
                var target = e.getAttribute("data-modal-target");
                var modal = document.querySelector(target) as HTMLElement;

                if (!modal) {
                    console.log("Specified modal with open target: " + target + " was not found.");
                    return;
                } 

                var backdrop = modal.getAttribute("data-modal-backdrop");
                var modalContent = modal.querySelector(".modal-content") as HTMLElement;

                if (!modalContent) {
                    console.log("Modal with ID: " + target + " has no content element");
                    return;
                } 
                
                e.addEventListener("click", function (e) {
                    modal.style.display = "block";
                    modal.animate(ModalHandler.BACKDROP_ANIM, ModalHandler.BACKDROP_ANIM_SHOW);
                    modalContent.animate(ModalHandler.MODAL_ANIM, ModalHandler.MODAL_ANIM_SHOW);
                    modal.setAttribute("data-modal-js-visible", "visible");
                });

                
                if (backdrop != "static") {
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modal.animate(ModalHandler.BACKDROP_ANIM, ModalHandler.BACKDROP_ANIM_HIDE);
                            modalContent.animate(ModalHandler.MODAL_ANIM, ModalHandler.MODAL_ANIM_HIDE);
                            modal.setAttribute("data-modal-js-visible", "hidden");
                        }
                    };
                } else {
                    window.onclick = function (event) {
                        if (event.target == modal) {
                            modalContent.animate(ModalHandler.BACKDROP_CLICK_ANIM, ModalHandler.BACKDROP_CLICK_ANIM_OPTIONS);
                        }
                    };
                }
            });

            ModalHandler.MODAL_CLOSE.forEach(e => {
                var target = e.getAttribute("data-modal-close");
                var modal = document.querySelector(target) as HTMLElement;

                if (!modal) {
                    console.log("Specified modal with open target: " + target + " was not found.");
                    return;
                }

                var modalContent = modal.querySelector(".modal-content") as HTMLElement;
                
                if (!modalContent) {
                    console.log("Modal with ID: " + target + " has no content element");
                    return;
                } 
                e.addEventListener("click", function (e) {
                    modal.animate(ModalHandler.BACKDROP_ANIM, ModalHandler.BACKDROP_ANIM_HIDE);
                    modalContent.animate(ModalHandler.MODAL_ANIM, ModalHandler.MODAL_ANIM_HIDE);
                    modal.setAttribute("data-modal-js-visible", "hidden");
                });
            });
        });
    };
};

// Class for creating new modal programatically
class Modal {

    private _modal: HTMLElement;
    private _content: HTMLElement;

    constructor(e: HTMLElement = null) {
        this._modal = e;
        if (!this._modal) {
            throw("Specified modal to open was not found.");
        }

        this._content = e.querySelector(".modal-content") as HTMLElement;
        if (!this._content) {
            throw ("Modal with ID:" + this._modal.getAttribute("id") + " has no content element");
        }
    }


    public show(): void {
        this._modal.style.display = "block";
        this._modal.animate(ModalHandler.BACKDROP_ANIM, ModalHandler.BACKDROP_ANIM_SHOW);
        this._content.animate(ModalHandler.MODAL_ANIM, ModalHandler.MODAL_ANIM_SHOW);
        this._modal.setAttribute("data-modal-js-visible", "visible");
    };

    public hide(): void {
        this._modal.animate(ModalHandler.BACKDROP_ANIM, ModalHandler.BACKDROP_ANIM_HIDE);
        this._content.animate(ModalHandler.MODAL_ANIM, ModalHandler.MODAL_ANIM_HIDE);
        this._modal.setAttribute("data-modal-js-visible", "hidden");

    }
};

export default new ModalHandler();
export { Modal };



