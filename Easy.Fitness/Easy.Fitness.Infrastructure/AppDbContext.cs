using Microsoft.EntityFrameworkCore;

namespace Easy.Fitness.Infrastructure
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) 
            : base(options) 
        { 
        }
    }
}
