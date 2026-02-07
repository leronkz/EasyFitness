using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.Criteria;
using Easy.Fitness.Application.Dtos.Schedule;
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
    public class ScheduleController : Controller
    {
        private readonly IScheduleService _scheduleService;

        public ScheduleController(IScheduleService scheduleService)
        {
            _scheduleService = scheduleService ?? throw new ArgumentNullException(nameof(scheduleService));
        }

        [HttpPost("schedule")]
        public async Task<IActionResult> SaveNewSchedule([FromBody] ScheduleDto schedule, CancellationToken cancellationToken)
        {
            try
            {
                ScheduleDto result = await _scheduleService.SaveNewScheduleAsync(schedule, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("schedule")]
        public async Task<IActionResult> GetSchedulePage([FromQuery] GetPageCriteria criteria, CancellationToken cancellationToken)
        {
            try
            {
                PageDto<ScheduleDto> result = await _scheduleService.GetSchedulePageAsync(criteria, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("schedule/{id}")]
        public async Task<IActionResult> DeleteSchedule([FromRoute] Guid id, CancellationToken cancellationToken)
        {
            try
            {
                await _scheduleService.DeleteScheduleAsync(id, cancellationToken);
                return Ok();
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("schedule/{id}")]
        public async Task<IActionResult> UpdateSchedule([FromRoute] Guid id, [FromBody] ScheduleDto schedule, CancellationToken cancellationToken)
        {
            try
            {
                ScheduleDto result = await _scheduleService.UpdateScheduleAsync(id, schedule, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
