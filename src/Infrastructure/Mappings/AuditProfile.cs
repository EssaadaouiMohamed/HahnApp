using AutoMapper;
using HahnApp.Infrastructure.Models.Audit;
using HahnApp.Application.Responses.Audit;

namespace HahnApp.Infrastructure.Mappings
{
    public class AuditProfile : Profile
    {
        public AuditProfile()
        {
            CreateMap<AuditResponse, Audit>().ReverseMap();
        }
    }
}