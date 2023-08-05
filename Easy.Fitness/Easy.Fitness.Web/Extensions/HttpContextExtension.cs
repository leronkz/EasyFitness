using Microsoft.AspNetCore.Http;

namespace Easy.Fitness.Web.Extensions
{
    public static class HttpContextExtension
    {
        public static bool IsApiRequest(this HttpContext context) => context.Request.IsApiRequest();
        public static bool IsApiRequest(this HttpRequest request) => request.Path.StartsWithSegments("/api");
    }
}
