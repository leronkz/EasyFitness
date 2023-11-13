using Easy.Fitness.Application.Dtos.Analysis.Activity;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Web.Controllers.v1
{
    [ApiVersion("1")]
    [Authorize]
    [Route("api/v{version:apiVersion}")]
    public class AnalysisController : Controller
    {
        private readonly IAnalysisService _analysisService;
        public AnalysisController(IAnalysisService analysisService)
        {
            _analysisService = analysisService ?? throw new ArgumentNullException(nameof(analysisService));
        }

        [HttpGet("analysis/activity/month/{month}")]
        public async Task<IActionResult> GetBurnedCaloriesByMonth()
        {
            throw new NotImplementedException();
        }

        [HttpGet("analysis/activity/year/{year}")]
        public async Task<IActionResult> GetBurnedCaloriesByYear([FromRoute] string year, CancellationToken cancellationToken)
        {
            try
            {
                IEnumerable<ActivityYearDto> result = await _analysisService.GetActivityCaloriesByYearAsync(year, cancellationToken);
                return Ok(result);
            }
            catch(DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("analysis/activity")]
        public async Task<IActionResult> GetBurnedCaloriesByRange()
        {
            throw new NotImplementedException();
        }
    }
}
