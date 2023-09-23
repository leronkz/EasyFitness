using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Prometheus;
using Easy.Fitness.Infrastructure.Configuration;
using Easy.Fitness.Web.Bootstrappers;
using Easy.Fitness.Web.Extensions;

namespace Easy.Fitness.Web
{
    public class Startup
    {
        private readonly AppConfiguration _configuration;
        public IConfiguration Configuration { get; }
        public IWebHostEnvironment CurrentEnvironment { get; }

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            CurrentEnvironment = env;
            _configuration = ConfigurationHelper.Create<AppConfiguration>();
        }
        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<AppConfiguration>(Configuration);
            services.RegisterDependecies(_configuration);
            services.AddHttpContextAccessor();
            services.AddHttpClient();
            services.AddMemoryCache();
            services.AddAuthorization(_configuration.AuthTokenValidation, CurrentEnvironment);
            services.ConfigureApiVersioning();
            services.ConfigureRouteOptions();
            services.AddSwagger();
            services.ConfigureApiControllers();
            services.AddConfiguredMvc();
            services.AddSpa();
        }
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseMetricServer();
            app.UseHttpMetrics();
            app.UseRouting();
            app.UseAuthentication(_configuration.AuthTokenValidation);
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
            app.UseSwagger();
            app.UseSpaClientApp(env);
        }
    }
}
