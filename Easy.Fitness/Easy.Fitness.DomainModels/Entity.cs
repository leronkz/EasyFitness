using System;
using Easy.Fitness.DomainModels.Ids;
using Easy.Fitness.DomainModels.SystemTime;

namespace Easy.Fitness.DomainModels
{
    public class Entity<T>
    {
        public T Id { get; private set; }
        public DateTime CreatedOn { get; private set; } = TimeProvider.Now;
        public DateTime? ModifiedOn { get; set; }
        public UserId CreatedBy { get; private set; }
        public UserId ModifiedBy { get; set; }

        public Entity(T id)
        {
            Id = id;
        }

        protected Entity(UserId createdBy)
        {
            CreatedBy = createdBy;
        }

        protected Entity(T id, UserId createdBy)
        {
            Id = id;
            CreatedBy = createdBy;
        }

        protected Entity()
        {
        }
    }
}
