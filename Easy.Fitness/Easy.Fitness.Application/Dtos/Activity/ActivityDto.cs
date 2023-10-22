using System;

namespace Easy.Fitness.Application.Dtos.Activity
{
    public class ActivityDto
    {
        public Guid Id { get; set; }
        public string Date { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public double Calories { get; set; }
        public string Duration { get; set; }
    }
}
