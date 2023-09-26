using System.Collections.Generic;
using FluentValidation;
using FluentValidation.Results;
using Easy.Fitness.Application.Dtos;

namespace Easy.Fitness.Application.Validators.User
{
    public class ChangePasswordDtoValidator : AbstractValidator<ChangePasswordDto>
    {
        public ChangePasswordDtoValidator()
        {
            RuleFor(x => x.CurrentPassword)
                .NotEmpty().WithMessage("Current password cannot be empty")
                .NotNull().WithMessage("Current password is required");

            RuleFor(x => x.NewPassword)
                .NotEmpty().WithMessage("New password cannot be empty")
                .NotNull().WithMessage("New password is required")
                .Length(8, 100);
        }
        protected override void RaiseValidationException(ValidationContext<ChangePasswordDto> context, ValidationResult result)
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
