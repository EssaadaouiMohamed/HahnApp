using System.Text.Json;
using HahnApp.Application.Interfaces.Serialization.Options;

namespace HahnApp.Application.Serialization.Options
{
    public class SystemTextJsonOptions : IJsonSerializerOptions
    {
        public JsonSerializerOptions JsonSerializerOptions { get; } = new();
    }
}