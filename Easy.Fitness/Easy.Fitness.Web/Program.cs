using Easy.Fitness.Infrastructure.Configuration;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Serilog;
using System;
using System.IO;
using System.Reflection;

namespace Easy.Fitness.Web
{
    internal class Program
    {
        private static ILogger _log;

        public static void Main(string[] args)
        {
            try
            {
                IConfigurationRoot config = ConfigurationHelper.CreateRoot();
                ConfigureMainLogger(config);
                PrintAndLogVersion();
                var appConfig = ConfigurationHelper.CreateForm<AppConfiguration>(config);
                string url = appConfig.HostConfiguration.Host;
                Host.CreateDefaultBuilder(args)
                    .UseContentRoot(Directory.GetCurrentDirectory())
                    .ConfigureLogging(builder => builder.AddSerilog())
                    .ConfigureWebHostDefaults(builder =>
                    {
                        builder
                            .UseKestrel(o => o.AddServerHeader = false)
                            .UseContentRoot(Directory.GetCurrentDirectory())
                            .UseStartup<Startup>()
                            .UseUrls(url);
                    })
                    .Build().Run();
            }
            catch (Exception ex)
            {
                Log.Fatal(ex, "Problem with application running!");
                Log.CloseAndFlush();
                throw;
            }
        }
        private static void ConfigureMainLogger(IConfigurationRoot config)
        {
            Log.Logger = new LoggerConfiguration()
                .ReadFrom.Configuration(config)
                .CreateLogger();
            _log = Log.ForContext<Program>();
        }

        private static void PrintAndLogVersion()
        {
            string version = GetVersion();
            _log.Information("Component {version}", version);
            Console.WriteLine($"Version: {version}");
        }
        internal static string GetVersion()
        {
            return typeof(Program)
                .GetTypeInfo()
                .Assembly
                .GetName()
                .Version
                .ToString();
        }
    }
}