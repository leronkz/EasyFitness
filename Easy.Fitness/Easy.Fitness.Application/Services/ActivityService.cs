using Easy.Fitness.Application.Dtos.Activity;
using Easy.Fitness.Application.Extensions;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Services
{
    public class ActivityService : IActivityService
    {
        private readonly IActivityRepository _activityRepository;

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
    }
}
