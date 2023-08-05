using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;

namespace Easy.Fitness.Web.Extensions
{
    public static class SpaExtension
    {
        public static void AddSpa(this IServiceCollection services)
        {
            // In production, the React files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
        }

        public static void UseSpaClientApp(this IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.MapWhen((context) => !context.IsApiRequest(), builder => UseReactSpa(env, builder));
        }

        private static void UseReactSpa(IWebHostEnvironment env, IApplicationBuilder builder)
        {
            builder.UseSpaStaticFiles();
            builder.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
            });
        }
    }
}
