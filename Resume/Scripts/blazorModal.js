//
// Custom Blazor reconnection modal
//
// Force close connection window['Blazor']._internal.forceCloseConnection();

// Bootstrap modal settings and fucntions

const hostingEnv = document.querySelector("#hostingEnv").value; //.NET Core hosting environment
const blazorModal = new bootstrap.Modal(document.getElementById("components-reconnect-modal"));

function closeBlazorModal() {
    blazorModal.hide();
};
window.CloseBlazorModal = closeBlazorModal;

function openBlazorModal() {
    blazorModal.show();
};
window.openBlazorModal = openBlazorModal;

// Check the server is available
async function attemptConnect() {
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

async function blazorReconnect() {
    await attemptConnect();
    try {
        var result = await window.Blazor.reconnect();
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
window.blazorReconnect = blazorReconnect;

var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
        if (mutation.attributeName === "class") {
            if (hostingEnv == "Production") {
                if ($(mutation.target).hasClass("components-reconnect-failed")
                    || $(mutation.target).hasClass("components-reconnect-rejected")) {
                    blazorModal.show();
                }
            } else {
                if ($(mutation.target).hasClass("components-reconnect-failed")
                    || $(mutation.target).hasClass("components-reconnect-show")
                    || $(mutation.target).hasClass("components-reconnect-rejected")) {
                    blazorModal.show();
                }
            }
            
            if ($(mutation.target).hasClass("components-reconnect-hide")) {
                blazorModal.hide();
            }

        }
    });
});

// Check for class changes on blazor reconnect modal
observer.observe(document.querySelector("#components-reconnect-modal"), {
    attributes: true
});




