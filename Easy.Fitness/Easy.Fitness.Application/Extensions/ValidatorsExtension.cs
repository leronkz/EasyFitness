using FluentValidation;
using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Validators.User;

namespace Easy.Fitness.Application.Extensions
{
    public static class ValidatorsExtension
    {
        private static CreateUserDtoValidator _createUserDtoValidator = new CreateUserDtoValidator();
        private static UserInfoDtoValidator _userInfoDtoValidator = new UserInfoDtoValidator();
        public static void Validate(this CreateUserDto dto)
        {
            if(dto == null)
            {
                throw new Exceptions.ValidationException();
            }
            _createUserDtoValidator.ValidateAndThrow(dto);
        }
        public static void Validate(this UserInfoDto dto)
        {
            if(dto == null)
            {
                throw new Exceptions.ValidationException();
            }
            _userInfoDtoValidator.ValidateAndThrow(dto);
        }
    }
}
