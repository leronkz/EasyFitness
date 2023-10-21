using Easy.Fitness.Application.Dtos.Activity;
using Easy.Fitness.Application.Extensions;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.Criteria;

namespace Easy.Fitness.Application.Services
{
    public class ActivityService : IActivityService
    {
        private readonly IActivityRepository _activityRepository;
        private const int PAGE_SIZE = 7;
        
        public ActivityService(IActivityRepository activityRepository)
        {
            _activityRepository = activityRepository ?? throw new ArgumentNullException(nameof(activityRepository));
        }

        public async Task<ActivityDto> SaveNewActivityAsync(ActivityDto activity, CancellationToken cancellationToken)
        {
            Activity newActivity = activity.ToEntity();
            Activity result = await _activityRepository.SaveNewActivityAsync(newActivity, cancellationToken);

            return result.ToDto();
        }
        
        public async Task<PageDto<ActivityDto>> GetActivityPageAsync(GetActivityPageCriteria criteria, CancellationToken cancellationToken)
        {
            IEnumerable<Activity> result = await _activityRepository.GetActivitiesAsync(criteria.Page,
                criteria.SortColumn, criteria.IsDescending, cancellationToken);
            int totalCount = await _activityRepository.GetTotalCountAsync(cancellationToken);
            PageDto<ActivityDto> activitiesPage = new PageDto<ActivityDto>
            {
                Items = result.Select(a => a.ToDto()).ToList(),
                Page = criteria.Page,
                PageSize = PAGE_SIZE,
                TotalCount = totalCount
            };
            return activitiesPage;
        }

        public async Task DeleteActivityAsync(Guid activityId, CancellationToken cancellationToken)
        {
            await _activityRepository.DeleteActivityAsync(activityId, cancellationToken);
        }
    }
}
