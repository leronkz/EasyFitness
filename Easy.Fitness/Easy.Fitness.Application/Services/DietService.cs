using Easy.Fitness.Application.Dtos.Diet;
using Easy.Fitness.Application.Extensions;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Services
{
    public class DietService : IDietService
    {
        private readonly IDietRepository _dietRepository;
        private readonly IFoodDataProvider _foodProvider;

        public DietService(IDietRepository dietRepository, IFoodDataProvider foodProvider)
        {
            _dietRepository = dietRepository ?? throw new ArgumentNullException(nameof(dietRepository));
            _foodProvider = foodProvider ?? throw new ArgumentNullException(nameof(foodProvider));
        }

        public async Task<DietPropertiesDto> SaveDietPropertiesAsync(DietPropertiesDto dietProperties, CancellationToken cancellationToken)
        {
            DietProperties newDietProperties = dietProperties.ToEntity();
            DietProperties result = await _dietRepository.SaveDietParametersAsync(newDietProperties, cancellationToken);
            return result.ToDto();
        }

        public async Task<DietPropertiesDto> GetDietPropertiesAsync(string date, CancellationToken cancellationToken)
        {
            DietProperties dietProperties = await _dietRepository.GetDietParametersAsync(date, cancellationToken);
            return dietProperties.ToDto();
        }

        public async Task<FoodDto> AddNewFoodToDietAsync(AddNewFoodDto newFood, CancellationToken cancellationToken)
        {
            FoodDetailsDto foodDetails = GetFoodDetails(newFood.Name);
            FoodDto foodDto = new FoodDto
            {
                Name = foodDetails.Name,
                Calories = foodDetails.Calories,
                Fat = foodDetails.Fat,
                Carbs = foodDetails.Carbs,
                Protein = foodDetails.Protein,
                Type = newFood.Type,
                Weight = newFood.Weight
            };
            double by = newFood.Weight / foodDetails.Weight;

            Food food = foodDto.ToEntity(by);

            Food result = await _dietRepository.AddNewFoodToDietAsync(food, newFood.Date, cancellationToken);
            return result.ToDto();
        }

        public List<string> GetFoodNameList(string foodName)
        {
            return GetFoodNameHints(foodName);
        }

        public async Task<FoodDto> UpdateFoodAsync(Guid id, UpdateFoodDto food, CancellationToken cancellationToken)
        {
            FoodDetailsDto foodDetails = GetFoodDetails(food.Name);
            FoodDto foodDto = new FoodDto
            {
                Name = foodDetails.Name,
                Calories = foodDetails.Calories,
                Fat = foodDetails.Fat,
                Carbs = foodDetails.Carbs,
                Protein = foodDetails.Protein,
                Type = food.Type,
                Weight = food.Weight
            };

            double by = food.Weight / foodDetails.Weight;

            Food updateFood = foodDto.ToEntity(by);
            Food result = await _dietRepository.UpdateFoodAsync(id, food.Date, updateFood, cancellationToken);
            return result.ToDto();
        }

        public async Task DeleteFoodAsync(Guid id, string date, CancellationToken cancellationToken)
        {
            await _dietRepository.DeleteFoodAsync(id, date, cancellationToken);
        }

        public async Task<DietDto> GetDietByDateAsync(string date, CancellationToken cancellationToken)
        {
            Diet diet = await _dietRepository.GetDietByDateAsync(date, cancellationToken);
            return diet.toDto();
        }

        private FoodDetailsDto GetFoodDetails(string foodName)
        {
            FoodDetails foodDetails = _foodProvider.GetFoodDetails(foodName);
            return foodDetails.ToDto();
        }

        private List<string> GetFoodNameHints(string foodName)
        {
            List<string> foodNameHints = _foodProvider.GetFoodNameHints(foodName);
            return foodNameHints;
        }
    }
}