using Newtonsoft.Json;

namespace Easy.Fitness.Infrastructure.WebClients.Diet.Dto
{
    public class FoodElementDto
    {
        [JsonProperty("food")]
        public FoodDto Food { get; set; }
    }
}
