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
        public virtual DbSet<Activity> Activities { get; set; }
        public virtual DbSet<PlannedActivity> Schedule { get; set; }
        public virtual DbSet<Diet> Diet { get; set; }
        public virtual DbSet<Food> Food { get; set; }
        public virtual DbSet<DietProperties> DietProperties { get; set; }

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
            ConfigureActivitesTable(modelBuilder);
            ConfigureScheduleTable(modelBuilder);
            ConfigureDietTable(modelBuilder);
            ConfigureFoodTable(modelBuilder);
            ConfigureDietPropertiesTable(modelBuilder);
        }

        private void AddAuditInfo()
        {
            var entities = ChangeTracker.Entries<Entity<Guid>>().Where(e => e.State == EntityState.Modified);

            foreach (var entity in entities)
            {
                entity.Entity.ModifiedBy = _userContext?.CurrentUserId ?? UserId.Empty;
                entity.Entity.ModifiedOn = DateTime.UtcNow;
            }
        }

        private static void ConfigureUserTable(ModelBuilder modelBuilder)
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

            modelBuilder.Entity<User>().HasMany(x => x.Parameters)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();

            modelBuilder.Entity<User>().HasMany(x => x.Activities)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();

            modelBuilder.Entity<User>().HasMany(x => x.PlannedActivities)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();

            modelBuilder.Entity<User>().HasMany(x => x.Diets)
                .WithOne(u => u.User)
                .HasForeignKey(u => u.UserId)
                .IsRequired();
        }

        private static void ConfigureUserParametersTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserParameters>().ToTable("UserParameters");
            modelBuilder.Entity<UserParameters>().Property(x => x.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<UserParameters>().Property(x => x.Height)
                .HasMaxLength(30);
            modelBuilder.Entity<UserParameters>().Property(x => x.Weight)
                .HasMaxLength(30);
            modelBuilder.Entity<UserParameters>().Property(x => x.CreatedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
            modelBuilder.Entity<UserParameters>().Property(x => x.ModifiedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
        }

        private static void ConfigureActivitesTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Activity>().ToTable("Activity");
            modelBuilder.Entity<Activity>().Property(x => x.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Activity>().Property(x => x.Date)
                .HasMaxLength(20);
            modelBuilder.Entity<Activity>().Property(x => x.Type)
                .HasMaxLength(50);
            modelBuilder.Entity<Activity>().Property(x => x.Name)
                .HasMaxLength(100);
            modelBuilder.Entity<Activity>().Property(x => x.Calories)
                .HasMaxLength(50);
            modelBuilder.Entity<Activity>().Property(x => x.Duration)
                .HasMaxLength(20);
            modelBuilder.Entity<Activity>().Property(x => x.CreatedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
            modelBuilder.Entity<Activity>().Property(x => x.ModifiedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
        }

        private static void ConfigureScheduleTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PlannedActivity>().ToTable("Schedule");
            modelBuilder.Entity<PlannedActivity>().Property(x => x.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<PlannedActivity>().Property(x => x.Date)
                .HasMaxLength(50);
            modelBuilder.Entity<PlannedActivity>().Property(x => x.Type)
                .HasMaxLength(100);
            modelBuilder.Entity<PlannedActivity>().Property(x => x.Note)
                .HasMaxLength(2000);
            modelBuilder.Entity<PlannedActivity>().Property(x => x.CreatedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
            modelBuilder.Entity<PlannedActivity>().Property(x => x.ModifiedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
        }

        private static void ConfigureDietTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Diet>().ToTable("Diet");
            modelBuilder.Entity<Diet>().Property(x => x.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Diet>().Property(x => x.Date)
                .HasMaxLength(30);
            modelBuilder.Entity<Diet>().Property(x => x.Calories)
                .HasMaxLength(30);
            modelBuilder.Entity<Diet>().Property(x => x.Carbs)
                .HasMaxLength(30);
            modelBuilder.Entity<Diet>().Property(x => x.Fat)
                .HasMaxLength(30);
            modelBuilder.Entity<Diet>().Property(x => x.Protein)
                .HasMaxLength(30);
            modelBuilder.Entity<Diet>().Property(x => x.CreatedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
            modelBuilder.Entity<Diet>().Property(x => x.ModifiedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);

            modelBuilder.Entity<Diet>().HasMany(x => x.Foods)
                .WithOne(d => d.Diet)
                .HasForeignKey(d => d.DietId)
                .IsRequired();
            modelBuilder.Entity<Diet>().HasOne(x => x.Properties)
                .WithOne(p => p.Diet)
                .HasForeignKey<DietProperties>(p => p.DietId)
                .IsRequired();
        }

        private static void ConfigureFoodTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Food>().ToTable("Food");
            modelBuilder.Entity<Food>().Property(x => x.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<Food>().Property(x => x.Name)
                .HasMaxLength(100);
            modelBuilder.Entity<Food>().Property(x => x.Calories)
                .HasMaxLength(30);
            modelBuilder.Entity<Food>().Property(x => x.Carbs)
                .HasMaxLength(30);
            modelBuilder.Entity<Food>().Property(x => x.Fat)
                .HasMaxLength(30);
            modelBuilder.Entity<Food>().Property(x => x.Protein)
                .HasMaxLength(30);
            modelBuilder.Entity<Food>().Property(x => x.CreatedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
            modelBuilder.Entity<Food>().Property(x => x.ModifiedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
        }

        private static void ConfigureDietPropertiesTable(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DietProperties>().ToTable("DietProperties");
            modelBuilder.Entity<DietProperties>().Property(x => x.Id)
                .ValueGeneratedOnAdd();
            modelBuilder.Entity<DietProperties>().Property(x => x.Date)
                .HasMaxLength(20);
            modelBuilder.Entity<DietProperties>().Property(x => x.Calories)
                .HasMaxLength(20);
            modelBuilder.Entity<DietProperties>().Property(x => x.Carbs)
                .HasMaxLength(20);
            modelBuilder.Entity<DietProperties>().Property(x => x.Fat)
                .HasMaxLength(20);
            modelBuilder.Entity<DietProperties>().Property(x => x.Protein)
                .HasMaxLength(20);
            modelBuilder.Entity<DietProperties>().Property(x => x.CreatedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
            modelBuilder.Entity<DietProperties>().Property(x => x.ModifiedBy)
                .HasConversion(
                v => (Guid)v,
                v => (UserId)v);
        }
    }
}
