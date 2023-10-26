using System;

namespace Easy.Fitness.Application.Dtos.Schedule
{
    public class ScheduleDto
    {
        public Guid Id { get; set; }
        public string Date { get; set; }
        public string Type { get; set; }
        public string Note { get; set; }
    }
}
