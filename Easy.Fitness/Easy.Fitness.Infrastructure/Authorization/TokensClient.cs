using Easy.Fitness.Infrastructure.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Easy.Fitness.Infrastructure.Authorization
{
    internal class TokensClient
    {
        private readonly AuthConfiguration _authConfig;
        public TokensClient(AuthConfiguration authConfig)
        {
            _authConfig = authConfig;
        }

        internal AccessTokenDto GetNewToken(UserCredentials user)
        {
            SymmetricSecurityKey securityKey = new(Encoding.UTF8.GetBytes(_authConfig.Key));
            SigningCredentials credentials = new(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Email),
            };
            JwtSecurityToken token = new(
                _authConfig.Issuer,
                _authConfig.Audience,
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            AccessTokenDto accessToken = new AccessTokenDto
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(token)
            };
            return accessToken;
        }
    }
}
