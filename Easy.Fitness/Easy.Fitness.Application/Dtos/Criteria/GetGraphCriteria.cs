namespace Easy.Fitness.Application.Dtos.Criteria
{
    public record GetGraphCriteria
    {
        public string? StartDate { get; init; }
        public string? EndDate { get; init; }
    }
}
