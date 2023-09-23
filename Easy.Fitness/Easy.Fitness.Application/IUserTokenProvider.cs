namespace Easy.Fitness.Application
{
    public interface IUserTokenProvider
    {
        void SetUserCredentials(string email, string password);
        string GetAccessToken();
    }
}
