using System.Globalization;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Resume.Models
{
    public class CulturePickerModel
    {
        /// <summary>
        /// Supported UI cultures list assigned from <see cref="ViewComponents.CulturePicker"> CulturePicker</see>
        /// </summary>
        public CultureInfo CurrentUICulture { get; set; }
        /// <summary>
        /// Supported cultures list assigned from <see cref="ViewComponents.CulturePicker"> CulturePicker</see>
        /// </summary>
        public List<CultureInfo> SupportedCultures { get; set; }
        /// <summary>
        /// Specifies if the culture picker component should be rendered as standalone button.
        /// </summary>
        public bool RenderAsButton { get; set; }

        /// <summary>
        /// Converts ISO 3166-1 alpha-2 country code to flag emoji - currently works only in Firefox. 
        /// </summary>
        /// <param name="country">ISO 3166-1 alpha-2 country code</param>
        /// <returns>Char emoji of given country code</returns>
        public string ToFlagEmoji(string country)
        {
            country = country.Split('-').LastOrDefault();

            if (country == null)
                return "⁉️️";
            
            return string.Concat(country.ToUpper().Select(x => char.ConvertFromUtf32(x + 0x1F1A5))
            );
        }

        /// <summary>
        /// Dictionary used for converting language codes to their ISO 3166-1 alpha-2 format
        /// </summary>
        private Dictionary<string, string> _countryMap = new Dictionary<string, string>
        {
            {"cs", "CZ"}
        };

        /// <summary>
        /// Converts language code (ex. "cs") to it's country equivalent (ex. CZ).
        /// Neutral <see cref="CultureInfo">CultureInfo</see> does not have information about country and there cannot be created <see cref="RegionInfo">RegionInfo</see> from it.
        /// </summary>
        /// <param name="countryCode">Can be either only language code and or full <see cref="CultureInfo">CultureInfo</see> name (ex. en-US)</param>
        /// <returns>Country code in ISO 3166-1 alpha-2 format</returns>
        /// <exception cref="ArgumentNullException">Exception thrown when countryCode is null</exception>
        public string IsoLanguageCodeToIsoCountryCode(string countryCode)
        {
            if (countryCode == null)
                throw new ArgumentNullException(nameof(countryCode));

            if (countryCode.Contains("-"))
                return countryCode.Split('-').LastOrDefault();

            if (_countryMap.ContainsKey(countryCode))
                return _countryMap[countryCode];

            return countryCode;

        }
    }
}