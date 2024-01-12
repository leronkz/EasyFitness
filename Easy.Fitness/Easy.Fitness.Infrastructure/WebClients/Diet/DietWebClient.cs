using Easy.Fitness.DomainModels.Models.Diet;
using Easy.Fitness.Infrastructure.Configuration;
using Easy.Fitness.Infrastructure.Extensions;
using Easy.Fitness.Infrastructure.WebClients.Diet.Dto;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace Easy.Fitness.Infrastructure.WebClients.Diet
{
    internal class DietWebClient
    {
        private const string MEDIA_TYPE = "application/json";
        private readonly HttpClient _client;
        private readonly FoodDatabaseConfig _config;

        public DietWebClient(FoodDatabaseConfig config, HttpClient client)
        {
            _config = config ?? throw new ArgumentNullException(nameof(config));
            _client = client ?? throw new ArgumentNullException(nameof(client));
        }

        private FoodDetails GetFoodDetails(NameValueCollection queryParameters)
        {
            string parameters = queryParameters.ToQueryString();
            string uri = $"{_config.ParserApiAddress}?{parameters}";
            ParsedFoodTable result = SendAsync<ParsedFoodTable>(uri, HttpMethod.Get).Result;
            FoodDto food = result.Foods.ElementAt(0).Food;
            return new FoodDetails
            (
                food.Label,
                food.Nutrients.Calories,
                food.Nutrients.Fat,
                food.Nutrients.Carbs,
                food.Nutrients.Protein,
                100
            );
        }

        private List<string> GetFoodNameHints(NameValueCollection queryParameters)
        {
            string parameters = queryParameters.ToQueryString();
            string uri = $"{_config.AutocompleteApiAddress}?{parameters}";
            List<string> result = SendAsync<List<string>>(uri, HttpMethod.Get).Result;
            return result;
        }

        internal FoodDetails GetNewFoodDetails(string foodName)
        {
            NameValueCollection queryParameters = GetParserQueryParameters(foodName);
            return GetFoodDetails(queryParameters);
        }

        internal List<string> GetFoodNameHints(string foodName)
        {
            NameValueCollection queryParameters = GetAutocompleteQueryParameters(foodName);
            return GetFoodNameHints(queryParameters);
        }

        private NameValueCollection GetParserQueryParameters(string foodName)
        {
            NameValueCollection collection = CreateQueryParameters();
            collection["ingr"] = foodName;
            collection["nutrition-type"] = "logging";
            return collection;
        }

        private NameValueCollection GetAutocompleteQueryParameters(string foodName)
        {
            NameValueCollection collection = CreateQueryParameters();
            collection["q"] = foodName;
            return collection;
        }

        private NameValueCollection CreateQueryParameters()
        {
            NameValueCollection collection = new NameValueCollection
            {
                ["app_id"] = _config.ApplicationId,
                ["app_key"] = _config.ApplicationKeys
            };
            return collection;
        }

        private Task<TResponseModel> SendAsync<TResponseModel>(string uri, HttpMethod method)
        {
            HttpRequestMessage request = new HttpRequestMessage
            {
                RequestUri = new Uri(uri),
                Method = method,
            };
            request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue(MEDIA_TYPE));
            return SendAsync<TResponseModel>(request);
        }

        private async Task<TResponseModel> SendAsync<TResponseModel>(HttpRequestMessage request)
        {
            using (HttpResponseMessage response = await _client.SendAsync(request).ConfigureAwait(false))
            {
                string message = await response.Content.ReadAsStringAsync().ConfigureAwait(false);
                if (response.IsSuccessStatusCode)
                {
                    return JsonConvert.DeserializeObject<TResponseModel>(message);
                }
                throw new ResponseException(response.StatusCode, message);
            }
        }
    }
}
