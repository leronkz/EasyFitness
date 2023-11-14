using Easy.Fitness.Application.Dtos.Analysis.Activity;
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

        public async Task<IEnumerable<ActivityMonthDto>> GetActivityCaloriesByMonthAsync(string month, CancellationToken cancellationToken)
        {
            IEnumerable<ActivityMonth> result = await _analysisRepository.GetActivityCaloriesByMonthAsync(month, cancellationToken);
            return result.Select(x => new ActivityMonthDto { Day = x.Date, Calories = x.Calories });
        }

        public async Task<IEnumerable<ActivityYearDto>> GetActivityCaloriesByYearAsync(string year, CancellationToken cancellationToken)
        {
            IEnumerable<ActivityYear> result = await _analysisRepository.GetActivityCaloriesByYearAsync(year, cancellationToken);
            return result.Select(x => new ActivityYearDto { Month = x.Month, Calories = x.Calories }).ToList();
        }
    }
}
