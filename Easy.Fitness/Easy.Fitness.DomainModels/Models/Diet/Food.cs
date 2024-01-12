using Easy.Fitness.DomainModels.Ids;
using System;

namespace Easy.Fitness.DomainModels.Models.Diet
{
    public class Food : Entity<Guid>
    {
        public string Name { get; set; }
        public double Calories { get; set; }
        public double Fat { get; set; }
        public double Carbs { get; set; }
        public double Protein { get; set; }
        public double Weight { get; set; }
        public string Type { get; set; }
        public Diet Diet { get; private set; }
        public Guid DietId { get; private set; }

        public Food(string name, double calories, double fat, double carbs, double protein, double weight, string type)
        {
            Name = name;
            Calories = calories;
            Fat = fat;
            Carbs = carbs;
            Protein = protein;
            Weight = weight;
            Type = type;
        }

        public Food(string name, double calories, double fat, double carbs, double protein, double weight, string type, UserId createdBy) : base(createdBy)
        {
            Name = name;
            Calories = calories;
            Fat = fat;
            Carbs = carbs;
            Protein = protein;
            Weight = weight;
            Type = type;
        }
    }
}
