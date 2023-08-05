using Newtonsoft.Json;
using System;

namespace Easy.Fitness.Infrastructure.Converters
{
    public abstract class IdConverter<T> : JsonConverter
    {
        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(T);
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null)
            {
                return null;
            }
            if (reader.TokenType == JsonToken.String)
            {
                string value = (string)reader.Value;
                if (!TryParse(value, out T result))
                {
                    return null;
                }
                return result;
            }
            throw new JsonSerializationException($"Unexpected token parsing {typeof(T).Name}. Expected String, got {reader.TokenType}.");
        }

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            string id = ToString((T)value);
            writer.WriteValue(id);
        }

        protected virtual string ToString(T value)
        {
            return value.ToString();
        }

        protected abstract bool TryParse(string value, out T result);
    }
}
