using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;

namespace Easy.Fitness.Infrastructure.Converters
{
    public class UnixMsDateTimeConverter : DateTimeConverterBase
    {
        /// <summary>
        /// Writes the JSON representation of the object.
        /// </summary>
        /// <param name="writer">The <see cref="JsonWriter"/> to write to.</param>
        /// <param name="value">The value.</param>
        /// <param name="serializer">The calling serializer.</param>
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            long ticks;

            if (value is DateTime dateTime)
            {
                var universal = dateTime.ToUniversalTime();
                var date = new DateTimeOffset(universal);
                ticks = date.ToUnixTimeMilliseconds();
            }
            else
            {
                throw new JsonSerializationException("Expected date object value.");
            }

            writer.WriteValue(ticks);
        }

        /// <summary>
        /// Reads the JSON representation of the object.
        /// </summary>
        /// <param name="reader">The <see cref="JsonReader"/> to read from.</param>
        /// <param name="objectType">Type of the object.</param>
        /// <param name="existingValue">The existing property value of the JSON that is being converted.</param>
        /// <param name="serializer">The calling serializer.</param>
        /// <returns>The object value.</returns>
        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.Null)
            {
                return null;
            }

            long milliseconds;

            if (reader.TokenType == JsonToken.Integer)
            {
                milliseconds = (long)reader.Value;
            }
            else if (reader.TokenType == JsonToken.String)
            {
                if (!long.TryParse((string)reader.Value, out milliseconds))
                {
                    throw new JsonSerializationException($"Cannot convert invalid value to {objectType}.");
                }
            }
            else
            {
                throw new JsonSerializationException($"Unexpected token parsing date. Expected Integer or String, got {reader.TokenType}.");
            }

            if (milliseconds >= 0)
            {
                return DateTimeOffset.FromUnixTimeMilliseconds(milliseconds).UtcDateTime;
            }
            else
            {
                throw new JsonSerializationException($"Cannot convert value that is before Unix epoch of 00:00:00 UTC on 1 January 1970 to {objectType}.");
            }
        }
    }
}
