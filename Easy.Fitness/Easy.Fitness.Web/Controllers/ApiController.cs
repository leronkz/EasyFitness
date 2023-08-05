using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Easy.Fitness.Web.Controllers
{
    [ApiVersion("1.0", Deprecated = false), Route("api/v{version:apiVersion}")]
    [AllowAnonymous]
    [ApiController]
    public class ApiController : ControllerBase
    {
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok();
        }
    }
}
