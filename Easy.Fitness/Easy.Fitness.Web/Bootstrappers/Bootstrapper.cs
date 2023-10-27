using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Easy.Fitness.Infrastructure;
using Easy.Fitness.Infrastructure.Configuration;
using Easy.Fitness.Application;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.Infrastructure.Repositories;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.Application.Services;
using Easy.Fitness.Infrastructure.Authorization;
using Easy.Fitness.Infrastructure.Storage;

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
            services.AddScoped<IFileService, FileService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserTokenProvider, UserTokenProvider>();
            services.AddScoped<IActivityRepository, ActivityRepository>();
            services.AddScoped<IActivityService, ActivityService>();
            services.AddScoped<IScheduleRepository, ScheduleRepository>();
            services.AddScoped<IScheduleService, ScheduleService>();
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
