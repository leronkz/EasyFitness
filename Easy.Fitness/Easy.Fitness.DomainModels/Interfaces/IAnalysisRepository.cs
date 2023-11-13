﻿using Easy.Fitness.DomainModels.Models;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.DomainModels.Interfaces
{
    public interface IAnalysisRepository
    {
        Task<IEnumerable<ActivityYear>> GetActivityCaloriesByYearAsync(string year, CancellationToken cancellationToken);
    }
}
