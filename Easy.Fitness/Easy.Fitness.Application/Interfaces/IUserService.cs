using System.Threading;
using System.Threading.Tasks;
using Easy.Fitness.Application.Dtos;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> CreateNewUserAsync(CreateUserDto newUser, CancellationToken cancellationToken);
        Task<string> AuthenticateUserAsync(CreateUserDto user);
    }
}
