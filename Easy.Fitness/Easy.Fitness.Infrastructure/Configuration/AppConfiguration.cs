using Newtonsoft.Json;

namespace Easy.Fitness.Infrastructure.Configuration
{
    public class AppConfiguration
    {
        [JsonRequired]
        public HostConfiguration HostConfiguration { get; set; }

        [JsonRequired]
        public DataBaseConfig PostgresDataBase { get; set; }

        [JsonRequired]
        public AuthConfiguration AuthTokenValidation { get; set; }

        [JsonRequired]
        public StorageConfig Storage { get; set; }

        [JsonRequired]
        public FoodDatabaseConfig FoodDatabaseApi { get; set; }
    }
}
