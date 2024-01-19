using HahnApp.Shared.Settings;
using System.Threading.Tasks;
using HahnApp.Shared.Wrapper;

namespace HahnApp.Shared.Managers
{
    public interface IPreferenceManager
    {
        Task SetPreference(IPreference preference);

        Task<IPreference> GetPreference();

        Task<IResult> ChangeLanguageAsync(string languageCode);
    }
}