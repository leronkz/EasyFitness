using Easy.Fitness.Infrastructure.Configuration;

namespace Easy.Fitness.Infrastructure.Authorization
{
    public class UserTokenProvider
    {
        private readonly TokensClient _tokensClient;
        private UserCredentials _userCredentials;

        public UserTokenProvider(AuthConfiguration authConfig)
        {
            _tokensClient = new TokensClient(authConfig);
        }

        public string GetAccessToken()
        {
            return _tokensClient.GetNewToken(_userCredentials);
        }
    }
}
