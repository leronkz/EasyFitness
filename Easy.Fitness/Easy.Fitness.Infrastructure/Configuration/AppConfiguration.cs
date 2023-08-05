using Newtonsoft.Json;

namespace Easy.Fitness.Infrastructure.Configuration
{
    public class AppConfiguration
    {
        [JsonRequired]
        public HostConfiguration HostConfiguration { get; set; }

        [JsonRequired]
        public DataBaseConfig PostgresDataBase { get; set; }
    }
}
