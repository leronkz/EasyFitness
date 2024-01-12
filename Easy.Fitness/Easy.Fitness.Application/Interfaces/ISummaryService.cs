using Easy.Fitness.DomainModels.Models.Summary;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Interfaces
{
    public interface ISummaryService
    {
        Task<DashboardSummary> GetSummaryAsync(string date, CancellationToken cancellationToken);
    }
}
