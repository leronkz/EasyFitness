using Easy.Fitness.Application.Dtos.Diet;
using Easy.Fitness.Application.Extensions;
using Easy.Fitness.Application.Interfaces;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Services
{
    public class DietService : IDietService
    {
        private readonly IDietRepository _dietRepository;

        public DietService(IDietRepository dietRepository)
        {
            _dietRepository = dietRepository ?? throw new ArgumentNullException(nameof(dietRepository));
        }

        public async Task<DietPropertiesDto> SaveDietPropertiesAsync(DietPropertiesDto dietProperties, CancellationToken cancellationToken)
        {
            Diet newDietProperties = dietProperties.ToEntity();
            Diet result = await _dietRepository.SaveDietParametersAsync(newDietProperties, cancellationToken);
            return result.ToDto();
        }
    }
}
