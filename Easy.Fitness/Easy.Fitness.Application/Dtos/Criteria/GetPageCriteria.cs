namespace Easy.Fitness.Application.Dtos.Criteria
{
    public record GetPageCriteria
    {
        public int Count { get; init; }
        public bool IsDescending { get; init; }
        public int Page { get; init; }
        public string SortColumn { get; set; }
        public string? SearchType { get; set; }
        public string? SearchDate { get; set; }
    }
}
