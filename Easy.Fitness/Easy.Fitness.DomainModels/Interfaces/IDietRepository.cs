using Easy.Fitness.DomainModels.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IDietRepository
    {
        Task<Diet> SaveDietParametersAsync(Diet diet, CancellationToken cancellationToken);
        Task<Diet> GetDietParametersAsync(string date, CancellationToken cancellationToken);
        Task<Food> AddNewFoodToDietAsync(Food food, string date, CancellationToken cancellationToken);
        Task<Food> UpdateFoodAsync(Guid id, string date, Food food, CancellationToken cancellationToken);
        Task DeleteFoodAsync(Guid id, string date, CancellationToken cancellationToken);
        Task<Diet> GetDietByDateAsync(string date, CancellationToken cancellationToken);
    }
}
