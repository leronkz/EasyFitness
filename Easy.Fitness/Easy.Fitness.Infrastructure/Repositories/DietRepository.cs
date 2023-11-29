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

        public async Task<DietProperties> SaveDietParametersAsync(DietProperties diet, CancellationToken cancellationToken)
        {
            try
            {
                User user = _context.Users
                    .Include(u => u.Diets)
                    .ThenInclude(d => d.Properties)
                    .Single(x => x.Id == _userContext.CurrentUserId);
                DietProperties resultProperties;
                if (user.Diets.Any(d => d.Date == diet.Date))
                {
                    Diet updateDiet = user.Diets.Where(d => d.Date == diet.Date).First();
                    if (updateDiet.Properties != null)
                    {
                        updateDiet.Properties.Calories = diet.Calories;
                        updateDiet.Properties.Fat = diet.Fat;
                        updateDiet.Properties.Carbs = diet.Carbs;
                        updateDiet.Properties.Protein = diet.Protein;
                    }
                    else
                    {
                        DietProperties dietProperties = new DietProperties(diet.Date, diet.Calories, diet.Fat, diet.Carbs, diet.Protein, _userContext.CurrentUserId);
                        updateDiet.Properties = dietProperties;
                    }
                    _context.Update(updateDiet);
                    resultProperties = updateDiet.Properties;
                }
                else
                {
                    Diet newDiet = new Diet(diet.Date, 0, 0, 0, 0, _userContext.CurrentUserId);
                    user.Diets.Add(newDiet);
                    DietProperties dietProperties = new DietProperties(diet.Date, diet.Calories, diet.Fat, diet.Carbs, diet.Protein, _userContext.CurrentUserId);
                    newDiet.Properties = dietProperties;
                    resultProperties = newDiet.Properties;
                }
                await _context.SaveChangesAsync(cancellationToken);
                return resultProperties;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to save your today's diet properties", ex);
            }
        }

        public async Task<DietProperties> GetDietParametersAsync(string date, CancellationToken cancellationToken)
        {
            try
            {
                DietProperties dietProperties = await _context.DietProperties
                    .Where(d => d.Date == date)
                    .SingleOrDefaultAsync(d => d.Diet.UserId == _userContext.CurrentUserId, cancellationToken);
                return dietProperties;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your today's diet properties", ex);
            }
        }

        public async Task<Food> AddNewFoodToDietAsync(Food food, string date, CancellationToken cancellationToken)
        {
            try
            {
                User user = _context.Users
                    .Include(u => u.Diets)
                    .Single(x => x.Id == _userContext.CurrentUserId);
                Diet diet = user.Diets.Where(d => d.Date == date).FirstOrDefault();
                Food newFood =
                   new Food(food.Name, food.Calories, food.Fat, food.Carbs, food.Protein, food.Weight, food.Type, _userContext.CurrentUserId);
                if (diet == null)
                {
                    diet = new Diet(date, newFood.Calories, newFood.Fat, newFood.Carbs, newFood.Protein, _userContext.CurrentUserId);
                    user.Diets.Add(diet);
                }
                else
                {
                    diet.Calories += newFood.Calories;
                    diet.Fat += newFood.Fat;
                    diet.Protein += newFood.Protein;
                    diet.Carbs += newFood.Carbs;
                    _context.Update(diet);
                }
                diet.Foods.Add(newFood);
                await _context.SaveChangesAsync(cancellationToken);
                return newFood;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to save your food", ex);
            }
        }

        public async Task<Food> UpdateFoodAsync(Guid id, string date, Food food, CancellationToken cancellationToken)
        {
            try
            {
                User user = _context.Users
                   .Include(u => u.Diets)
                   .Single(u => u.Id == _userContext.CurrentUserId);

                Diet diet = user.Diets.First(d => d.Date == date);

                Food foodToUpdate = await _context.Food.SingleAsync(x => x.Id == id, cancellationToken);

                diet.Calories -= foodToUpdate.Calories;
                diet.Fat -= foodToUpdate.Fat;
                diet.Protein -= foodToUpdate.Protein;
                diet.Carbs -= foodToUpdate.Carbs;

                foodToUpdate.Name = food.Name;
                foodToUpdate.Calories = food.Calories;
                foodToUpdate.Fat = food.Fat;
                foodToUpdate.Protein = food.Protein;
                foodToUpdate.Carbs = food.Carbs;
                foodToUpdate.Type = food.Type;
                foodToUpdate.Weight = food.Weight;
                _context.Update(foodToUpdate);


                diet.Calories += foodToUpdate.Calories;
                diet.Fat += foodToUpdate.Fat;
                diet.Carbs += foodToUpdate.Carbs;
                diet.Protein += foodToUpdate.Protein;
                _context.Update(diet);

                await _context.SaveChangesAsync(cancellationToken);
                return foodToUpdate;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to update your food", ex);
            }
        }

        public async Task DeleteFoodAsync(Guid id, string date, CancellationToken cancellationToken)
        {
            try
            {
                User user = _context.Users
                    .Include(u => u.Diets)
                    .ThenInclude(d => d.Foods)
                    .Single(u => u.Id == _userContext.CurrentUserId);
                Diet diet = user.Diets.First(d => d.Date == date);
                Food foodToDelete = diet.Foods.First(f => f.Id == id);

                diet.Calories -= foodToDelete.Calories;
                diet.Fat -= foodToDelete.Fat;
                diet.Protein -= foodToDelete.Protein;
                diet.Carbs -= foodToDelete.Carbs;

                diet.Foods.Remove(foodToDelete);
                _context.Update(diet);
                await _context.SaveChangesAsync(cancellationToken);
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to delete your food", ex);
            }
        }

        public async Task<Diet> GetDietByDateAsync(string date, CancellationToken cancellationToken)
        {
            try
            {
                Diet diet = await _context.Diet
                    .Include(d => d.Foods)
                    .Where(d => d.Date == date && d.UserId == _userContext.CurrentUserId)
                    .SingleOrDefaultAsync(cancellationToken);
                return diet;
            }
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your day", ex);
            }
        }

        public async Task<DietSummary> GetDietSummaryByDateAsync(string date, CancellationToken cancellationToken)
        {
            try
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
            catch (Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your diet summary", ex);
            }
        }
    }
}
