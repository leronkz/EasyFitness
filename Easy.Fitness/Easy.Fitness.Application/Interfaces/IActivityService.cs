using Easy.Fitness.Application.Dtos.Activity;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IActivityService
    {
        Task<ActivityDto> SaveNewActivityAsync(ActivityDto activity, CancellationToken cancellationToken);
    }
}
