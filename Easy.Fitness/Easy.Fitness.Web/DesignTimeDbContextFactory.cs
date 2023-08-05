using Microsoft.EntityFrameworkCore.Design;
using Easy.Fitness.Infrastructure;
using Easy.Fitness.Infrastructure.Configuration;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Easy.Fitness.Web
{
    public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<AppDbContext>
    {
        public AppDbContext CreateDbContext(string[] args)
        {
            var config = ConfigurationHelper.Create<AppConfiguration>();
            var builder = new DbContextOptionsBuilder<AppDbContext>();
            builder.UseNpgsql(config.PostgresDataBase.ConnectionString,
                m => m.MigrationsAssembly(typeof(AppDbContext).GetTypeInfo().Assembly.GetName().Name));
            return new AppDbContext(builder.Options);
        }
    }
}
