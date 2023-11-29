using Newtonsoft.Json;

namespace Easy.Fitness.Infrastructure.WebClients.Diet.Dto
{
    public class NutrientsDto
    {
        [JsonProperty("ENERC_KCAL")]
        public double Calories { get; set; }
        [JsonProperty("PROCNT")]
        public double Protein { get; set; }
        [JsonProperty("FAT")]
        public double Fat { get; set; }
        [JsonProperty("CHOCDF")]
        public double Carbs { get; set; }
    }
}
