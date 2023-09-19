using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

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
        public async Task<IActionResult> CreateUserAsync([FromBody]CreateUserDto newUser)
        {
            UserDto result = await _userService.CreateNewUserAsync(newUser);
            return Ok(result);
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> AuthenticateUserAsync([FromBody]CreateUserDto user)
        {
            string accessToken = await _userService.AuthenticateUserAsync(user);
            return Ok(accessToken);
        }
    }
}
