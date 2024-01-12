using Easy.Fitness.Application.Dtos.Diet;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Models.Summary;
using Easy.Fitness.Infrastructure.Exceptions;
using Easy.Fitness.Infrastructure.WebClients;
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
            catch (DatabaseException ex)
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
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("diet/food")]
        public async Task<IActionResult> AddFoodToDiet([FromBody] AddNewFoodDto newFood, CancellationToken cancellationToken)
        {
            try
            {
                FoodDto result = await _dietService.AddNewFoodToDietAsync(newFood, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (ResponseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("diet/food")]
        public IActionResult GetAutocompleteFoodNameList([FromQuery] string foodName)
        {
            try
            {
                List<string> result = _dietService.GetFoodNameList(foodName);
                return Ok(result);
            }
            catch (ResponseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("diet/food/{id}")]
        public async Task<IActionResult> UpdateFood(
            [FromRoute] Guid id,
            [FromBody] UpdateFoodDto food,
            CancellationToken cancellationToken)
        {
            try
            {
                FoodDto result = await _dietService.UpdateFoodAsync(id, food, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("diet/food/{id}")]
        public async Task<IActionResult> DeleteFood([FromRoute] Guid id, [FromQuery] string date, CancellationToken cancellationToken)
        {
            try
            {
                await _dietService.DeleteFoodAsync(id, date, cancellationToken);
                return Ok();
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("diet/{date}")]
        public async Task<IActionResult> GetDietByDate([FromRoute] string date, CancellationToken cancellationToken)
        {
            try
            {
                DietDto result = await _dietService.GetDietByDateAsync(date, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("diet/{date}/summary")]
        public async Task<IActionResult> GetDietSummaryByDate([FromRoute] string date, CancellationToken cancellationToken)
        {
            try
            {
                DietSummary result = await _dietService.GetDietSummaryByDateAsync(date, cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
