namespace Easy.Fitness.DomainModels.Models.Diet
{
    public class FoodDetails
    {
        public string Name { get; private set; }
        public double Calories { get; private set; }
        public double Fat { get; private set; }
        public double Carbs { get; private set; }
        public double Protein { get; private set; }
        public double Weight { get; private set; }

        public FoodDetails(string name, double calories, double fat, double carbs, double protein, double weight)
        {
            Name = name;
            Calories = calories;
            Fat = fat;
            Carbs = carbs;
            Protein = protein;
            Weight = weight;
        }
    }
}
