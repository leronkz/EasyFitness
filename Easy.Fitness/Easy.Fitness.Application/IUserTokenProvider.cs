using System;

namespace Easy.Fitness.Application
{
    public interface IUserTokenProvider
    {
        void SetUserCredentials(Guid id, string email, string password);
        string GetAccessToken();
    }
}
