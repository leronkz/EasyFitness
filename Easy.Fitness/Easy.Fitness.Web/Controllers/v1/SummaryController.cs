using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Models.Summary;
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
    public class SummaryController : Controller
    {
        private readonly ISummaryService _summaryService;

        public SummaryController(ISummaryService summaryService)
        {
            _summaryService = summaryService ?? throw new ArgumentNullException(nameof(summaryService));
        }

        [HttpGet("summary/{date}")]
        public async Task<IActionResult> GetSummary([FromRoute] string date, CancellationToken cancellationToken)
        {
            try
            {
                DashboardSummary result = await _summaryService.GetSummaryAsync(date, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
