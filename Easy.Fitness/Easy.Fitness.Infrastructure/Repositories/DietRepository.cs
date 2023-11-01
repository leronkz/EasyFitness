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
                Diet newDiet = new Diet(diet.Date, diet.Calories, diet.Fat, diet.Carbs, diet.Protein, _userContext.CurrentUserId);
                user.Diets.Add(newDiet);
                await _context.SaveChangesAsync(cancellationToken);
                return newDiet;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to save your today's diet properties", ex);
            }
        }
    }
}
