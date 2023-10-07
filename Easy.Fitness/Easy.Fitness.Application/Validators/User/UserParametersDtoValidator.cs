using System.Collections.Generic;
using FluentValidation;
using FluentValidation.Results;
using Easy.Fitness.Application.Dtos.User;

namespace Easy.Fitness.Application.Validators.User
{
    public class UserParametersDtoValidator : AbstractValidator<UserParametersDto>
    {
        public UserParametersDtoValidator()
        {
            RuleFor(x => x.Weight)
                .NotEmpty().WithMessage("Weight cannot be empty")
                .NotNull().WithMessage("Weight is required")
                .GreaterThanOrEqualTo(0).WithMessage("Weight must be over 0 kg or equal");
            RuleFor(x => x.Height)
                .NotEmpty().WithMessage("Height cannot be empty")
                .NotNull().WithMessage("Height is required")
                .GreaterThanOrEqualTo(0).WithMessage("Height must be over 0 cm or equal");
        }
        protected override void RaiseValidationException(ValidationContext<UserParametersDto> context, ValidationResult result)
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
