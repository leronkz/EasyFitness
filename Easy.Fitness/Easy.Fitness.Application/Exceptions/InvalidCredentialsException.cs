using System;

namespace Easy.Fitness.Application.Exceptions
{
    public class InvalidCredentialsException : Exception
    {
        public const string InvalidCredentialsMessage = "Wrong credentials";

        public InvalidCredentialsException() : base(InvalidCredentialsMessage)
        {
        }
    }
}
