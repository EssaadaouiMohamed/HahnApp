﻿
using HahnApp.Application.Interfaces.Serialization.Settings;
using Newtonsoft.Json;

namespace HahnApp.Application.Serialization.Settings
{
    public class NewtonsoftJsonSettings : IJsonSerializerSettings
    {
        public JsonSerializerSettings JsonSerializerSettings { get; } = new();
    }
}