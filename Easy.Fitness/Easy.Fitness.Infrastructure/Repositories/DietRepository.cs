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
    public class DietRepository : IDietRepository
    {
        private readonly AppDbContext _context;
        private readonly IUserContext _userContext;

        public DietRepository(AppDbContext context, IUserContext userContext)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _userContext = userContext ?? throw new ArgumentNullException(nameof(userContext));
        }

        public async Task<Diet> SaveDietParametersAsync(Diet diet, CancellationToken cancellationToken)
        {
            try
            {
                User user = _context.Users
                    .Include(u => u.Diets)
                    .Single(x => x.Id == _userContext.CurrentUserId);
                Diet resultDiet;
                if (user.Diets.Any(d => d.Date == diet.Date))
                {
                    Diet updateDiet = user.Diets.Where(d => d.Date == diet.Date).First();
                    updateDiet.Calories = diet.Calories;
                    updateDiet.Fat = diet.Fat;
                    updateDiet.Carbs = diet.Carbs;
                    updateDiet.Protein = diet.Protein;
                    _context.Update(updateDiet);
                    resultDiet = updateDiet;
                }
                else
                {
                    Diet newDiet = new Diet(diet.Date, diet.Calories, diet.Fat, diet.Carbs, diet.Protein, _userContext.CurrentUserId);
                    user.Diets.Add(newDiet);
                    resultDiet = newDiet;
                }
                await _context.SaveChangesAsync(cancellationToken);
                return resultDiet;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to save your today's diet properties", ex);
            }
        }

        public async Task<Diet> GetDietParametersAsync(string date, CancellationToken cancellationToken)
        {
            try
            {
                Diet diet = await _context.Diet
                    .Where(d => d.Date == date)
                    .SingleAsync(d => d.UserId == _userContext.CurrentUserId, cancellationToken);
                return diet;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your today's diet properties", ex);
            }
        }
    }
}
