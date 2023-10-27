using Easy.Fitness.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IScheduleRepository
    {
        Task<PlannedActivity> SaveNewScheduleAsync(PlannedActivity plannedActivity, CancellationToken cancellationToken);
        Task<IEnumerable<PlannedActivity>> GetSchedulesAsync(int page, string sortColumn, bool isDescending, string searchType, string searchDate, CancellationToken cancellationToken);
        Task<int> GetTotalCountAsync(CancellationToken cancellationToken);
        Task DeleteScheduleAsync(Guid scheduleId, CancellationToken cancellationToken);
        Task<PlannedActivity> UpdateScheduleAsync(Guid scheduleId, PlannedActivity schedule, CancellationToken cancellationToken);
    }
}
