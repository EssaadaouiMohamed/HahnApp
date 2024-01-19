using HahnApp.Application.Responses.Identity;
using HahnApp.Shared.Wrapper;
using System.Collections.Generic;
using System.Threading.Tasks;
using HahnApp.Application.Interfaces.Chat;
using HahnApp.Application.Models.Chat;

namespace HahnApp.Application.Interfaces.Services
{
    public interface IChatService
    {
        Task<Result<IEnumerable<ChatUserResponse>>> GetChatUsersAsync(string userId);

        Task<IResult> SaveMessageAsync(ChatHistory<IChatUser> message);

        Task<Result<IEnumerable<ChatHistoryResponse>>> GetChatHistoryAsync(string userId, string contactId);
    }
}