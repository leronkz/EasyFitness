namespace Easy.Fitness.DomainModels.Models.Analysis
{
    public class ActivityYear
    {
        public string Month { get; private set; }
        public double Calories { get; private set; }

        public ActivityYear(string month, double calories)
        {
            Month = month;
            Calories = calories;
        }
    }
}
