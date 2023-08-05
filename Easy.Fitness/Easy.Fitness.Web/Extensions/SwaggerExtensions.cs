using Easy.Fitness.DomainModels.Ids;
using Easy.Fitness.Infrastructure.Configuration;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Primitives;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Easy.Fitness.Web.Extensions
{
    internal static class SwaggerExtensions
    {
        public static void AddSwagger(this IServiceCollection services)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "EasyFitness API v1", Version = "v1" });
                c.DocInclusionPredicate((docName, apiDesc) =>
                {
                    var versions = new List<ApiVersion>();
                    if (apiDesc.ActionDescriptor is Microsoft.AspNetCore.Mvc.Controllers.ControllerActionDescriptor
                       controller)
                    {
                        if (controller.ControllerTypeInfo.GetCustomAttributes()
                            .OfType<ApiVersionNeutralAttribute>().Any())
                        {
                            return true;
                        }

                        versions = controller.ControllerTypeInfo.GetCustomAttributes()
                            .OfType<ApiVersionAttribute>()
                            .SelectMany(attr => attr.Versions)
                            .ToList();
                    }
                    return versions.Any(v => $"v{v.MajorVersion}" == docName);
                });
                LoadDocumentation(c);
                AddCustomMappings(c);
            });
            services.ConfigureSwaggerGen(options =>
            {
                options.AddJwtBearerSecurityDefinition();
            });
        }
        private static void LoadDocumentation(SwaggerGenOptions options)
        {
            string outputDit = Path.GetDirectoryName(typeof(Startup).GetTypeInfo().Assembly.Location);
            List<string> files = Directory.GetFiles(outputDit, "RM.Services*.xml").ToList();
            files.ForEach(x => options.IncludeXmlComments(x));
        }
        public static void UseSwagger(this IApplicationBuilder app)
        {
            app.UseSwagger(c =>
            {
                c.PreSerializeFilters.Add(SetBasePath);
                c.RouteTemplate = "swagger/{documentName}/swagger.json";
            });
            app.UseSwaggerUI(c =>
            {
                c.RoutePrefix = $"swagger";
                c.SwaggerEndpoint("v1/swagger.json", "Easy.Fitness API v1");
            });
        }
        public static void AddJwtBearerSecurityDefinition(this SwaggerGenOptions options)
        {
            options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
            {
                In = ParameterLocation.Header,
                Description = "Please insert JWT with Bearer into field. Format \"Bearer your-api-token\"",
                Name = "Authorization",
                Type = SecuritySchemeType.ApiKey
            });
        }
        private static void AddCustomMappings(SwaggerGenOptions c)
        {
            c.MapAsGuid<UserId>();
            c.MapAsNumber<DateTime>("Date as UnixTimeMilliseconds");
            c.MapAsNumber<DateTime?>("Date as UnixTimeMilliseconds or null");
        }
        private static void MapAsGuid<T>(this SwaggerGenOptions options)
        {
            options.MapType<T>(() => new OpenApiSchema { Type = "string", Format = "uuid" });
        }

        private static void MapAsNumber<T>(this SwaggerGenOptions options, string description = null)
        {
            options.MapType<T>(() => new OpenApiSchema { Type = "number", Description = description });
        }
        private static void SetBasePath(OpenApiDocument swaggerDoc, Microsoft.AspNetCore.Http.HttpRequest req)
        {
            if (req.Headers.TryGetValue("X-Original-URI", out StringValues values))
            {
                string originalURI = values[0];
                int indexOfSwagger = originalURI.IndexOf("/swagger/", StringComparison.Ordinal);
                if (indexOfSwagger > 0)
                {
                    string basePath = originalURI.Substring(0, indexOfSwagger);
                    swaggerDoc.Servers = new List<OpenApiServer>
                    {
                        new OpenApiServer { Url = basePath }
                    };
                }
            }
        }
    }
}
