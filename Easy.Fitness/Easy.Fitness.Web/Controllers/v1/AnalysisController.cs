using Easy.Fitness.Application.Dtos.Analysis.Activity;
using Easy.Fitness.Application.Dtos.Analysis.Weight;
using Easy.Fitness.Application.Dtos.Criteria;
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

        [HttpGet("analysis/activity/month/{month}/year/{year}")]
        public async Task<IActionResult> GetBurnedCaloriesByMonth([FromRoute] string month, string year, CancellationToken cancellationToken)
        {
            try
            {
                IEnumerable<ActivityMonthDto> result = await _analysisService.GetActivityCaloriesByMonthAsync(month, year, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("analysis/activity/year/{year}")]
        public async Task<IActionResult> GetBurnedCaloriesByYear([FromRoute] string year, CancellationToken cancellationToken)
        {
            try
            {
                IEnumerable<ActivityYearDto> result = await _analysisService.GetActivityCaloriesByYearAsync(year, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("analysis/activity")]
        public async Task<IActionResult> GetBurnedCaloriesByRange([FromQuery] GetGraphCriteria criteria, CancellationToken cancellationToken)
        {
            try
            {
                IEnumerable<ActivityMonthDto> result = await _analysisService.GetActivityCaloriesByRangeAsync(criteria, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("analysis/weight")]
        public async Task<IActionResult> GetWeightByRange([FromQuery] GetGraphCriteria criteria, CancellationToken cancellationToken)
        {
            try
            {
                IEnumerable<WeightMonthDto> result = await _analysisService.GetWeightByRangeAsync(criteria, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("analysis/weight/month/{month}/year/{year}")]
        public async Task<IActionResult> GetWeightByMonth([FromRoute] string month, string year, CancellationToken cancellationToken)
        {
            try
            {
                IEnumerable<WeightMonthDto> result = await _analysisService.GetWeightByMonthAsync(month, year, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
