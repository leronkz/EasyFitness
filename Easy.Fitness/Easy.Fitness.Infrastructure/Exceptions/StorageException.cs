using System;

namespace Easy.Fitness.Infrastructure.Exceptions
{
    public class StorageException : Exception
    {
        public StorageException()
        {

        }

        public StorageException(string message, Exception innerException) : base(message, innerException)
        {

        }
    }
}
