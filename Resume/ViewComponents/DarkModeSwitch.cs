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
        /// Dropdown menu variations.
        /// </summary>
        public enum DropVariation
        {
            standard,
            center

        }

        /// <summary>
        /// Dictionary which assigns class to <see cref="DropVariation"></see> enum.
        /// </summary>
        private static Dictionary<DropVariation, string> DropVariations = new Dictionary<DropVariation, string>()  
        {
            { DropVariation.standard, string.Empty },
            { DropVariation.center, "dropdown-content-center" }
        };
        /// <summary>
        /// CSS which gets assiged to dropdown class.
        /// </summary>
        public string DropVariationCss { get; private set; }
            = string.Empty;
        /// <summary>
        /// Dark mode switch component. Creates a button with options for dark mode switching.
        /// </summary>
        public DarkModeSwitch()
        {
        }
        /// <summary>
        /// Creates dark mode switch component with selected drop variation and button size. Uses <see cref="DarkModeSwitch">DarkSwitchModel</see> as it's model.
        /// </summary>
        /// <param name="dropVariation"><see cref="DropVariation">Dropdown menu variations</see></param>
        /// <returns>View from <see cref="DarkModeSwitchModel">DarkSwitchModel</see></returns>
        public IViewComponentResult Invoke(DropVariation dropVariation)
        {
            var dropVariationCss = DropVariations[dropVariation];

            var model = new DarkModeSwitch
            {
                DropVariationCss = dropVariationCss,
            };

            return View(model);
        }
    }
}