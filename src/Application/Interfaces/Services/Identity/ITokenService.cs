using HahnApp.Application.Interfaces.Common;
using HahnApp.Application.Requests.Identity;
using HahnApp.Application.Responses.Identity;
using HahnApp.Shared.Wrapper;
using System.Threading.Tasks;

namespace HahnApp.Application.Interfaces.Services.Identity
{
    public interface ITokenService : IService
    {
        Task<Result<TokenResponse>> LoginAsync(TokenRequest model);

        Task<Result<TokenResponse>> GetRefreshTokenAsync(RefreshTokenRequest model);
    }
}