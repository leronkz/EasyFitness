using Easy.Fitness.DomainModels.Models.Summary;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface ISummaryRepository
    {
        Task<DashboardSummary> GetSummaryAsync(string date, CancellationToken cancellationToken);
    }
}
