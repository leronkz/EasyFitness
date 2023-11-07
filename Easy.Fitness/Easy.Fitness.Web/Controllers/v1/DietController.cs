using Easy.Fitness.Application.Dtos.Diet;
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
    public class DietController : Controller
    {
        private readonly IDietService _dietService;
        
        public DietController(IDietService dietService)
        {
            _dietService = dietService ?? throw new ArgumentNullException(nameof(dietService));
        }

        [HttpPost("diet/properties")]
        public async Task<IActionResult> SaveDietProperties([FromBody] DietPropertiesDto dietProperties, CancellationToken cancellationToken)
        {
            try
            {
                DietPropertiesDto result = await _dietService.SaveDietPropertiesAsync(dietProperties, cancellationToken);
                return Ok(result);
            }
            catch(DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("diet/properties/{date}")]
        public async Task<IActionResult> GetDietProperties([FromRoute] string date, CancellationToken cancellationToken)
        {
            try
            {
                DietPropertiesDto result = await _dietService.GetDietPropertiesAsync(date, cancellationToken);
                return Ok(result);
            }
            catch(DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
