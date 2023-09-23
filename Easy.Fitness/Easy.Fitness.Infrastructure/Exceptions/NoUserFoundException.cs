using System;

namespace Easy.Fitness.Infrastructure.Exceptions
{
    public class NoUserFoundException : Exception
    {
        public const string NoUserFoundMessage = "There is no user with given credentials";

        public NoUserFoundException()
        {
        }

        public NoUserFoundException(Exception innerException) : base(NoUserFoundMessage, innerException)
        { 
        }
    }
}
