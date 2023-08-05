using Newtonsoft.Json.Converters;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Easy.Fitness.Infrastructure.Converters
{
    public static class ConvertersExtensions
    {
        public static void RegisterAllConverters(this JsonSerializerSettings settings)
        {
            if (settings.Converters == null)
            {
                settings.Converters = new List<JsonConverter>();
            }

            JsonConverter[] converters = GetConverters();

            foreach (JsonConverter item in converters)
            {
                settings.Converters.Add(item);
            }
        }

        public static JsonConverter[] GetConverters()
        {
            return new JsonConverter[]
                {
                    new StringEnumConverter(),
                    new UserIdConverter(),
                    new UnixMsDateTimeConverter()
                };
        }
    }
}
