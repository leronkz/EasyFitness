using Easy.Fitness.DomainModels.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IAnalysisRepository
    {
        Task<IEnumerable<ActivityMonth>> GetActivityCaloriesByMonthAsync(string month, CancellationToken cancellationToken);
        Task<IEnumerable<ActivityYear>> GetActivityCaloriesByYearAsync(string year, CancellationToken cancellationToken);
        Task<IEnumerable<ActivityMonth>> GetActivityCaloriesByRangeAsync(string startDate, string endDate, CancellationToken cancellationToken);
        Task<IEnumerable<WeightMonth>> GetWeightByRangeAsync(string startDate, string endEndDate, CancellationToken cancellationToken);
        Task<IEnumerable<WeightMonth>> GetWeightByMonthAsync(string month, CancellationToken cancellationToken);
    }
}
