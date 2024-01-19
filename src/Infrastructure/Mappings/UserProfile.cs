using AutoMapper;
using HahnApp.Infrastructure.Models.Identity;
using HahnApp.Application.Responses.Identity;

namespace HahnApp.Infrastructure.Mappings
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserResponse, CustomUser>().ReverseMap();
            CreateMap<ChatUserResponse, CustomUser>().ReverseMap()
                .ForMember(dest => dest.EmailAddress, source => source.MapFrom(source => source.Email)); //Specific Mapping
        }
    }
}