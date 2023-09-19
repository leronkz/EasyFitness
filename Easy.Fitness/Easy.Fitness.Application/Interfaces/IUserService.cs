using Easy.Fitness.Application.Dtos;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserDto> CreateNewUserAsync(CreateUserDto newUser);
        Task<string> AuthenticateUserAsync(CreateUserDto user);
    }
}
