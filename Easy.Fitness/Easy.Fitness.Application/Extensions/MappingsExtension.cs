using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.User;
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
                Password = user.Password,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                BirthDate = user.BirthDate,
            };
        }
        public static UserInfoDto toDto(this User user)
        {
            if(user == null)
            {
                return null;
            }
            return new UserInfoDto()
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                PhoneNumber = user.PhoneNumber,
                BirthDate = user.BirthDate,
            };
        }
        public static User ToEntity(this UserInfoDto dto)
        {
            if(dto == null)
            {
                return null;
            }
            return new User
            (
                dto.Id,
                dto.FirstName,
                dto.LastName,
                dto.PhoneNumber,
                dto.BirthDate
            );
        }

        public static UserParametersDto ToDto(this UserParameters entity)
        {
            if (entity == null)
            {
                return null;
            }

            return new UserParametersDto()
            {
                Weight = entity.Weight,
                Height = entity.Height,
            };
        }
    }
}
