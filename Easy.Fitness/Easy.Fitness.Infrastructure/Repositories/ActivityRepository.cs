using Easy.Fitness.Application;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using Easy.Fitness.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Infrastructure.Repositories
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;

        public ActivityRepository(AppDbContext context, IUserContext userContext)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }


        public async Task<Activity> SaveNewActivityAsync(Activity activity, CancellationToken cancellationToken)
        {
            try
            {
                User user = _context.Users
                    .Include(u => u.Activities)
                    .Single(x => x.Id == _userContext.CurrentUserId);
                Activity newActivity = new  Activity(
                    activity.Date, activity.Type, activity.Name, activity.Calories, activity.Duration, _userContext.CurrentUserId);
                user.Activities.Add(newActivity);
                await _context.SaveChangesAsync(cancellationToken);
                return newActivity;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to save your activity", ex);
            }
        }
    }
}
