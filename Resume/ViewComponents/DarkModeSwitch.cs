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

        public DarkModeSwitch()
        {
        }

        public IViewComponentResult Invoke(DropVariation DropVariation)
        {
            var model = new DarkModeSwitchModel { DropVariation = DropVariation };

            return View(model);
        }
    }
}