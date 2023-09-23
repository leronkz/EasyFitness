using Easy.Fitness.Application.Dtos;
using Easy.Fitness.DomainModels.Models;

namespace Easy.Fitness.Application.Extensions
{
    public static class MappingsExtension
    {
        public static UserDto ToDto(this User user)
        {
            if(user == null)
            {
                return null;
            }
            return new UserDto()
            {
                Id = user.Id,
                Email = user.Email,
                Password = user.Password
            };
        }
    }
}
