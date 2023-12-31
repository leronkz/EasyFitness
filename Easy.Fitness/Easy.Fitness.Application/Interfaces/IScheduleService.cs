﻿using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.Criteria;
using Easy.Fitness.Application.Dtos.Schedule;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Easy.Fitness.Application.Interfaces
{
    public interface IScheduleService
    {
        Task<ScheduleDto> SaveNewScheduleAsync(ScheduleDto schedule, CancellationToken cancellationToken);
        Task<PageDto<ScheduleDto>> GetSchedulePageAsync(GetPageCriteria criteria, CancellationToken cancellationToken);
        Task DeleteScheduleAsync(Guid scheduleId, CancellationToken cancellationToken);
        Task<ScheduleDto> UpdateScheduleAsync(Guid scheduleId, ScheduleDto schedule, CancellationToken cancellationToken);
    }
}
