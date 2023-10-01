using Newtonsoft.Json;

namespace Easy.Fitness.Infrastructure.Configuration
{
    public class StorageConfig
    {
        [JsonRequired]
        public string Root { get; set; }

        [JsonIgnore]
        public string ValidatorFileStorageAddress
        {
            get { return Root + "/validator"; }
        }

        [JsonIgnore]
        public string FileStorageAddress
        {
            get { return Root + "/files"; }
        }

        public MinioConfiguration Minio { get; set; }
    }
}
