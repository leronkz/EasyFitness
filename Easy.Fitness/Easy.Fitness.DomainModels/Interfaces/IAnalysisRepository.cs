using Easy.Fitness.DomainModels.Models.Analysis;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IAnalysisRepository
    {
        Task<IEnumerable<ActivityMonth>> GetActivityCaloriesByMonthAsync(string month, string year, CancellationToken cancellationToken);
        Task<IEnumerable<ActivityYear>> GetActivityCaloriesByYearAsync(string year, CancellationToken cancellationToken);
        Task<IEnumerable<ActivityMonth>> GetActivityCaloriesByRangeAsync(string startDate, string endDate, CancellationToken cancellationToken);
        Task<IEnumerable<WeightMonth>> GetWeightByRangeAsync(string startDate, string endDate, CancellationToken cancellationToken);
        Task<IEnumerable<WeightMonth>> GetWeightByMonthAsync(string month, string year, CancellationToken cancellationToken);
        Task<IEnumerable<DietMonth>> GetCaloriesByMonthAsync(string month, string year, CancellationToken cancellationToken);
        Task<IEnumerable<DietMonth>> GetCaloriesByRangeAsync(string startDate, string endDate, CancellationToken cancellationToken);
    }
}
