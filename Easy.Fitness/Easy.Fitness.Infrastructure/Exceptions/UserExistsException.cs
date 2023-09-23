using System;

namespace Easy.Fitness.Infrastructure.Exceptions
{
    public class UserExistsException : Exception
    {
        private const string DuplicateEmailErrorMessage = "There is already a registered user with given email";
        
        public UserExistsException() 
        { 
        }
        
        public UserExistsException(Exception innerException) : base(DuplicateEmailErrorMessage, innerException)
        {
        }
    }
}
