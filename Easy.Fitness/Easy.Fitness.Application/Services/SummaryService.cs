using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Services
{
    public class SummaryService : ISummaryService
    {
        private readonly ISummaryRepository _summaryRepository;

        public SummaryService(ISummaryRepository summaryRepository)
        {
            _summaryRepository = summaryRepository ?? throw new ArgumentNullException(nameof(summaryRepository));
        }

        public async Task<DashboardSummary> GetSummaryAsync(string date, CancellationToken cancellationToken)
        {
            DashboardSummary summary = await _summaryRepository.GetSummaryAsync(date, cancellationToken);
            return summary;
        }
    }
}
