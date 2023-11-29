using Easy.Fitness.DomainModels.Ids;
using System;

namespace Easy.Fitness.DomainModels.Models
{
    public class DietProperties : Entity<Guid>
    {
        public string Date { get; set; }
        public double Calories { get; set; }
        public double Fat { get; set; }
        public double Carbs { get; set; }
        public double Protein { get; set; }
        public Guid DietId { get; private set; }
        public Diet Diet { get; private set; }

        public DietProperties(string date, double calories, double fat, double carbs, double protein)
        {
            Date = date;
            Calories = calories;
            Fat = fat;
            Carbs = carbs;
            Protein = protein;
        }

        public DietProperties(string date, double calories, double fat, double carbs, double protein, UserId userId) : base(userId)
        {
            Date = date;
            Calories = calories;
            Fat = fat;
            Carbs = carbs;
            Protein = protein;
        }
    }
}
