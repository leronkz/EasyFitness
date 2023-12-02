namespace Easy.Fitness.DomainModels.Models
{
    public class DietMonth
    {
        public string Date { get; private set; }
        public double Calories { get; private set; }

        public DietMonth(string date, double calories)
        {
            Date = date;
            Calories = calories;
        }
    }
}
