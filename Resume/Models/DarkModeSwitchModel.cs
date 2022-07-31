using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using static Resume.ViewComponents.DarkModeSwitch;

namespace Resume.Models
{
    public class DarkModeSwitchModel
    {
        /// <summary>
        /// Bootstrap dropdown variation set by <see cref="ViewComponents.DarkModeSwitch"/>
        /// </summary>
        public DropVariation DropVariation { get; set; }
            = DropVariation.dropend; // Default animation

        /// <summary>
        /// Bootstrap button size set by <see cref="ViewComponents.DarkModeSwitch"/>
        /// </summary>
        public string ButtionSize { get; set; }
            = string.Empty; //Default size

    }
}