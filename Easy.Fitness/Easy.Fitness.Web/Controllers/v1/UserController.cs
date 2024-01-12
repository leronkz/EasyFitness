using System;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Exceptions;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.Infrastructure.Exceptions;
using Easy.Fitness.Infrastructure.Authorization;
using Easy.Fitness.Application.Dtos.User;
using Microsoft.AspNetCore.Http;
using Easy.Fitness.DomainModels.Models.Summary;

namespace Easy.Fitness.Web.Controllers.v1
{
    [ApiVersion("1")]
    [Authorize]
    [Route("api/v{version:apiVersion}")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService ?? throw new ArgumentNullException(nameof(userService));
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto newUser, CancellationToken cancellationToken)
        {
            try
            {
                UserDto result = await _userService.CreateNewUserAsync(newUser, cancellationToken);
                return Ok(result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (UserExistsException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> AuthenticateUser([FromBody] CreateUserDto user, CancellationToken cancellationToken)
        {
            try
            {
                string accessToken = await _userService.AuthenticateUserAsync(user, cancellationToken);
                return Ok(new AccessTokenDto
                {
                    AccessToken = accessToken
                });
            }
            catch (NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidCredentialsException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("user")]
        public async Task<IActionResult> UpdateUser([FromBody] UserInfoDto userData, CancellationToken cancellationToken)
        {
            try
            {
                UserInfoDto updatedUser = await _userService.UpdateUserAsync(userData, cancellationToken);
                return Ok(updatedUser);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("user/password")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto passwordDto, CancellationToken cancellationToken)
        {
            try
            {
                await _userService.ChangeUserPasswordAsync(passwordDto, cancellationToken);
                return Ok();
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (InvalidCredentialsException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost("user/parameters")]
        public async Task<IActionResult> SaveUserParameters([FromBody] UserParametersDto userParameters, CancellationToken cancellationToken)
        {
            try
            {
                UserParametersDto result = await _userService.UpdateUserParametersAsync(userParameters, cancellationToken);
                return Ok(result);
            }
            catch (ValidationException ex)
            {
                return BadRequest(ex.Errors);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("user/image")]
        public async Task<IActionResult> ChangeUserProfilePicture([FromBody] IFormFile image, CancellationToken cancellationToken)
        {
            try
            {
                await _userService.ChangeUserImageAsync(image, cancellationToken);
                return Ok();
            }
            catch (StorageException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("user/image")]
        public async Task<IActionResult> DeleteUserImage(CancellationToken cancellationToken)
        {
            try
            {
                await _userService.DeleteUserImageAsync(cancellationToken);
                return Ok();
            }
            catch (StorageException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user")]
        public async Task<IActionResult> GetUserInfo(CancellationToken cancellationToken)
        {
            try
            {
                UserInfoDto result = await _userService.GetUserInfoAsync(cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user/parameters")]
        public async Task<IActionResult> GetUserParameters(CancellationToken cancellationToken)
        {
            try
            {
                UserParametersDto result = await _userService.GetLatestUserParametersAsync(cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user/image")]
        public async Task<IActionResult> GetUserImage(CancellationToken cancellationToken)
        {
            try
            {
                UserImageDto result = await _userService.GetUserImageAsync(cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (StorageException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user/account")]
        public async Task<IActionResult> GetUserPersonalInfo(CancellationToken cancellationToken)
        {
            try
            {
                UserAccountDto result = await _userService.GetUserPersonalInfoAsync(cancellationToken);
                return Ok(result);
            }
            catch (DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("user/summary")]
        public async Task<IActionResult> GetUserSummary(CancellationToken cancellationToken)
        {
            try
            {
                UserSummary result = await _userService.GetUserSummaryAsync(cancellationToken);
                return Ok(result);
            }
            catch(DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
