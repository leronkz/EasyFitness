using Newtonsoft.Json;

namespace Easy.Fitness.Infrastructure.WebClients.Diet.Dto
{
    public class FoodDto
    {
        [JsonProperty("foodId")]
        public string FoodId { get; set; }
        [JsonProperty("nutrients")]
        public NutrientsDto Nutrients { get; set; }
        [JsonProperty("label")]
        public string Label { get; set; }
    }
}
