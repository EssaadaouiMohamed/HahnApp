using System;
using HahnApp.Domain.Contracts;
using Microsoft.AspNetCore.Identity;

namespace HahnApp.Infrastructure.Models.Identity
{
    public class CustomRoleClaim : IdentityRoleClaim<string>, IAuditableEntity<int>
    {
        public string Description { get; set; }
        public string Group { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public virtual CustomRole Role { get; set; }

        public CustomRoleClaim() : base()
        {
        }

        public CustomRoleClaim(string roleClaimDescription = null, string roleClaimGroup = null) : base()
        {
            Description = roleClaimDescription;
            Group = roleClaimGroup;
        }
    }
}