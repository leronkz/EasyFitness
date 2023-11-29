using System.Threading;
using System.Threading.Tasks;
using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.User;
using Easy.Fitness.DomainModels.Models;
using Microsoft.AspNetCore.Http;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> CreateNewUserAsync(CreateUserDto newUser, CancellationToken cancellationToken);
        Task<string> AuthenticateUserAsync(CreateUserDto user, CancellationToken cancellationToken);
        Task<UserInfoDto> UpdateUserAsync(UserInfoDto userData, CancellationToken cancellationToken);
        Task<UserInfoDto> GetUserInfoAsync(CancellationToken cancellationToken);
        Task ChangeUserPasswordAsync(ChangePasswordDto passwordDto, CancellationToken cancellationToken);
        Task<UserParametersDto> UpdateUserParametersAsync(UserParametersDto userParametersDto, CancellationToken cancellationToken);
        Task<UserParametersDto> GetUserParametersAsync(CancellationToken cancellationToken);
        Task ChangeUserImageAsync(IFormFile image, CancellationToken cancellationToken);
        Task<UserImageDto> GetUserImageAsync(CancellationToken cancellationToken);
        Task DeleteUserImageAsync(CancellationToken cancellationToken);
        Task<UserAccountDto> GetUserPersonalInfoAsync(CancellationToken cancellationToken);
        Task<UserSummary> GetUserSummaryAsync(CancellationToken cancellationToken);
    }
}