using Easy.Fitness.Application.Dtos.Activity;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Web.Controllers.v1
{
    [ApiVersion("1")]
    [Authorize]
    [Route("api/v{version:apiVersion}")]
    public class ActivityController : Controller
    {
        private readonly IActivityService _activityService;

        public ActivityController(IActivityService activityService)
        {
            _activityService = activityService ?? throw new ArgumentNullException(nameof(activityService));
        }

        [HttpPost("activity")]
        public async Task<IActionResult> SaveNewUserActivity([FromBody] ActivityDto activity, CancellationToken cancellationToken)
        {
            try
            {
                ActivityDto result = await _activityService.SaveNewActivityAsync(activity, cancellationToken);
                return Ok(result);
            }
            catch(DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
