using System.Collections.Generic;
using FluentValidation;
using FluentValidation.Results;
using Easy.Fitness.Application.Dtos;

namespace Easy.Fitness.Application.Validators.User
{
    public class UserInfoDtoValidator : AbstractValidator<UserInfoDto>
    {
        public UserInfoDtoValidator()
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("First name cannot be empty")
                .NotNull().WithMessage("First name is required");
            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Last name cannot be empty")
                .NotNull().WithMessage("Last name is required");
            RuleFor(x => x.PhoneNumber)
                .NotEmpty().WithMessage("Phone number cannot be empty")
                .NotNull().WithMessage("Phone number is required");
            RuleFor(x => x.BirthDate)
                .NotEmpty().WithMessage("Birth date cannot be empty")
                .NotNull().WithMessage("Birth date is required");
        }
        protected override void RaiseValidationException(ValidationContext<UserInfoDto> context, ValidationResult result)
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
