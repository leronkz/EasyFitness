using System;
using System.Threading;
using System.Threading.Tasks;
using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Exceptions;
using Easy.Fitness.Application.Extensions;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;

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

        public async Task<UserDto> CreateNewUserAsync(CreateUserDto newUser, CancellationToken cancellationToken)
        {
            newUser.Validate();
            User user = new User(newUser.Email, HashPassword(newUser.Password));
            await _userRepository.AddUserAsync(user, cancellationToken);
            return user.ToDto();
        }
        public async Task<string> AuthenticateUserAsync(CreateUserDto user)
        {
            User foundUser = await _userRepository.GetUserByEmailAsync(user.Email);
            if (VerifyPassword(user.Password, foundUser.Password))
            {
                _tokenProvider.SetUserCredentials(user.Email, user.Password);
                return _tokenProvider.GetAccessToken();
            }
            throw new InvalidCredentialsException();
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
