using System;

namespace Easy.Fitness.Application.Dtos.Diet
{
    public class DietPropertiesDto
    {
        public Guid Id { get; set; }
        public string Date { get; set; }
        public double Calories { get; set; }
        public double Fat { get; set; }
        public double Carbs { get; set; }
        public double Protein { get; set; }
    }
}
