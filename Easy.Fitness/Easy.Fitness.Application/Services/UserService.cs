using System;
using System.Threading;
using System.Threading.Tasks;
using Easy.Fitness.Application.Calculators;
using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.User;
using Easy.Fitness.Application.Exceptions;
using Easy.Fitness.Application.Extensions;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using Microsoft.AspNetCore.Http;

namespace Easy.Fitness.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IUserTokenProvider _tokenProvider;
        private readonly IUserContext _userContext;
        private readonly IFileService _fileService;

        public UserService(
            IUserRepository userRepository, 
            IUserContext userContext, 
            IUserTokenProvider tokenProvider,
            IFileService fileService)
        {
            _userRepository = userRepository ?? throw new ArgumentNullException(nameof(userRepository));
            _tokenProvider = tokenProvider ?? throw new ArgumentNullException(nameof(tokenProvider));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
            _fileService = fileService ?? throw new ArgumentNullException(nameof(fileService));
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

        public async Task<UserInfoDto> GetUserInfoAsync(CancellationToken cancellationToken)
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
        public async Task<UserParametersDto> UpdateUserParametersAsync(UserParametersDto userParametersDto, CancellationToken cancellationToken)
        {
            userParametersDto.Validate();
            UserParameters parameters = new UserParameters(userParametersDto.Weight, userParametersDto.Height, _userContext.CurrentUserId);
            UserParameters result = await _userRepository.SaveUserParametersAsync(_userContext.CurrentUserId, parameters, cancellationToken);
            return result.ToDto();
        }

        public async Task ChangeUserImageAsync(IFormFile image, CancellationToken cancellationToken)
        {
            string fileName = await _userRepository.GetUserImageAsync(_userContext.CurrentUserId, cancellationToken);
            if (!string.IsNullOrEmpty(fileName))
            {
                await _fileService.RemoveFileAsync(fileName, cancellationToken);
            }
            string hashedFileName = FileNameCalculator.Calculate(image.FileName);
            UserImage userImage = new UserImage
            (
                image.OpenReadStream(),
                hashedFileName,
                image.Length
            );
            await _userRepository.SaveUserImageAsync(_userContext.CurrentUserId, hashedFileName, cancellationToken);
            await _fileService.SaveFileAsync(userImage, cancellationToken);
        }
        public async Task<UserParametersDto> GetLatestUserParametersAsync(CancellationToken cancellationToken)
        {
            UserParameters parameters = await _userRepository.GetLatestUserParametersByIdAsync(_userContext.CurrentUserId, cancellationToken);
            return parameters.ToDto();
        }

        public async Task<UserImageDto> GetUserImageAsync(CancellationToken cancellationToken)
        {
            string fileName = await _userRepository.GetUserImageAsync(_userContext.CurrentUserId, cancellationToken);
            string userImage = await _fileService.GetFileAsync(fileName, cancellationToken);
            return new UserImageDto
            {
                FileBytes = userImage
            };
        }

        public async Task DeleteUserImageAsync(CancellationToken cancellationToken)
        {
            string fileName = await _userRepository.GetUserImageAsync(_userContext.CurrentUserId, cancellationToken);
            await _fileService.RemoveFileAsync(fileName, cancellationToken);
            await _userRepository.DeleteUserImageAsync(_userContext.CurrentUserId, cancellationToken);
        }

        public async Task<UserAccountDto> GetUserPersonalInfoAsync(CancellationToken cancellationToken)
        {
            User user = await _userRepository.GetUserByIdAsync(_userContext.CurrentUserId, cancellationToken);
            return new UserAccountDto
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                BirthDate = user.BirthDate
            };
        }

        private static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }
        private static bool VerifyPassword(string password, string hashedPassword)
        {
            return BCrypt.Net.BCrypt.Verify(password, hashedPassword);
        }
    }
}
