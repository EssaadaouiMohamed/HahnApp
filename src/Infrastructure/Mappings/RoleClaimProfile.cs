using AutoMapper;
using HahnApp.Application.Requests.Identity;
using HahnApp.Application.Responses.Identity;
using HahnApp.Infrastructure.Models.Identity;

namespace HahnApp.Infrastructure.Mappings
{
    public class RoleClaimProfile : Profile
    {
        public RoleClaimProfile()
        {
            CreateMap<RoleClaimResponse, CustomRoleClaim>()
                .ForMember(nameof(CustomRoleClaim.ClaimType), opt => opt.MapFrom(c => c.Type))
                .ForMember(nameof(CustomRoleClaim.ClaimValue), opt => opt.MapFrom(c => c.Value))
                .ReverseMap();

            CreateMap<RoleClaimRequest, CustomRoleClaim>()
                .ForMember(nameof(CustomRoleClaim.ClaimType), opt => opt.MapFrom(c => c.Type))
                .ForMember(nameof(CustomRoleClaim.ClaimValue), opt => opt.MapFrom(c => c.Value))
                .ReverseMap();
        }
    }
}