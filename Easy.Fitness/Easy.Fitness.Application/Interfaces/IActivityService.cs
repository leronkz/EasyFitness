using Easy.Fitness.Application.Dtos.Activity;
using System.Threading;
using System.Threading.Tasks;
using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.Criteria;
using System;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IActivityService
    {
        Task<ActivityDto> SaveNewActivityAsync(ActivityDto activity, CancellationToken cancellationToken);
        Task<PageDto<ActivityDto>> GetActivityPageAsync(GetPageCriteria criteria, CancellationToken cancellationToken);
        Task DeleteActivityAsync(Guid activityId,  CancellationToken cancellationToken);
        Task<ActivityDto> UpdateActivityAsync(Guid id, ActivityDto activity, CancellationToken cancellationToken);
    }
}
