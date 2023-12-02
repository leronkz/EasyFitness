namespace Easy.Fitness.DomainModels.Models
{
    public class WeightMonth
    {
        public string Date { get; private set; }
        public double Weight { get; private set; }

        public WeightMonth(string date, double weight)
        {
            Date = date;
            Weight = weight;
        }
    }
}
