using Newtonsoft.Json;

namespace Easy.Fitness.Infrastructure.Configuration
{
    public class AuthConfiguration
    {
        [JsonRequired]
        public string Key { get; set; }

        [JsonRequired]
        public string Issuer { get; set; }

        [JsonRequired]
        public string Audience { get; set; }
    }
}
