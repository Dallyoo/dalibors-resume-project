using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Resume.Models;

namespace Resume.ViewComponents
{
    /// <summary>
    /// Culture picker view component. Lets user set the culture.
    /// </summary>
    public class CulturePicker : ViewComponent
    {
        private readonly IOptions<RequestLocalizationOptions> localizationOptions;

        private readonly ILogger _logger;

        public CulturePicker(IOptions<RequestLocalizationOptions> localizationOptions, ILogger<CulturePicker> logger)
        {
            this.localizationOptions = localizationOptions;
            this._logger = logger;
        }
        /// <summary>
        /// Gets the current browser request culture, and assigns it to <see cref="CulturePickerModel">CulturePickerModel</see>.
        /// </summary>
        /// <param name="RenderAsButton">Specifies if the culture picker should be rendered as standalone button or as a link. Usage outside of navigation.</param>
        /// <returns>View from <see cref="CulturePickerModel">CulturePickerModel</see>.</returns>
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