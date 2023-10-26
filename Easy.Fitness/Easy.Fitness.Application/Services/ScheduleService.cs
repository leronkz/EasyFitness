using Easy.Fitness.Application.Dtos;
using Easy.Fitness.Application.Dtos.Criteria;
using Easy.Fitness.Application.Dtos.Schedule;
using Easy.Fitness.Application.Extensions;
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
    public class ScheduleService : IScheduleService
    {
        private readonly IScheduleRepository _scheduleRepository;
        private const int PAGE_SIZE = 7;

        public ScheduleService(IScheduleRepository scheduleRepository)
        {
            _scheduleRepository = scheduleRepository ?? throw new ArgumentNullException(nameof(scheduleRepository));
        }

        public async Task<ScheduleDto> SaveNewScheduleAsync(ScheduleDto schedule, CancellationToken cancellationToken)
        {
            PlannedActivity newSchedule = schedule.ToEntity();
            PlannedActivity result = await _scheduleRepository.SaveNewScheduleAsync(newSchedule, cancellationToken);

            return result.ToDto();
        }

        public async Task<PageDto<ScheduleDto>> GetSchedulePageAsync(GetPageCriteria criteria, CancellationToken cancellationToken)
        {
            IEnumerable<PlannedActivity> result = await _scheduleRepository.GetSchedulesAsync(
                criteria.Page, criteria.SortColumn, criteria.IsDescending, criteria.SearchType, cancellationToken);
            int totalCount = await _scheduleRepository.GetTotalCountAsync(cancellationToken);
            PageDto<ScheduleDto> schedulePage = new PageDto<ScheduleDto>
            {
                Items = result.Select(s => s.ToDto()).ToList(),
                Page = criteria.Page,
                PageSize = PAGE_SIZE,
                TotalCount = totalCount
            };
            return schedulePage;
        }
    }
}
