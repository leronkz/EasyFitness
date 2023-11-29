using System;
using System.Net;

namespace Easy.Fitness.Infrastructure.WebClients
{
    public class ResponseException : Exception
    {
        public HttpStatusCode StatusCode { get; private set; }

        public ResponseException(HttpStatusCode statusCode, string message) : base(message)
        {
            StatusCode = statusCode;
        }
    }
}
