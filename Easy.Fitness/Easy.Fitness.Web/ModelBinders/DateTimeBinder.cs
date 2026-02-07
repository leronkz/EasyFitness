using Microsoft.AspNetCore.Mvc.ModelBinding;
using System;
using System.Threading.Tasks;

namespace Easy.Fitness.Web.ModelBinders
{
    internal class DateTimeBinder : IModelBinder
    {
        public Task BindModelAsync(ModelBindingContext bindingContext)
        {
            if (bindingContext == null)
            {
                throw new ArgumentNullException(nameof(bindingContext));
            }
            ValueProviderResult valueProviderResult = bindingContext.ValueProvider.GetValue(bindingContext.ModelName);
            if (valueProviderResult == ValueProviderResult.None)
            {
                return Task.CompletedTask;
            }
            bindingContext.ModelState.SetModelValue(bindingContext.ModelName, valueProviderResult);
            string value = valueProviderResult.FirstValue;
            if (string.IsNullOrEmpty(value))
            {
                return Task.CompletedTask;
            }
            if (!long.TryParse(value, out long ms))
            {
                bindingContext.ModelState.TryAddModelError(
                    bindingContext.ModelName,
                    "DateTime must be an unix milliseconds.");
                return Task.CompletedTask;
            }
            bindingContext.Result = ToResult(ms);
            return Task.CompletedTask;
        }
        protected virtual ModelBindingResult ToResult(long ms)
        {
            return ModelBindingResult.Success(FromUnixTimeMilliseconds(ms));
        }
        protected static DateTime FromUnixTimeMilliseconds(long ms)
        {
            return DateTimeOffset.FromUnixTimeMilliseconds(ms).UtcDateTime;
        }
    }
}
