using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace Easy.Fitness.Web.Controllers.v1
{
    [ApiVersionNeutral]
    public class InfoController : Controller
    {
        [HttpGet("info")]
        public IActionResult GetInfo()
        {
            string version = Program.GetVersion();
            string[] supportedApiVersions = GetSupportedApiVersions();
            return Json(new
            {
                version,
                supportedApiVersions
            });
        }

        private string[] GetSupportedApiVersions()
        {
            List<Type> controllerTypes = GetType()
                .GetTypeInfo()
                .Assembly
                .GetTypes()
                .Where(x => typeof(Controller).IsAssignableFrom(x))
                .ToList();
            List<string> versions = controllerTypes.SelectMany(t => t.GetTypeInfo()
                        .GetCustomAttributes<ApiVersionAttribute>()
                        .SelectMany(x => x.Versions)
                        .Select(x => x.ToString()))
                     .ToList();
            return versions.Distinct().ToArray();
        }
    }
}
