using System;
using System.Collections.Generic;
using HahnApp.Domain.Contracts;
using Microsoft.AspNetCore.Identity;

namespace HahnApp.Infrastructure.Models.Identity
{
    public class CustomRole : IdentityRole, IAuditableEntity<string>
    {
        public string Description { get; set; }
        public string CreatedBy { get; set; }
        public DateTime CreatedOn { get; set; }
        public string LastModifiedBy { get; set; }
        public DateTime? LastModifiedOn { get; set; }
        public virtual ICollection<CustomRoleClaim> RoleClaims { get; set; }

        public CustomRole() : base()
        {
            RoleClaims = new HashSet<CustomRoleClaim>();
        }

        public CustomRole(string roleName, string roleDescription = null) : base(roleName)
        {
            RoleClaims = new HashSet<CustomRoleClaim>();
            Description = roleDescription;
        }
    }
}