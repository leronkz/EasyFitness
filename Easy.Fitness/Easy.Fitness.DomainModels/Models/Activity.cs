using Easy.Fitness.DomainModels.Ids;
using System;

namespace Easy.Fitness.DomainModels.Models
{
    public class Activity : Entity<Guid>
    {
        public string Date { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public string Duration { get; set; }
        public Guid UserId { get; private set; }
        public User User { get; private set; }

        public Activity(string date, string type, string name, double calories, string duration, UserId createdBy) : base(createdBy)
        {
            Date = date;
            Type = type;
            Name = name;
            Calories = calories;
            Duration = duration;
        }

        public Activity(string date, string type, string name, double calories, string duration)
        {
            Date = date;
            Type = type;
            Name = name;
            Calories = calories;
            Duration = duration;
        }
    }
}
