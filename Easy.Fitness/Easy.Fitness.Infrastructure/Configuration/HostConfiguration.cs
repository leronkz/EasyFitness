using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Easy.Fitness.Infrastructure.Configuration
{
    public class HostConfiguration
    {
        [JsonRequired]
        public string Host { get; set; }
    }
}
