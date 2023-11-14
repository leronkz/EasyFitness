namespace Easy.Fitness.DomainModels.Models
{
    public class ActivityDay
    {
        public string Date { get; private set; }
        public double Calories { get; private set; }

        public ActivityDay(string date, double calories)
        {
            Date = date;
            Calories = calories;
        }
    }
}
