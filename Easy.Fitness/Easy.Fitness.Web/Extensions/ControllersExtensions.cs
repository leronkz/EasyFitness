using Easy.Fitness.Infrastructure.Converters;
using Easy.Fitness.Web.ModelBinders;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;

namespace Easy.Fitness.Web.Extensions
{
    internal static class ControllersExtensions
    {
        public static void ConfigureApiControllers(this IServiceCollection services)
        {
            services
                .AddControllers(options =>
                {
                    options.EnableEndpointRouting = false;
                    options.ModelBinderProviders.Insert(0, new ModelBinderProvider());
                })
                .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.RegisterAllConverters();
                    options.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
                });
        }
        public static void ConfigureRouteOptions(this IServiceCollection services)
        {
            services.Configure<RouteOptions>(options => { options.LowercaseUrls = true; });
        }
    }
}
