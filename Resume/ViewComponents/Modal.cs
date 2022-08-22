using Microsoft.AspNetCore.Html;
using Microsoft.AspNetCore.Mvc;
using Resume.Models;

namespace Resume.ViewComponents
{
    public class Modal : ViewComponent
    {

        /// <summary>
        /// Modal title
        /// </summary>
        public string Title { get; set; }
            = "This is a new modal";

        /// <summary>
        /// Modal body content
        /// </summary>
        public IHtmlContent Body { get; set; }
            = new HtmlString(@"<p>This is a new modal body.</p>");
        /// <summary>
        /// Modal footer content
        /// </summary>
        public IHtmlContent Footer { get; set; }
            = new HtmlString(@"<p>This is a modal footer.</p>");
        /// <summary>
        /// Modal ID for javascript handle
        /// </summary>
        public string ModalID { get; set; } = string.Empty;
        /// <summary>
        /// Specifies if the close button should be shown.
        /// </summary>
        public bool CloseButton { get; set; } = true;
        /// <summary>
        /// Specifies if modal should be closed when clicking outside of modal window.
        /// </summary>
        public bool AllowClickOutside { get; set; } = true;
        /// <summary>
        /// Creates a modal component with specified ID, header, body and footer contents.
        /// </summary>
        ///
        public Modal()
        {
        }

        /// <summary>
        /// Invokes a modal popup with specified title, body and footer.
        /// </summary>
        /// <param name="modal">Instance of new <see cref="Modal">modal class</see>.</param>
        /// <returns></returns>
        public IViewComponentResult Invoke(Modal? modalContent = null)
        {
            modalContent = modalContent ?? new Modal();

            return View(modalContent);
        }
    }
}