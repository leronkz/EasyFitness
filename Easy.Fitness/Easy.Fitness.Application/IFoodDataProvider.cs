using Easy.Fitness.DomainModels.Models.Diet;
using System.Collections.Generic;

namespace Easy.Fitness.Application
{
    public interface IFoodDataProvider
    {
        FoodDetails GetFoodDetails(string foodName);
        List<string> GetFoodNameHints(string foodName);
    }
}
