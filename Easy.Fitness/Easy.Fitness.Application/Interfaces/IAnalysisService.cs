using Easy.Fitness.Application.Dtos.Analysis.Activity;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IAnalysisService
    {
        Task<IEnumerable<ActivityYearDto>> GetActivityCaloriesByYearAsync(string year, CancellationToken cancellationToken);
    }
}
