//
// Custom Blazor reconnection modal, with usage of Bootstrap modal window
//

class BlazorModal {
    static readonly HOSTING_ENV = (<HTMLInputElement>document.querySelector("#hostingEnv")).value; //.NET Core hosting environment
    static readonly BLAZOR_MODAL = new window["bootstrap"].Modal(document.getElementById("components-reconnect-modal"));
    static readonly MODAL_ELEMENT: HTMLElement | null = document.getElementById("components-reconnect-modal");

    //document.getElementById("components-reconnect-modal");

    constructor() {
        var modalObserver = this.modalObserver;
        if (document.readyState === 'loading') {
            document.addEventListener("DOMContentLoaded", function () {
                modalObserver.observe(BlazorModal.MODAL_ELEMENT, {
                    attributes: true
                });
            });
        } else {
            modalObserver.observe(BlazorModal.MODAL_ELEMENT, {
                attributes: true
            });
        };
    };

    // Check the server is available
    private async attemptConnect(): Promise<void> {
        await fetch('')
            .then((response) => {
                if (response.ok) {
                    return response;
                }
                throw new Error("Could not connect to the server.");
            })
            .catch((error) => {
                console.error("Server is unavailable. Please try again later.");
                alert("Server is unavailable. Please try again later or reload the page.");
            })
    }

    async blazorReconnect() {
        await this.attemptConnect();
        try {
            var result = await window["Blazor"].reconnect();
            if (!result) {
                // If the server responded and refused to reconnect, log it 
                console.error("Could not reconect to server.");
                alert("Could not reconect to server. Please try again later or reload the page.");
            } else {
                // Reconnected!
                return;
            }
        } catch (err) {
            console.log("Undefined error occured:" + err);
        }
    }

    private modalObserver = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.attributeName === "class") {
                if (BlazorModal.HOSTING_ENV == "Production") {
                    if ($(mutation.target).hasClass("components-reconnect-failed")
                        || $(mutation.target).hasClass("components-reconnect-rejected")) {
                        BlazorModal.BLAZOR_MODAL.show();
                    }
                } else {
                    if ($(mutation.target).hasClass("components-reconnect-failed")
                        || $(mutation.target).hasClass("components-reconnect-show")
                        || $(mutation.target).hasClass("components-reconnect-rejected")) {
                        BlazorModal.BLAZOR_MODAL.show();
                    }
                }

                if ($(mutation.target).hasClass("components-reconnect-hide")) {
                    BlazorModal.BLAZOR_MODAL.hide();
                }

            }
        });
    });
};

// Static class for debug purposes
class BlazorModalDebug {
    // For debug purposes
    public closeBlazorModal(): void {
        BlazorModal.BLAZOR_MODAL.hide();
    };

    // For debug purposes
    public openBlazorModal(): void {
        BlazorModal.BLAZOR_MODAL.show();
    };

    // For debug purposes
    // Disconnects from circuit and then force closses connection
    public forceCloseBlazorConnection(): void {
        window['Blazor'].disconnect();
        window['Blazor']._internal.forceCloseConnection();
    };
};
export default new BlazorModal();
export { BlazorModalDebug };



