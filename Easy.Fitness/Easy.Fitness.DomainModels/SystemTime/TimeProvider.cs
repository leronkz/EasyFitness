using System;

namespace Easy.Fitness.DomainModels.SystemTime
{
    public static class TimeProvider
    {
        public static ITimeNowProvider Default { get; private set; }
        public static ITimeNowProvider TimeNowProvider { get; set; }

        public static DateTime Now
        {
            get
            {
                return TimeNowProvider.Now;
            }
        }
        static TimeProvider()
        {
            Default = new DefaultTimeNowProvider();
            TimeNowProvider = Default;
        }
    }
}
