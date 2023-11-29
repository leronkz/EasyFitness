using Easy.Fitness.DomainModels.Ids;
using System;
using System.Collections.Generic;

namespace Easy.Fitness.DomainModels.Models
{
    public class Diet : Entity<Guid>
    {
        public string Date { get; set; }
        public double Calories { get; set; }
        public double Fat { get; set; }
        public double Carbs { get; set; }
        public double Protein { get; set; }
        public ICollection<Food> Foods { get; set; } = new List<Food>();
        public DietProperties Properties { get; set; }
        public Guid UserId { get; private set; }
        public User User { get; private set; }

        public Diet(string date, double calories, double fat, double carbs, double protein)
        {
            Date = date;
            Calories = calories;
            Fat = fat;
            Carbs = carbs;
            Protein = protein;
        }

        public Diet(string date, double calories, double fat, double carbs, double protein, UserId userId) : base(userId)
        {
            Date = date;
            Calories = calories;
            Fat = fat;
            Carbs = carbs;
            Protein = protein;
        }
    }
}
