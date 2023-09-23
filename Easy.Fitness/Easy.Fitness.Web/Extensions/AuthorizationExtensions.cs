using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Builder;
using Easy.Fitness.Infrastructure.Configuration;

namespace Easy.Fitness.Web.Extensions
{
    internal static class AuthorizationExtensions
    {
        public static void AddAuthorization(this IServiceCollection services, AuthConfiguration auth, IWebHostEnvironment env)
        {
            bool requireHttpsMetadata = true;
            if(env.IsDevelopment())
            {
                requireHttpsMetadata = false;
            }

            services
                .AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(option =>
                {
                    option.RequireHttpsMetadata = requireHttpsMetadata;
                    option.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = false,
                        ValidateIssuerSigningKey = true,
                        ValidAudience = auth.Audience,
                        ValidIssuer = auth.Issuer,
                        IssuerSigningKey = new SymmetricSecurityKey(
                            Encoding.UTF8.GetBytes(auth.Key)),
                    };
                });
        }
        public static void UseAuthentication(this IApplicationBuilder app, AuthConfiguration auth)
        {
            app.UseAuthentication();
            app.UseAuthorization();
        }
    }
}
