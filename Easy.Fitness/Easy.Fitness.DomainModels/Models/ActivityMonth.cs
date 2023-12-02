namespace Easy.Fitness.DomainModels.Models
{
    public class ActivityMonth
    {
        public string Date { get; private set; }
        public double Calories { get; private set; }

        public ActivityMonth(string date, double calories)
        {
            Date = date;
            Calories = calories;
        }
    }
}
