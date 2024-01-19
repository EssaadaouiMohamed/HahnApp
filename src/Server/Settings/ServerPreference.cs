using System.Linq;
using HahnApp.Shared.Constants.Localization;
using HahnApp.Shared.Settings;

namespace HahnApp.Server.Settings
{
    public record ServerPreference : IPreference
    {
        public string LanguageCode { get; set; } = LocalizationConstants.SupportedLanguages.FirstOrDefault()?.Code ?? "en-US";

        //TODO - add server preferences
    }
}