using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Easy.Fitness.Application;
using Easy.Fitness.DomainModels;
using Easy.Fitness.DomainModels.Ids;
using Easy.Fitness.DomainModels.Models;

namespace Easy.Fitness.Infrastructure
{
    public class AppDbContext : DbContext
    {
        private readonly IUserContext _userContext;
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserParameters> UserParameters { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options, IUserContext userContext = null) 
            : base(options) 
        { 
            _userContext = userContext;
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            AddAuditInfo();
            return await base.SaveChangesAsync(cancellationToken);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            ConfigureUserTable(modelBuilder);
            ConfigureUserParametersTable(modelBuilder);
        }

        private void AddAuditInfo()
        {
            var entities = ChangeTracker.Entries<Entity<Guid>>().Where(e => e.State == EntityState.Modified);

            foreach(var entity in entities)
            {
                entity.Entity.ModifiedBy = _userContext?.CurrentUserId ?? UserId.Empty;
                entity.Entity.ModifiedOn = DateTime.UtcNow;
            }
        }
        
        private void ConfigureUserTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().ToTable("User");
            modelBuilder.Entity<User>().Property(x => x.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<User>().Property(x => x.Email)
                .HasMaxLength(100)
                .IsRequired();
            modelBuilder.Entity<User>().Property(x => x.Password)
                .HasMaxLength(100)
                .IsRequired();
            modelBuilder.Entity<User>().Property(x => x.FirstName)
                .HasMaxLength(100);
            modelBuilder.Entity<User>().Property(x => x.LastName)
                .HasMaxLength(100);
            modelBuilder.Entity<User>().Property(x => x.PhoneNumber)
                .HasMaxLength(100);
            modelBuilder.Entity<User>().Property(x => x.BirthDate)
                .HasMaxLength(100);
            modelBuilder.Entity<User>().HasIndex(x => x.Email)
                .IsUnique();
            modelBuilder.Entity<User>().Property(x => x.CreatedBy).HasConversion(
                v => (Guid)v,
                v => (UserId)v);
            modelBuilder.Entity<User>().Property(x => x.ModifiedBy).HasConversion(
                v => (Guid)v,
                v => (UserId)v);

            modelBuilder.Entity<User>().HasOne(x => x.Parameters)
                .WithOne(u => u.User)
                .HasForeignKey<UserParameters>(u => u.UserId)
                .IsRequired();
        }

        private void ConfigureUserParametersTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserParameters>().ToTable("UserParameters");
            modelBuilder.Entity<UserParameters>().Property(x => x.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<UserParameters>().Property(x => x.CreatedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
            modelBuilder.Entity<UserParameters>().Property(x => x.ModifiedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
        }
    }
}
