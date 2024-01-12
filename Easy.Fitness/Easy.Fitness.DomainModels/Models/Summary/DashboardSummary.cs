namespace Easy.Fitness.DomainModels.Models.Summary
{
    public class DashboardSummary
    {
        public DietSummary DietSummary { get; set; }
        public string ScheduleType { get; set; }
        public string ScheduleDate { get; set; }
        public string ActivityType { get; set; }
        public string ActivityDate { get; set; }
    }
}
