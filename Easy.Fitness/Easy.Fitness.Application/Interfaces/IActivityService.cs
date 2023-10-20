using Easy.Fitness.Application.Dtos.Activity;
using System.Threading;
using System.Threading.Tasks;
using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.Criteria;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IActivityService
    {
        Task<ActivityDto> SaveNewActivityAsync(ActivityDto activity, CancellationToken cancellationToken);
        Task<PageDto<ActivityDto>> GetActivityPageAsync(GetActivityPageCriteria criteria,
            CancellationToken cancellationToken);
    }
}
