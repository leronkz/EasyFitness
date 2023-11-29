using Newtonsoft.Json;
using System.Collections.Generic;

namespace Easy.Fitness.Infrastructure.WebClients.Diet.Dto
{
    public class ParsedFoodTable
    {
        [JsonProperty("text")]
        public string Text { get; set; }
        [JsonProperty("parsed")]
        public List<FoodElementDto> Foods { get; set; }
    }
}
