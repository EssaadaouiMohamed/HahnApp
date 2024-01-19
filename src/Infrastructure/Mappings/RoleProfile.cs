using AutoMapper;
using HahnApp.Infrastructure.Models.Identity;
using HahnApp.Application.Responses.Identity;

namespace HahnApp.Infrastructure.Mappings
{
    public class RoleProfile : Profile
    {
        public RoleProfile()
        {
            CreateMap<RoleResponse, CustomRole>().ReverseMap();
        }
    }
}