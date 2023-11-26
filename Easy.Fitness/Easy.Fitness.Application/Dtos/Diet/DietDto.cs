using System.Collections.Generic;

namespace Easy.Fitness.Application.Dtos.Diet
{
    public class DietDto
    {
        public double Calories { get; set; }
        public double Fat { get; set; }
        public double Carbs { get; set; }
        public double Protein { get; set; }
        public ICollection<FoodDto> Foods { get; set; }
    }
}
