/**
 * File downloader wrapper for JSInterop
 * @param {any} fileName name of the saved file
 * @param {any} contentStreamReference memory stream of the downloaded file
 */
async function downloadFileFromStream(fileName, contentStreamReference) {
    const arrayBuffer = await contentStreamReference.arrayBuffer();
    const blob = new Blob([arrayBuffer]);
    const url = URL.createObjectURL(blob);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = fileName ?? "";
    anchorElement.click();
    anchorElement.remove();
    URL.revokeObjectURL(url);
};

// Close modal box
function closePrintModal() {
    $('#printModal').modal('hide');
};