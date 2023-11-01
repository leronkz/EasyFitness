using System;

namespace Easy.Fitness.DomainModels.Models
{
    public class Food : Entity<Guid>
    {
        public double Calories { get; set; }
        public double Fat { get; set; }
        public double Carbs { get; set; }
        public double Protein { get; set; }
        public double Weight { get; set; }
        public string Type { get; set; }
        public Diet Diet { get; private set; }
        public Guid DietId { get; private set; }
    }
}
