using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Easy.Fitness.Web.Extensions
{
    internal static class ApiVersioningExtensions
    {
        public static void ConfigureApiVersioning(this IServiceCollection services)
        {
            services.AddApiVersioning(c =>
            {
                c.ReportApiVersions = true;
                c.DefaultApiVersion = new ApiVersion(1, 0);
                c.AssumeDefaultVersionWhenUnspecified = true;
                c.UseApiBehavior = false;
            });
        }
    }
}
