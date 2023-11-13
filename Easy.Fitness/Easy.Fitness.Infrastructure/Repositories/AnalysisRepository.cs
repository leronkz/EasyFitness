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
                    foreach (var activity in activities)
                    {
                        DateTime date = DateTime.ParseExact(activity.Date, "yyyy-MM-dd", null);
                        if (date.Month == i)
                        {
                            calories += activity.Calories;
                        }
                    }

                    result.Add(new ActivityYear
                    {
                        Month = CultureInfo.CurrentCulture.DateTimeFormat.GetMonthName(i),
                        Calories = calories
                    });
                }
                return result;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your graph", ex);
            }
        }
    }
}
