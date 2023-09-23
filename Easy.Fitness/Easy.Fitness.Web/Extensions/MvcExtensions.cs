using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;

namespace Easy.Fitness.Web.Extensions
{
    internal static class MvcExtensions
    {
        public static JsonConverter[] Converters => new JsonConverter[]
        {
            new StringEnumConverter(new CamelCaseNamingStrategy(), allowIntegerValues: true),
        };

        public static void AddConfiguredMvc(this IServiceCollection services)
        {
            services
                .Configure<RouteOptions>(options => { options.LowercaseUrls = true; })
                .AddControllers(options => { options.EnableEndpointRouting = false; })
                .AddNewtonsoftJson(options =>
                {
                    foreach (JsonConverter item in Converters)
                    {
                        options.SerializerSettings.Converters.Add(item);
                    }

                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                    JsonConvert.DefaultSettings = () => new JsonSerializerSettings
                    {
                        ContractResolver = new CamelCasePropertyNamesContractResolver()
                    };
                });
        }
    }
}
