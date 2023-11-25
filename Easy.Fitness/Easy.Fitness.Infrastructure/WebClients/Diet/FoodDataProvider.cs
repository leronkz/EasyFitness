using Easy.Fitness.Application;
using Easy.Fitness.DomainModels.Models;
using Easy.Fitness.Infrastructure.Configuration;
using System.Collections.Generic;
using System.Net.Http;

namespace Easy.Fitness.Infrastructure.WebClients.Diet
{
    public class FoodDataProvider : IFoodDataProvider
    {
        private readonly DietWebClient _dietWebClient;

        public FoodDataProvider(FoodDatabaseConfig config, HttpClient httpClient)
        {
            _dietWebClient = new DietWebClient(config, httpClient);
        }

        public FoodDetails GetFoodDetails(string foodName)
        {
            return _dietWebClient.GetNewFoodDetails(foodName);
        }

        public List<string> GetFoodNameHints(string foodName)
        {
            return _dietWebClient.GetFoodNameHints(foodName);
        }
    }
}
