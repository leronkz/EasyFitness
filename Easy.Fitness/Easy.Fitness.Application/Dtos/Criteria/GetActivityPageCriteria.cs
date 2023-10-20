namespace Easy.Fitness.Application.Dtos.Criteria
{
    public record GetActivityPageCriteria
    {
        public int Count { get; init; }
        public bool IsDescending { get; init; }
        public int Page { get; init; }
        public string SortColumn { get; set; }
    }
}
