using HahnApp.Domain.Contracts;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using HahnApp.Application.Interfaces.Chat;
using HahnApp.Application.Models.Chat;

namespace HahnApp.Infrastructure.Models.Identity
{
    public class CustomUser : IdentityUser<string>, IChatUser, IAuditableEntity<string>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }
        public string CreatedBy { get; set; }

        [Column(TypeName = "text")]
        public string ProfilePictureDataUrl { get; set; }

        public DateTime CreatedOn { get; set; }

        public string LastModifiedBy { get; set; }

        public DateTime? LastModifiedOn { get; set; }

        public bool IsDeleted { get; set; }

        public DateTime? DeletedOn { get; set; }
        public bool IsActive { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public virtual ICollection<ChatHistory<CustomUser>> ChatHistoryFromUsers { get; set; }
        public virtual ICollection<ChatHistory<CustomUser>> ChatHistoryToUsers { get; set; }

        public CustomUser()
        {
            ChatHistoryFromUsers = new HashSet<ChatHistory<CustomUser>>();
            ChatHistoryToUsers = new HashSet<ChatHistory<CustomUser>>();
        }
    }
}