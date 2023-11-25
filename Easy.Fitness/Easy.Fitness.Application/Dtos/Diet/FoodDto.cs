using System;

namespace Easy.Fitness.Application.Dtos.Diet
{
    public class FoodDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public double Fat { get; set; }
        public double Carbs { get; set; }
        public double Protein { get; set; }
        public double Weight { get; set; }
        public string Type { get; set; }
    }
}
