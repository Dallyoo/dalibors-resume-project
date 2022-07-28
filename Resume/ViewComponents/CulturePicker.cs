using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Resume.Models;

namespace Resume.ViewComponents
{
    public class CulturePicker : ViewComponent
    {
        private readonly IOptions<RequestLocalizationOptions> localizationOptions;

        public CulturePicker(IOptions<RequestLocalizationOptions> localizationOptions)
        {
            this.localizationOptions = localizationOptions;
        }

        public IViewComponentResult Invoke(bool RenderAsButton = true)
        {
            var cultureFeature = HttpContext.Features.Get<IRequestCultureFeature>();
            var model = new CulturePickerModel
            {
                RenderAsButton = RenderAsButton,
                SupportedCultures = localizationOptions.Value.SupportedUICultures.ToList(),
                CurrentUICulture = cultureFeature.RequestCulture.UICulture
            };

            return View(model);
        }
    }
}