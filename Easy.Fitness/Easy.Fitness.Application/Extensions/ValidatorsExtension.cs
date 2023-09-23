using FluentValidation;
using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Validators.User;

namespace Easy.Fitness.Application.Extensions
{
    public static class ValidatorsExtension
    {
        private static CreateUserDtoValidator _createUserDtoValidator = new CreateUserDtoValidator();
        public static void Validate(this CreateUserDto dto)
        {

            if(dto == null)
            {
                throw new Exceptions.ValidationException();
            }

            _createUserDtoValidator.ValidateAndThrow(dto);
        }
    }
}
