using System;

namespace Easy.Fitness.DomainModels.SystemTime
{
    internal class DefaultTimeNowProvider : ITimeNowProvider
    {
        public DateTime Now
        {
            get
            {
                DateTime now = DateTime.UtcNow;
                now = now.AddTicks(-(now.Ticks % TimeSpan.TicksPerMillisecond));
                return now;
            }
        }
    }
}
