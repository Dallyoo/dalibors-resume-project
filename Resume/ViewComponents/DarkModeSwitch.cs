using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Resume.Models;

namespace Resume.ViewComponents
{
    public class DarkModeSwitch : ViewComponent
    {
        /// <summary>
        /// Bootstrap dropdown variations.
        /// </summary>
        public enum DropVariation
        {
            dropdown,
            dropend,
            dropup,
            dropstart,

        }
        /// <summary>
        /// Button sizes for dark mode switch
        /// </summary>
        public enum ButtonSize
        {
            defaultSize,
            large,
            small,
        }
        /// <summary>
        /// Dictionary which assigns class to <see cref="ButtonSize">ButtonSize</see> enum.
        /// </summary>
        private static Dictionary<ButtonSize, string> ButtonSizes = new Dictionary<ButtonSize, string>()  
        {
            { ButtonSize.defaultSize, string.Empty },
            { ButtonSize.large, "btn-lg" },
            { ButtonSize.small, "btn-sm" }
        };

        public DarkModeSwitch()
        {
        }
        /// <summary>
        /// Creates dark mode switch component with selected drop variation and button size. Uses <see cref="DarkModeSwitchModel">DarkSwitchModel</see> as it's model.
        /// </summary>
        /// <param name="dropVariation"><see cref="DropVariation">Bootstrap dropdown variation</see></param>
        /// <param name="buttonSize"><see cref="ButtonSize">Bootstrap button size</see></param>
        /// <returns>View from <see cref="DarkModeSwitchModel">DarkSwitchModel</see></returns>
        public IViewComponentResult Invoke(DropVariation dropVariation, ButtonSize buttonSize)
        {
            var buttonSizeCss = ButtonSizes[buttonSize];

            var model = new DarkModeSwitchModel
            {
                DropVariation = dropVariation,
                ButtionSize = buttonSizeCss
            };

            return View(model);
        }
    }
}