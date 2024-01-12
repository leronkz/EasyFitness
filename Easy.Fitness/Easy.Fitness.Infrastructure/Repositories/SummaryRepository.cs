using Easy.Fitness.Application;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using Easy.Fitness.DomainModels.Models.Diet;
using Easy.Fitness.DomainModels.Models.Schedule;
using Easy.Fitness.DomainModels.Models.Summary;
using Easy.Fitness.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Infrastructure.Repositories
{
    public class SummaryRepository : ISummaryRepository
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;

        public SummaryRepository(AppDbContext context, IUserContext userContext)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }

        public async Task<DashboardSummary> GetSummaryAsync(string date, CancellationToken cancellationToken)
        {
            try
            {
                DashboardSummary summary = new DashboardSummary();
                DietSummary dietSummary = await GetDietSummaryAsync(date, cancellationToken);
                Activity latestActivity = await GetLatestActivityAsync(cancellationToken);
                PlannedActivity latestPlannedActivity = await GetLatestPlannedActivityAsync(cancellationToken);

                summary.DietSummary = dietSummary;
                summary.ActivityDate = latestActivity.Date;
                summary.ActivityType = latestActivity.Type;
                summary.ScheduleType = latestPlannedActivity.Type;
                summary.ScheduleDate = latestPlannedActivity.Date;

                return summary;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your dashboard summary", ex);
            }
        }

        private async Task<DietSummary> GetDietSummaryAsync(string date, CancellationToken cancellationToken)
        {
            Diet diet = await _context.Diet
                .Include(d => d.Properties)
                .Where(d => d.Date == date && d.UserId == _userContext.CurrentUserId)
                .SingleOrDefaultAsync(cancellationToken);

            if (diet == null)
            {
                return new DietSummary
                {
                    CurrentCalories = 0,
                    MaxCalories = 0,
                    CurrentFat = 0,
                    MaxFat = 0,
                    CurrentCarbs = 0,
                    MaxCarbs = 0,
                    CurrentProtein = 0,
                    MaxProtein = 0
                };
            }

            DietSummary summary = new DietSummary
            {
                CurrentCalories = diet.Calories,
                MaxCalories = diet.Properties.Calories,
                CurrentFat = diet.Fat,
                MaxFat = diet.Properties.Fat,
                CurrentCarbs = diet.Carbs,
                MaxCarbs = diet.Properties.Carbs,
                CurrentProtein = diet.Protein,
                MaxProtein = diet.Properties.Protein
            };
            return summary;
        }
        private async Task<Activity> GetLatestActivityAsync(CancellationToken cancellationToken)
        {
            return await _context.Activities
                                          .Where(a => a.CreatedBy == _userContext.CurrentUserId)
                                          .OrderByDescending(a => a.Date)
                                          .FirstOrDefaultAsync(cancellationToken);
        }
        private async Task<PlannedActivity> GetLatestPlannedActivityAsync(CancellationToken cancellationToken)
        {
            return await _context.Schedule
                                          .Where(a => a.CreatedBy == _userContext.CurrentUserId)
                                          .OrderBy(a => a.Date)
                                          .FirstOrDefaultAsync(cancellationToken);
        }
    }
}
