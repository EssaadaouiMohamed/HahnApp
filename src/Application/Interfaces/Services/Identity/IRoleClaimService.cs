using System.Collections.Generic;
using System.Threading.Tasks;
using HahnApp.Application.Interfaces.Common;
using HahnApp.Application.Requests.Identity;
using HahnApp.Application.Responses.Identity;
using HahnApp.Shared.Wrapper;

namespace HahnApp.Application.Interfaces.Services.Identity
{
    public interface IRoleClaimService : IService
    {
        Task<Result<List<RoleClaimResponse>>> GetAllAsync();

        Task<int> GetCountAsync();

        Task<Result<RoleClaimResponse>> GetByIdAsync(int id);

        Task<Result<List<RoleClaimResponse>>> GetAllByRoleIdAsync(string roleId);

        Task<Result<string>> SaveAsync(RoleClaimRequest request);

        Task<Result<string>> DeleteAsync(int id);
    }
}