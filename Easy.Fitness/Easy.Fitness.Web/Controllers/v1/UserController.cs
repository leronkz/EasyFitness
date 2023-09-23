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
        public async Task<IActionResult> CreateUserAsync([FromBody] CreateUserDto newUser, CancellationToken cancellationToken)
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
        public async Task<IActionResult> AuthenticateUserAsync([FromBody]CreateUserDto user)
        {
            try
            {
                string accessToken = await _userService.AuthenticateUserAsync(user);
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
    }
}
