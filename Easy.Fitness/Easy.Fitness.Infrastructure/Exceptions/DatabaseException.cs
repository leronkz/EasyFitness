using System;

namespace Easy.Fitness.Infrastructure.Exceptions
{
    public class DatabaseException : Exception
    {
        public DatabaseException()
        {
        }
        public DatabaseException(string message, Exception innerException) : base(message, innerException)
        {
        }
    }
}
