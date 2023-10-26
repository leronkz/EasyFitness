using Easy.Fitness.DomainModels.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IScheduleRepository
    {
        Task<PlannedActivity> SaveNewScheduleAsync(PlannedActivity plannedActivity, CancellationToken cancellationToken);
        Task<IEnumerable<PlannedActivity>> GetSchedulesAsync(int page, string sortColumn, bool isDescending, string searchType, CancellationToken cancellationToken);
        Task<int> GetTotalCountAsync(CancellationToken cancellationToken);
    }
}
