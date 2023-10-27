using Easy.Fitness.DomainModels.Ids;
using System;

namespace Easy.Fitness.DomainModels.Models
{
    public class PlannedActivity : Entity<Guid>
    {
        public string Date { get; set; }
        public string Type { get; set; }
        public string Note { get; set; }
        public Guid UserId { get; private set; }
        public User User { get; private set; }

        public PlannedActivity(string date, string type, string note, UserId createdBy) : base(createdBy)
        {
            Date = date;
            Type = type;
            Note = note;
        }

        public PlannedActivity(string date, string type, string note)
        {
            Date = date;
            Type = type;
            Note = note;
        }
    }
}
