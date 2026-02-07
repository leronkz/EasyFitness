using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Easy.Fitness.Application;
using Easy.Fitness.DomainModels.Ids;

namespace Easy.Fitness.Infrastructure
{
    public class UserContext : IUserContext
    {
        private readonly ClaimsPrincipal _user;

        public UserId CurrentUserId
        {
            get
            {
                string id = GetIdFromClaims();
                return UserId.Parse(id);
            }
        }

        public UserContext(IHttpContextAccessor httpContext)
        {
            if (httpContext.HttpContext != null)
            {
                _user = httpContext.HttpContext.User;
            }
        }

        public string GetIdFromClaims()
        {
            return _user.FindFirst(ClaimTypes.NameIdentifier).Value;
        }
    }
}
