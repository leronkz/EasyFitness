using Easy.Fitness.Application;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using Easy.Fitness.DomainModels.Models.Schedule;
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
    public class ScheduleRepository : IScheduleRepository
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;
        private const int PAGE_SIZE = 7;

        public ScheduleRepository(AppDbContext context, IUserContext userContext)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }

        public async Task<PlannedActivity> SaveNewScheduleAsync(PlannedActivity plannedActivity, CancellationToken cancellationToken)
        {
            try
            {
                User user = _context.Users
                    .Include(u => u.PlannedActivities)
                    .Single(x => x.Id == _userContext.CurrentUserId);
                PlannedActivity newSchedule = new PlannedActivity(
                    plannedActivity.Date, plannedActivity.Type, plannedActivity.Note, _userContext.CurrentUserId);
                user.PlannedActivities.Add(newSchedule);
                await _context.SaveChangesAsync(cancellationToken);
                return newSchedule;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to save your schedule", ex);
            }
        }

        public async Task<IEnumerable<PlannedActivity>> GetSchedulesAsync(int page, string sortColumn, bool isDescending, string searchType, string searchDate, CancellationToken cancellationToken)
        {
            try
            {
                IQueryable<PlannedActivity> scheduleQuery = _context.Schedule
                    .Where(s => s.CreatedBy == _userContext.CurrentUserId);

                if(searchType != "All")
                {
                    scheduleQuery = scheduleQuery.Where(s => s.Type == searchType);
                }
                if(!string.IsNullOrEmpty(searchDate))
                {
                    scheduleQuery = scheduleQuery.Where(s => s.Date == searchDate);
                }
                if(isDescending)
                {
                    scheduleQuery = scheduleQuery.OrderByDescending(GetSortProperty(sortColumn));
                }
                else
                {
                    scheduleQuery = scheduleQuery.OrderBy(GetSortProperty(sortColumn));
                }

                IEnumerable<PlannedActivity> schedules = await scheduleQuery
                    .Skip((page - 1) * PAGE_SIZE)
                    .Take(PAGE_SIZE)
                    .ToListAsync(cancellationToken);
                return schedules;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your schedule", ex);
            }
        }
        
        public async Task<int> GetTotalCountAsync(CancellationToken cancellationToken)
        {
            try
            {
                return await _context.Schedule
                    .Where(s => s.CreatedBy == _userContext.CurrentUserId)
                    .CountAsync(cancellationToken);
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to count your schedules", ex);
            }
        }

        public async Task DeleteScheduleAsync(Guid scheduleId, CancellationToken cancellationToken)
        {
            try
            {
                User user = _context.Users
                    .Include(u => u.PlannedActivities)
                    .Single(u => u.Id == _userContext.CurrentUserId);
                PlannedActivity scheduleToDelete = user.PlannedActivities.First(s => s.Id == scheduleId);
                user.PlannedActivities.Remove(scheduleToDelete);
                await _context.SaveChangesAsync(cancellationToken);
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to delete your schedule", ex);
            }
        }

        public async Task<PlannedActivity> UpdateScheduleAsync(Guid scheduleId, PlannedActivity schedule, CancellationToken cancellationToken)
        {
            try
            {
                PlannedActivity scheduleToUpdate = await _context.Schedule.SingleAsync(s => s.Id == scheduleId, cancellationToken);
                scheduleToUpdate.Date = schedule.Date;
                scheduleToUpdate.Type = schedule.Type;
                scheduleToUpdate.Note = schedule.Note;
                _context.Update(scheduleToUpdate);
                await _context.SaveChangesAsync(cancellationToken);
                return scheduleToUpdate;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to update your schedule", ex);
            }
        }

        private static Expression<Func<PlannedActivity, object>> GetSortProperty(string sortColumn)
        {
            return sortColumn switch
            {
                "date" => schedule => schedule.Date,
                _ => schedule => schedule.Date
            };
        }
    }
}
