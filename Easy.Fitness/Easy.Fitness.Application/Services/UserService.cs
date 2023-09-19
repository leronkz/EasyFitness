using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using System;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserTokenProvider _tokenProvider;
        public UserService(IUserRepository userRepository, IUserContext userContext, IUserTokenProvider tokenProvider)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
        }

        public async Task<UserDto> CreateNewUserAsync(CreateUserDto newUser)
        {
            User user = new User(newUser.Email, HashPassword(newUser.Password));
            await _userRepository.AddUserAsync(user);

            UserDto createdUser = new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Password = user.Password
            };
            return createdUser;
        }
        public async Task<string> AuthenticateUserAsync(CreateUserDto user)
        {
            User foundUser = await _userRepository.GetUserByEmailAsync(user.Email);
            if (VerifyPassword(user.Password, foundUser.Password))
            {
                _tokenProvider.SetUserCredentials(user.Email, user.Password);
                return _tokenProvider.GetAccessToken();
            }
            return null;
        }

        private string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        private bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
