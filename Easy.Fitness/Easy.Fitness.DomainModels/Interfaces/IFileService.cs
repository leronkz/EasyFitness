using Easy.Fitness.DomainModels.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IFileService
    {
        Task SaveFileAsync(UserImage file, CancellationToken cancellationToken);
        Task<string> GetFileAsync(string fileName, CancellationToken cancellationToken);
    }
}
