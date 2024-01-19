using HahnApp.Application.Interfaces.Common;

namespace HahnApp.Application.Interfaces.Services
{
    public interface ICurrentUserService : IService
    {
        string UserId { get; }
    }
}