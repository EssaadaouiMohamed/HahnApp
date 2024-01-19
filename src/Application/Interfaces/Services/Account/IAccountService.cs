using HahnApp.Application.Interfaces.Common;
using HahnApp.Application.Requests.Identity;
using HahnApp.Shared.Wrapper;
using System.Threading.Tasks;

namespace HahnApp.Application.Interfaces.Services.Account
{
    public interface IAccountService : IService
    {
        Task<IResult> UpdateProfileAsync(UpdateProfileRequest model, string userId);

        Task<IResult> ChangePasswordAsync(ChangePasswordRequest model, string userId);

        Task<IResult<string>> GetProfilePictureAsync(string userId);

        Task<IResult<string>> UpdateProfilePictureAsync(UpdateProfilePictureRequest request, string userId);
    }
}