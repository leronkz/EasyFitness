using Easy.Fitness.Application.Dtos.Analysis.Activity;
using Easy.Fitness.Application.Dtos.Analysis.Diet;
using Easy.Fitness.Application.Dtos.Analysis.Weight;
using Easy.Fitness.Application.Dtos.Criteria;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Services
{
    public class AnalysisService : IAnalysisService
    {
        private readonly IAnalysisRepository _analysisRepository;

        public AnalysisService(IAnalysisRepository analysisRepository)
        {
            _analysisRepository = analysisRepository ?? throw new ArgumentNullException(nameof(analysisRepository));
        }

        public async Task<IEnumerable<ActivityMonthDto>> GetActivityCaloriesByMonthAsync(string month, string year, CancellationToken cancellationToken)
        {
            IEnumerable<ActivityMonth> result = await _analysisRepository.GetActivityCaloriesByMonthAsync(month, year, cancellationToken);
            return result.Select(x => new ActivityMonthDto { Day = x.Date, Calories = x.Calories });
        }

        public async Task<IEnumerable<ActivityYearDto>> GetActivityCaloriesByYearAsync(string year, CancellationToken cancellationToken)
        {
            IEnumerable<ActivityYear> result = await _analysisRepository.GetActivityCaloriesByYearAsync(year, cancellationToken);
            return result.Select(x => new ActivityYearDto { Month = x.Month, Calories = x.Calories }).ToList();
        }

        public async Task<IEnumerable<ActivityMonthDto>> GetActivityCaloriesByRangeAsync(GetGraphCriteria criteria, CancellationToken cancellationToken)
        {
            IEnumerable<ActivityMonth> result = await _analysisRepository.GetActivityCaloriesByRangeAsync(criteria.StartDate, criteria.EndDate, cancellationToken);
            return result.Select(x => new ActivityMonthDto { Day = x.Date, Calories = x.Calories });
        }

        public async Task<IEnumerable<WeightMonthDto>> GetWeightByRangeAsync(GetGraphCriteria critiera, CancellationToken cancellationToken)
        {
            IEnumerable<WeightMonth> result = await _analysisRepository.GetWeightByRangeAsync(critiera.StartDate, critiera.EndDate, cancellationToken);
            return result.Select(x => new WeightMonthDto { Day = x.Date, Weight = x.Weight });
        }

        public async Task<IEnumerable<WeightMonthDto>> GetWeightByMonthAsync(string month, string year, CancellationToken cancellationToken)
        {
            IEnumerable<WeightMonth> result = await _analysisRepository.GetWeightByMonthAsync(month, year, cancellationToken);
            return result.Select(x => new WeightMonthDto { Day = x.Date, Weight = x.Weight });
        }

        public async Task<IEnumerable<DietMonthDto>> GetCaloriesByMonthAsync(string month, string year, CancellationToken cancellationToken)
        {
            IEnumerable<DietMonth> result = await _analysisRepository.GetCaloriesByMonthAsync(month, year, cancellationToken);
            return result.Select(x => new DietMonthDto { Day = x.Date, Calories = x.Calories });
        }

        public async Task<IEnumerable<DietMonthDto>> GetCaloriesByRangeAsync(GetGraphCriteria criteria, CancellationToken cancellationToken)
        {
            IEnumerable<DietMonth> result = await _analysisRepository.GetCaloriesByRangeAsync(criteria.StartDate, criteria.EndDate, cancellationToken);
            return result.Select(x => new DietMonthDto { Day = x.Date, Calories = x.Calories });
        }
    }
}
