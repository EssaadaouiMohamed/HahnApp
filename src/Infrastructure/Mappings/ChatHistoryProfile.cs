using AutoMapper;
using HahnApp.Application.Interfaces.Chat;
using HahnApp.Application.Models.Chat;
using HahnApp.Infrastructure.Models.Identity;

namespace HahnApp.Infrastructure.Mappings
{
    public class ChatHistoryProfile : Profile
    {
        public ChatHistoryProfile()
        {
            CreateMap<ChatHistory<IChatUser>, ChatHistory<CustomUser>>().ReverseMap();
        }
    }
}