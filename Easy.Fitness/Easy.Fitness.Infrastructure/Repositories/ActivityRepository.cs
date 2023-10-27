using Easy.Fitness.Application;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using Easy.Fitness.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Infrastructure.Repositories
{
    public class ActivityRepository : IActivityRepository
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;
        private const int PAGE_SIZE = 7;
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
                Activity newActivity = new Activity(
                    activity.Date, activity.Type, activity.Name, activity.Calories, activity.Duration, _userContext.CurrentUserId);
                user.Activities.Add(newActivity);
                await _context.SaveChangesAsync(cancellationToken);
                return newActivity;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to save your activity", ex);
            }
        }
        public async Task<IEnumerable<Activity>> GetActivitiesAsync(int page, string sortColumn, bool isDescending, string searchType, CancellationToken cancellationToken)
        {
            try
            {
                IQueryable<Activity> activityQuery = _context.Activities
                    .Where(a => a.CreatedBy == _userContext.CurrentUserId);

                if (searchType != "All")
                {
                    activityQuery = activityQuery.Where(a => a.Type == searchType);
                }
                if (isDescending)
                {
                    activityQuery = activityQuery.OrderByDescending(GetSortProperty(sortColumn));
                }
                else
                {
                    activityQuery = activityQuery.OrderBy(GetSortProperty(sortColumn));
                }

                IEnumerable<Activity> activities = await activityQuery
                    .Skip((page - 1) * PAGE_SIZE)
                    .Take(PAGE_SIZE)
                    .ToListAsync(cancellationToken);
                return activities;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your activities", ex);
            }
        }

        public async Task<int> GetTotalCountAsync(CancellationToken cancellationToken)
        {
            try
            {
                return await _context.Activities
                    .Where(a => a.CreatedBy == _userContext.CurrentUserId)
                    .CountAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to count your activities", ex);
            }
        }

        public async Task DeleteActivityAsync(Guid activityId, CancellationToken cancellationToken)
        {
            try
            {
                User user = _context.Users
                    .Include(u => u.Activities)
                    .Single(u => u.Id == _userContext.CurrentUserId);
                Activity activityToDelete = user.Activities.First(a => a.Id == activityId);
                user.Activities.Remove(activityToDelete);
                await _context.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to delete your activity", ex);
            }
        }

        public async Task<Activity> UpdateActivityAsync(Guid id, Activity activity, CancellationToken cancellationToken)
        {
            try
            {
                Activity activityToUpdate = await _context.Activities.SingleAsync(x => x.Id == id, cancellationToken);
                activityToUpdate.Date = activity.Date;
                activityToUpdate.Type = activity.Type;
                activityToUpdate.Name = activity.Name;
                activityToUpdate.Duration = activity.Duration;
                activityToUpdate.Calories = activity.Calories;
                _context.Update(activityToUpdate);
                await _context.SaveChangesAsync(cancellationToken);
                return activityToUpdate;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to update your activity", ex);
            }
        }

        private static Expression<Func<Activity, object>> GetSortProperty(string sortColumn)
        {
            return sortColumn switch
            {
                "date" => activity => activity.Date,
                "duration" => activity => activity.Duration,
                "calories" => activity => activity.Calories,
                _ => activity => activity.Date
            };
        }
    }
}
