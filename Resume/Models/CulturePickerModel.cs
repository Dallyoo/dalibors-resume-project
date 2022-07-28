using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Resume.Models
{
    public class CulturePickerModel
    {
        public CultureInfo CurrentUICulture { get; set; }
        public List<CultureInfo> SupportedCultures { get; set; }
        public bool RenderAsButton { get; set; }

        public string ToFlagEmoji(string country)
        {
            country = country
                .Split('-')
                .LastOrDefault();

            if (country == null)
                return "⁉️️";
            
            return string.Concat(
                country
                .ToUpper()
                .Select(x => char.ConvertFromUtf32(x + 0x1F1A5))
            );
        }
    }
}