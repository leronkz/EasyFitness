using Easy.Fitness.DomainModels.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IDietRepository
    {
        Task<Diet> SaveDietParametersAsync(Diet diet, CancellationToken cancellationToken);
    }
}
