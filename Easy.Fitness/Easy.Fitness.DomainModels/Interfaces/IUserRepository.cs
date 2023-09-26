using System;
using System.Threading;
using System.Threading.Tasks;
using Easy.Fitness.DomainModels.Models;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IUserRepository
    {
        Task<User> AddUserAsync(User user, CancellationToken cancellationToken);
        Task<User> GetUserByEmailAsync(string email, CancellationToken cancellationToken);
        Task<User> UpdateUserAsync(User user, CancellationToken cancellationToken);
        Task<User> GetUserByIdAsync(Guid id, CancellationToken cancellationToken);
        Task UpdateUserPasswordAsync(Guid id, string newPassword, CancellationToken cancellationToken);
        Task<UserParameters> UpdateUserParametersAsync(Guid id, UserParameters parameters, CancellationToken cancellationToken);
    }
}
