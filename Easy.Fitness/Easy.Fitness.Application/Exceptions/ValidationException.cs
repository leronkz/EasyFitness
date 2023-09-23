using System;
using System.Collections.Generic;

namespace Easy.Fitness.Application.Exceptions
{
    public class ValidationException : Exception
    {
        public List<KeyValuePair<string, string>> Errors { get; set; }

        public ValidationException()
        {
            Errors = new List<KeyValuePair<string, string>>();
        }

        public ValidationException(List<KeyValuePair<string, string>> errors) : base()
        {
            Errors = errors;
        }
    }
}
