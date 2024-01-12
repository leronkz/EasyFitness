using System;
using Easy.Fitness.DomainModels.Ids;

namespace Easy.Fitness.DomainModels.Models
{
    public class UserParameters : Entity<Guid>
    {
        public double Weight { get; set; }
        public double Height { get; set; }
        public Guid UserId { get; private set; }
        public User User { get; private set; }

        public UserParameters(double weight, double height, UserId createdBy) : base(createdBy)
        {
            Weight = weight;
            Height = height;
        }
    }
}
