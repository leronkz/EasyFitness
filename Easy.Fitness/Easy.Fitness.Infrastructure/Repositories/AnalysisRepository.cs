using Easy.Fitness.Application;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using Easy.Fitness.Infrastructure.Exceptions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Infrastructure.Repositories
{
    public class AnalysisRepository : IAnalysisRepository
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;

        public AnalysisRepository(AppDbContext context, IUserContext userContext)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }

        public async Task<IEnumerable<ActivityDay>> GetActivityCaloriesByMonthAsync(string month, CancellationToken cancellationToken)
        {
            try
            {
                User user = await _context.Users.Include(u => u.Activities).Where(u => u.Id == _userContext.CurrentUserId).FirstAsync(cancellationToken);
                List<DateTime> allDaysInMonth = Enumerable.Range(1, DateTime.DaysInMonth(DateTime.Now.Year, DateTime.ParseExact(month, "MM", CultureInfo.CurrentCulture).Month))
                                                        .Select(day => new DateTime(DateTime.Now.Year, DateTime.ParseExact(month, "MM", CultureInfo.CurrentCulture).Month, day))
                                                        .ToList();

                List<Activity> activities = user.Activities.Where(a => GetMonth(a.Date) == month).OrderBy(a => a.Date).ToList();

                List<ActivityDay> result = allDaysInMonth.Select(day =>
                {
                    var matchingActivity = activities.FirstOrDefault(a => GetMonth(a.Date) == month && DateTime.ParseExact(a.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture).Date == day.Date);
                    return new ActivityDay(day.ToShortDateString(), matchingActivity != null ? matchingActivity.Calories : 0);
                }).ToList();

                return result;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your graph", ex);
            }
        }

        public async Task<IEnumerable<ActivityYear>> GetActivityCaloriesByYearAsync(string year, CancellationToken cancellationToken)
        {
            try
            {
                User user = await _context.Users.Include(u => u.Activities).Where(u => u.Id == _userContext.CurrentUserId).FirstAsync(cancellationToken);
                List<Activity> activities = user.Activities.Where(a => a.Date.StartsWith(year)).ToList();
                List<ActivityYear> result = new List<ActivityYear>();

                for (int i = 1; i <= 12; i++)
                {
                    double calories = 0;
                    foreach (Activity activity in activities)
                    {
                        DateTime date = DateTime.ParseExact(activity.Date, "yyyy-MM-dd", null);
                        if (date.Month == i)
                        {
                            calories += activity.Calories;
                        }
                    }

                    result.Add(new ActivityYear
                    (
                        CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i),
                        calories
                    ));
                }
                return result;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your graph", ex);
            }
        }

        private static string GetMonth(string date)
        {
            string[] result = date.Split('-');
            return result[1];
        }
    }
}
