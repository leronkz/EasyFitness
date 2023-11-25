using Easy.Fitness.Application.Dtos.Diet;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IDietService
    {
        Task<DietPropertiesDto> SaveDietPropertiesAsync(DietPropertiesDto dietProperties, CancellationToken cancellationToken);
        Task<DietPropertiesDto> GetDietPropertiesAsync(string date, CancellationToken cancellationToken);
        Task<FoodDto> AddNewFoodToDietAsync(AddNewFoodDto newFood, CancellationToken cancellationToken);
        List<string> GetFoodNameList(string foodName);
        Task<FoodDto> UpdateFoodAsync(Guid id, UpdateFoodDto food, CancellationToken cancellationToken);
        Task DeleteFoodAsync(Guid id, string date, CancellationToken cancellationToken);
    }
}
