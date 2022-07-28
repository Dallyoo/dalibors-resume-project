using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using static Resume.ViewComponents.DarkModeSwitch;

namespace Resume.Models
{
    public class DarkModeSwitchModel
    {
        public DropVariation DropVariation { get; set; }
            = DropVariation.dropend; // Default animation

    }
}