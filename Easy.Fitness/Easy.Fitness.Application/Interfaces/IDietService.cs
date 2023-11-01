using Easy.Fitness.Application.Dtos.Diet;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IDietService
    {
        Task<DietPropertiesDto> SaveDietPropertiesAsync(DietPropertiesDto dietProperties, CancellationToken cancellationToken);
    }
}
