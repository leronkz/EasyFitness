using Easy.Fitness.DomainModels.Models;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IActivityRepository
    {
        Task<Activity> SaveNewActivityAsync(Activity activity, CancellationToken cancellationToken);
    }
}
