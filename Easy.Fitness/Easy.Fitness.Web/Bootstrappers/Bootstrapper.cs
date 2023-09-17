using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Easy.Fitness.Infrastructure;
using Easy.Fitness.Infrastructure.Configuration;
using Easy.Fitness.Application;

namespace Easy.Fitness.Web.Bootstrappers
{
    internal static class Bootstrapper
    {
        internal static void RegisterDependecies(this IServiceCollection services, AppConfiguration configuration)
        {
            SetConfiguration(services, configuration);
            RegisterServices(services);
            RegisterDatabase(services, configuration);
        }

        private static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<IUserContext, UserContext>();
        }
        private static void RegisterDatabase(IServiceCollection services, AppConfiguration configuration)
        {
            services.AddDbContext<AppDbContext>(
                options => options.UseNpgsql(configuration.PostgresDataBase.ConnectionString), ServiceLifetime.Transient);
        }
        private static void SetConfiguration(IServiceCollection services, AppConfiguration configuration)
        {
            services.AddSingleton(configuration);
            services.AddSingleton(configuration.HostConfiguration);
            services.AddSingleton(configuration.AuthTokenValidation);
        }
    }
}
