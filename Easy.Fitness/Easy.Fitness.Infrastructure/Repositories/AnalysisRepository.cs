using Easy.Fitness.Application;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using Easy.Fitness.DomainModels.Models.Analysis;
using Easy.Fitness.DomainModels.Models.Diet;
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

        public async Task<IEnumerable<ActivityMonth>> GetActivityCaloriesByMonthAsync(string month, string year, CancellationToken cancellationToken)
        {
            try
            {
                User user = await _context.Users.Include(u => u.Activities).Where(u => u.Id == _userContext.CurrentUserId).FirstAsync(cancellationToken);
                List<DateTime> allDaysInMonth = Enumerable.Range(1, DateTime.DaysInMonth(int.Parse(year), DateTime.ParseExact(month, "MM", CultureInfo.CurrentCulture).Month))
                                                        .Select(day => new DateTime(int.Parse(year), DateTime.ParseExact(month, "MM", CultureInfo.CurrentCulture).Month, day))
                                                        .ToList();
                List<Activity> activities = user.Activities.Where(a => GetMonth(a.Date) == month && GetYear(a.Date) == year)
                                                        .OrderBy(a => DateTime.ParseExact(a.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture))
                                                        .ToList();
                Dictionary<DateTime, double> caloriesByDay = new Dictionary<DateTime, double>();

                foreach (Activity activity in activities)
                {
                    DateTime activityDate = DateTime.ParseExact(activity.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture).Date;

                    if (caloriesByDay.ContainsKey(activityDate))
                    {
                        caloriesByDay[activityDate] += activity.Calories;
                    }
                    else
                    {
                        caloriesByDay[activityDate] = activity.Calories;
                    }
                }
                List<ActivityMonth> result = allDaysInMonth.Select(day =>
                {
                    double calories = caloriesByDay.ContainsKey(day) ? caloriesByDay[day] : 0;
                    return new ActivityMonth(day.ToShortDateString(), calories);
                }).ToList();

                return result;
            }
            catch (Exception ex)
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
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your graph", ex);
            }
        }
        public async Task<IEnumerable<ActivityMonth>> GetActivityCaloriesByRangeAsync(string startDate, string endDate, CancellationToken cancellationToken)
        {
            try
            {
                User user = await _context.Users.Include(u => u.Activities).Where(u => u.Id == _userContext.CurrentUserId).FirstAsync(cancellationToken);
                List<Activity> activities = user.Activities.Where(a => IsDateValid(a.Date, startDate, endDate))
                    .OrderBy(a => DateTime.ParseExact(a.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture))
                    .ToList();
                Dictionary<DateTime, double> caloriesByDay = new Dictionary<DateTime, double>();

                foreach (Activity activity in activities)
                {
                    DateTime activityDate = DateTime.ParseExact(activity.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture).Date;

                    if (caloriesByDay.ContainsKey(activityDate))
                    {
                        caloriesByDay[activityDate] += activity.Calories;
                    }
                    else
                    {
                        caloriesByDay[activityDate] = activity.Calories;
                    }
                }
                List<ActivityMonth> result = caloriesByDay.Select(a => new ActivityMonth(a.Key.ToShortDateString(), a.Value))
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your graph", ex);
            }
        }

        public async Task<IEnumerable<WeightMonth>> GetWeightByRangeAsync(string startDate, string endDate, CancellationToken cancellationToken)
        {
            try
            {
                User user = await _context.Users.Include(u => u.Parameters).Where(u => u.Id == _userContext.CurrentUserId).FirstAsync(cancellationToken);
                List<UserParameters> parameters = user.Parameters.Where(p => IsDateValid(p.CreatedOn, startDate, endDate))
                     .OrderBy(p => p.CreatedOn)
                     .ToList();
                Dictionary<DateTime, double> weightByDay = new Dictionary<DateTime, double>();
                foreach (UserParameters parameter in parameters)
                {
                    weightByDay[parameter.CreatedOn] = parameter.Weight;
                }
                List<WeightMonth> result = weightByDay.Select(w => new WeightMonth(w.Key.ToShortDateString(), w.Value))
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your graph", ex);
            }
        }

        public async Task<IEnumerable<WeightMonth>> GetWeightByMonthAsync(string month, string year, CancellationToken cancellationToken)
        {
            try
            {
                User user = await _context.Users.Include(u => u.Parameters).Where(u => u.Id == _userContext.CurrentUserId).FirstAsync(cancellationToken);
                List<DateTime> allDaysInMonth = Enumerable.Range(1, DateTime.DaysInMonth(int.Parse(year), DateTime.ParseExact(month, "MM", CultureInfo.CurrentCulture).Month))
                                                       .Select(day => new DateTime(int.Parse(year), DateTime.ParseExact(month, "MM", CultureInfo.CurrentCulture).Month, day))
                                                       .ToList();
                List<UserParameters> parameters = user.Parameters.Where(p => p.CreatedOn.Month.ToString() == month && p.CreatedOn.Year.ToString() == year)
                     .OrderBy(p => p.CreatedOn)
                     .ToList();
                Dictionary<DateTime, double> weightByDay = new Dictionary<DateTime, double>();
                foreach (UserParameters parameter in parameters)
                {
                    weightByDay[parameter.CreatedOn.Date] = parameter.Weight;
                }
                List<WeightMonth> result = allDaysInMonth.Select(day =>
                {
                    double weight = weightByDay.ContainsKey(day) ? weightByDay[day] : 0;
                    return new WeightMonth(day.ToShortDateString(), weight);
                }).ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your graph", ex);
            }
        }

        public async Task<IEnumerable<DietMonth>> GetCaloriesByMonthAsync(string month, string year, CancellationToken cancellationToken)
        {
            try
            {
                User user = await _context.Users.Include(u => u.Diets).Where(u => u.Id == _userContext.CurrentUserId).FirstAsync(cancellationToken);
                List<DateTime> allDaysInMonth = Enumerable.Range(1, DateTime.DaysInMonth(int.Parse(year), DateTime.ParseExact(month, "MM", CultureInfo.CurrentCulture).Month))
                                                      .Select(day => new DateTime(int.Parse(year), DateTime.ParseExact(month, "MM", CultureInfo.CurrentCulture).Month, day))
                                                      .ToList();
                List<Diet> diets = user.Diets.Where(p => p.CreatedOn.Month.ToString() == month && p.CreatedOn.Year.ToString() == year)
                    .OrderBy(p => p.CreatedOn)
                    .ToList();
                Dictionary<DateTime, double> caloriesByDay = new Dictionary<DateTime, double>();
                foreach (Diet diet in diets)
                {
                    caloriesByDay[diet.CreatedOn.Date] = diet.Calories;
                }
                List<DietMonth> result = allDaysInMonth.Select(day =>
                {
                    double calories = caloriesByDay.ContainsKey(day) ? caloriesByDay[day] : 0;
                    return new DietMonth(day.ToShortDateString(), calories);
                }).ToList();

                return result;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your graph", ex);
            }
        }

        public async Task<IEnumerable<DietMonth>> GetCaloriesByRangeAsync(string startDate, string endDate, CancellationToken cancellationToken)
        {
            try
            {
                User user = await _context.Users.Include(u => u.Diets).Where(u => u.Id == _userContext.CurrentUserId).FirstAsync(cancellationToken);
                List<Diet> diets = user.Diets.Where(p => IsDateValid(p.Date, startDate, endDate))
                     .OrderBy(d => DateTime.ParseExact(d.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture))
                     .ToList();
                Dictionary<DateTime, double> caloriesByDay = new Dictionary<DateTime, double>();
                foreach (Diet diet in diets)
                {
                    DateTime dietDate = DateTime.ParseExact(diet.Date, "yyyy-MM-dd", CultureInfo.InvariantCulture).Date;
                    caloriesByDay[dietDate] = diet.Calories;
                }
                List<DietMonth> result = caloriesByDay.Select(w => new DietMonth(w.Key.ToShortDateString(), w.Value))
                    .ToList();
                return result;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your graph", ex);
            }
        }

        private static string GetMonth(string date)
        {
            string[] result = date.Split('-');
            return result[1];
        }

        private static string GetYear(string date)
        {
            string[] result = date.Split('-');
            return result[0];
        }

        private static bool IsDateValid(string date, string startDate, string endDate)
        {
            DateTime formattedDate = DateTime.ParseExact(date, "yyyy-MM-dd", null);
            DateTime formattedStart = DateTime.ParseExact(startDate, "yyyy-MM-dd", null);
            DateTime formattedEnd = DateTime.ParseExact(endDate, "yyyy-MM-dd", null);
            if (formattedDate >= formattedStart && formattedDate <= formattedEnd)
            {
                return true;
            }
            return false;
        }

        private static bool IsDateValid(DateTime date, string startDate, string endDate)
        {
            DateTime formattedStart = DateTime.ParseExact(startDate, "yyyy-MM-dd", null);
            DateTime formattedEnd = DateTime.ParseExact(endDate, "yyyy-MM-dd", null);
            if (date.Date >= formattedStart && date <= formattedEnd)
            {
                return true;
            }
            return false;
        }
    }
}
