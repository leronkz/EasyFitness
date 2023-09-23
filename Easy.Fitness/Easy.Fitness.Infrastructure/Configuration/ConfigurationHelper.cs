using Microsoft.Extensions.Configuration;

namespace Easy.Fitness.Infrastructure.Configuration
{
    public static class ConfigurationHelper
    {
        public static string GetConfigEnvVariable(string environmentVariableName = "CONFIG")
        {
            IConfigurationRoot environmentConfiguration = new ConfigurationBuilder()
                .AddEnvironmentVariables()
                .Build();
            return environmentConfiguration.GetValue<string>(environmentVariableName);
        }
        public static IConfigurationRoot CreateRoot()
        {
            string externalConfigFile = GetConfigEnvVariable();
            IConfigurationBuilder configBuilder = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json");
            if(!string.IsNullOrWhiteSpace(externalConfigFile))
            {
                configBuilder = configBuilder.AddJsonFile(externalConfigFile);
            }
            configBuilder = configBuilder
                .AddEnvironmentVariables();
            return configBuilder.Build();
        }
        public static TConfig CreateForm<TConfig>(IConfiguration configurationRoot)
            where TConfig : class, new()
        {
            TConfig config = new TConfig();
            configurationRoot.Bind(config);
            return config;
        }
        public static TConfig Create<TConfig>()
            where TConfig: class, new()
        {
            IConfigurationRoot configuration = CreateRoot();
            return CreateForm<TConfig>(configuration);
        }
    }
}
