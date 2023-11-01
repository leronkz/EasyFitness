using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.Activity;
using Easy.Fitness.Application.Dtos.Diet;
using Easy.Fitness.Application.Dtos.Schedule;
using Easy.Fitness.Application.Dtos.User;
using Easy.Fitness.DomainModels.Models;

namespace Easy.Fitness.Application.Extensions
{
    public static class MappingsExtension
    {
        public static UserDto ToDto(this User user)
        {
            if (user == null)
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
            if (user == null)
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
            if (dto == null)
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

        public static Activity ToEntity(this ActivityDto dto)
        {
            if (dto == null)
            {
                return null;
            }
            return new Activity
            (
                dto.Date,
                dto.Type,
                dto.Name,
                dto.Calories,
                dto.Duration
            );
        }
        public static ActivityDto ToDto(this Activity entity)
        {
            if (entity == null)
            {
                return null;
            }
            return new ActivityDto
            {
                Id = entity.Id,
                Date = entity.Date,
                Type = entity.Type,
                Name = entity.Name,
                Calories = entity.Calories,
                Duration = entity.Duration
            };
        }
        public static PlannedActivity ToEntity(this ScheduleDto dto)
        {
            if (dto == null)
            {
                return null;
            }
            return new PlannedActivity
            (
                dto.Date,
                dto.Type,
                dto.Note
            );
        }
        public static ScheduleDto ToDto(this PlannedActivity entity)
        {
            if (entity == null)
            {
                return null;
            }
            return new ScheduleDto
            {
                Id = entity.Id,
                Date = entity.Date,
                Type = entity.Type,
                Note = entity.Note
            };
        }
        public static Diet ToEntity(this DietPropertiesDto dto)
        {
            if(dto == null)
            {
                return null;
            }
            return new Diet
            (
                dto.Date,
                dto.Calories,
                dto.Fat,
                dto.Carbs,
                dto.Protein
            );
        }
        public static DietPropertiesDto ToDto(this Diet entity)
        {
            if(entity == null)
            {
                return null;
            }
            return new DietPropertiesDto
            {
                Id = entity.Id,
                Date = entity.Date,
                Calories = entity.Calories,
                Fat = entity.Fat,
                Carbs = entity.Carbs,
                Protein = entity.Protein
            };
        }
    }
}
