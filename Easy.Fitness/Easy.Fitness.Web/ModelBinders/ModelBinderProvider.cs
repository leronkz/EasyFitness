using System;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace Easy.Fitness.Web.ModelBinders
{
    internal class ModelBinderProvider : IModelBinderProvider
    {
        public IModelBinder GetBinder(ModelBinderProviderContext context)
        {
            if(context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }
            if(!context.Metadata.IsComplexType &&
                context.Metadata.ModelType == typeof(DateTime))
            {
                return new DateTimeBinder();
            }
            if(!context.Metadata.IsComplexType && 
                context.Metadata.ModelType == typeof(DateTime?))
            {
                return new NullableDateTimeBinder();
            }
            return null;
        }
    }
}
