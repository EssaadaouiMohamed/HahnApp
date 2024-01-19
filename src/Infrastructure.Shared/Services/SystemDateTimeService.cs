using HahnApp.Application.Interfaces.Services;
using System;

namespace HahnApp.Infrastructure.Shared.Services
{
    public class SystemDateTimeService : IDateTimeService
    {
        public DateTime NowUtc => DateTime.UtcNow;
    }
}