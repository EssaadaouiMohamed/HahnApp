using System.Threading.Tasks;
using HahnApp.Server.Managers.Preferences;
using HahnApp.Shared.Constants.Permission;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace HahnApp.Server.Controllers.Utilities
{
    [Route("api/[controller]")]
    [ApiController]
    public class PreferencesController : ControllerBase
    {
        private readonly ServerPreferenceManager _serverPreferenceManager;

        public PreferencesController(ServerPreferenceManager serverPreferenceManager)
        {
            _serverPreferenceManager = serverPreferenceManager;
        }

    }
}