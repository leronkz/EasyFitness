using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;

namespace Easy.Fitness.Infrastructure.Extensions
{
    internal static class HttpQueryExtensions
    {
        public static string ToQueryString(this NameValueCollection nvc)
        {
            IEnumerable<string> segments = from key in nvc.AllKeys
                                           from value in nvc.GetValues(key)
                                           select string.Format("{0}={1}", key, value);
            return string.Join("&", segments);
        }
    }
}
