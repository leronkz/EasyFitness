using Easy.Fitness.Application;
using Easy.Fitness.Infrastructure.Configuration;

namespace Easy.Fitness.Infrastructure.Authorization
{
    public class UserTokenProvider : IUserTokenProvider
    {
        private readonly TokensClient _tokensClient;
        private UserCredentials _userCredentials;

        public UserTokenProvider(AuthConfiguration authConfig)
        {
            _tokensClient = new TokensClient(authConfig);
        }

        public void SetUserCredentials(string email, string password)
        {
            _userCredentials = new UserCredentials()
            {
                Email = email,
                Password = password
            };
        }
        public string GetAccessToken()
        {
            return _tokensClient.GetNewToken(_userCredentials).AccessToken;
        }
    }
}
