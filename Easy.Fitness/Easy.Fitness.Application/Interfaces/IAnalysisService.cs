using Easy.Fitness.Application.Dtos.Analysis.Activity;
using Easy.Fitness.Application.Dtos.Analysis.Weight;
using Easy.Fitness.Application.Dtos.Criteria;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IAnalysisService
    {
        Task<IEnumerable<ActivityMonthDto>> GetActivityCaloriesByMonthAsync(string month, CancellationToken cancellationToken);
        Task<IEnumerable<ActivityYearDto>> GetActivityCaloriesByYearAsync(string year, CancellationToken cancellationToken);
        Task<IEnumerable<ActivityMonthDto>> GetActivityCaloriesByRangeAsync(GetGraphCriteria criteria, CancellationToken cancellationToken);
        Task<IEnumerable<WeightMonthDto>> GetWeightByRangeAsync(GetGraphCriteria criteria, CancellationToken cancellationToken);
        Task<IEnumerable<WeightMonthDto>> GetWeightByMonthAsync(string month, CancellationToken cancellationToken);
    }
}
