using Newtonsoft.Json;

namespace Easy.Fitness.Infrastructure.Configuration
{
    public class MinioConfiguration
    {
        [JsonRequired]
        public string Endpoint { get; set; }

        [JsonRequired]
        public string BucketName { get; set; }

        [JsonRequired]
        public string AccessKey { get; set; }

        [JsonRequired]
        public string SecretKey { get; set; }
    }
}
