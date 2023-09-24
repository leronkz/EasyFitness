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
            catch(ValidationException ex)
            {
                return BadRequest(ex.Errors);
            }
            catch(DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(UserExistsException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> AuthenticateUser([FromBody]CreateUserDto user, CancellationToken cancellationToken)
        {
            try
            {
                string accessToken = await _userService.AuthenticateUserAsync(user, cancellationToken);
                return Ok(new AccessTokenDto
                {
                    AccessToken = accessToken
                });
            }
            catch(NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(InvalidCredentialsException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("user")]
        public async Task<IActionResult> UpdateUser([FromBody]UserInfoDto userData, CancellationToken cancellationToken)
        {
            try
            {
                UserInfoDto updatedUser = await _userService.UpdateUserAsync(userData, cancellationToken);
                return Ok(updatedUser);
            }
            catch(ValidationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(NoUserFoundException ex)
            {
                return BadRequest(ex.Message);
            }
        }
        [HttpGet("user")]
        public async Task<IActionResult> GetUserInfo(CancellationToken cancellationToken)
        {
            try
            {
                UserInfoDto result = await _userService.GetUserInfoByIdAsync(cancellationToken);
                return Ok(result);
            }
            catch(DatabaseException ex)
            {
                return BadRequest(ex.Message);
            }
            catch(Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
