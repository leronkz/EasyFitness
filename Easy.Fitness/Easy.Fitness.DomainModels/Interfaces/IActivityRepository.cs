using System.Collections.Generic;
using Easy.Fitness.DomainModels.Models;
using System.Threading;
using System.Threading.Tasks;
using System;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IActivityRepository
    {
        Task<Activity> SaveNewActivityAsync(Activity activity, CancellationToken cancellationToken);
        Task<IEnumerable<Activity>> GetActivitiesAsync(int page, string sortColumn, bool isDescending, string searchType, CancellationToken cancellationToken);
        Task<int> GetTotalCountAsync(CancellationToken cancellationToken);
        Task DeleteActivityAsync(Guid id,  CancellationToken cancellationToken);
        Task<Activity> UpdateActivityAsync(Guid id, Activity activity, CancellationToken cancellationToken);
    }
}
