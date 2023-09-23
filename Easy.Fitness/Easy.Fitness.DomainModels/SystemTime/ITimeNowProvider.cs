using System;

namespace Easy.Fitness.DomainModels.SystemTime
{
    public interface ITimeNowProvider
    {
        DateTime Now { get; }
    }
}
