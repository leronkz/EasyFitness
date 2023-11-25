using Newtonsoft.Json;

namespace Easy.Fitness.Infrastructure.Configuration
{
    public class FoodDatabaseConfig
    {
        [JsonRequired]
        public string ParserApiAddress { get; set; }

        [JsonRequired]
        public string AutocompleteApiAddress { get; set; }

        [JsonRequired]
        public string ApplicationId { get; set; }

        [JsonRequired]
        public string ApplicationKeys { get; set; }
    }
}
