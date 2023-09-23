using System.Collections.Generic;
using FluentValidation;
using FluentValidation.Results;
using Easy.Fitness.Application.Dtos;

namespace Easy.Fitness.Application.Validators.User
{
    public class CreateUserDtoValidator : AbstractValidator<CreateUserDto>
    {
        public CreateUserDtoValidator()
        {
            RuleFor(user => user.Email)
                .EmailAddress().WithMessage("Invalid email")
                .NotEmpty().WithMessage("Email cannot be empty")
                .NotNull().WithMessage("Email is required");

            RuleFor(user => user.Password)
                .NotEmpty().WithMessage("Password cannot be empty")
                .NotNull().WithMessage("Password is required")
                .Length(8, 100);
        }
        protected override void RaiseValidationException(ValidationContext<CreateUserDto> context, ValidationResult result)
        {
            List<KeyValuePair<string, string>> errors = new List<KeyValuePair<string, string>>();
            foreach (ValidationFailure error in result.Errors)
            {
                errors.Add(new KeyValuePair<string, string>(error.PropertyName, error.ErrorMessage));
            }
            throw new Exceptions.ValidationException(errors);
        }
    }
}
