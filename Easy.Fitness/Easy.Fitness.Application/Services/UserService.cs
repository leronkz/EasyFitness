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
        private readonly IUserContext _userContext;

        public UserService(IUserRepository userRepository, IUserContext userContext, IUserTokenProvider tokenProvider)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }

        public async Task<UserDto> CreateNewUserAsync(CreateUserDto newUser, CancellationToken cancellationToken)
        {
            newUser.Validate();
            User user = new User(newUser.Email, HashPassword(newUser.Password));
            await _userRepository.AddUserAsync(user, cancellationToken);
            return user.ToDto();
        }

        public async Task<string> AuthenticateUserAsync(CreateUserDto user, CancellationToken cancellationToken)
        {
            User foundUser = await _userRepository.GetUserByEmailAsync(user.Email, cancellationToken);
            if (VerifyPassword(user.Password, foundUser.Password))
            {
                _tokenProvider.SetUserCredentials(foundUser.Id, user.Email, user.Password);
                return _tokenProvider.GetAccessToken();
            }
            throw new InvalidCredentialsException();
        }

        public async Task<UserInfoDto> UpdateUserAsync(UserInfoDto userData, CancellationToken cancellationToken)
        {
            userData.Validate();
            userData.Id = _userContext.CurrentUserId;
            User user = userData.ToEntity();
            User updatedUser = await _userRepository.UpdateUserAsync(user, cancellationToken);
            return updatedUser.toDto();
        }

        public async Task<UserInfoDto> GetUserInfoByIdAsync(CancellationToken cancellationToken)
        {
            User user = await _userRepository.GetUserByIdAsync(_userContext.CurrentUserId, cancellationToken);
            return user.toDto();
        }
        
        public async Task ChangeUserPasswordAsync(ChangePasswordDto passwordDto, CancellationToken cancellationToken)
        {
            passwordDto.Validate();
            User user = await _userRepository.GetUserByIdAsync(_userContext.CurrentUserId, cancellationToken);
            if(VerifyPassword(passwordDto.CurrentPassword, user.Password))
            {
                string hashedPassword = HashPassword(passwordDto.NewPassword);
                await _userRepository.UpdateUserPasswordAsync(_userContext.CurrentUserId, hashedPassword, cancellationToken);
                return;
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
