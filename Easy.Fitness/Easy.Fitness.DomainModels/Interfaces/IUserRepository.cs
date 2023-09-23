using System.Threading;
using System.Threading.Tasks;
using Easy.Fitness.DomainModels.Models;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AddUserAsync(User user, CancellationToken cancellationToken);
        Task<User> GetUserByEmailAsync(string email);
    }
}
