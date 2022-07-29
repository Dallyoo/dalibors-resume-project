using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Resume.Models;

namespace Resume.ViewComponents
{
    public class DarkModeSwitch : ViewComponent
    {
        public enum DropVariation
        {
            dropdown,
            dropend,
            dropup,
            dropstart,

        }

        public enum ButtonSize
        {
            defaultSize,
            large,
            small,
        }

        private static Dictionary<ButtonSize, string> ButtonSizes = new Dictionary<ButtonSize, string>()  
        {
            { ButtonSize.defaultSize, string.Empty },
            { ButtonSize.large, "btn-lg" },
            { ButtonSize.small, "btn-sm" }
        };

        public DarkModeSwitch()
        {
        }

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