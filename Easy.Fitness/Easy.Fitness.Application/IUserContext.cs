using Easy.Fitness.DomainModels.Ids;

namespace Easy.Fitness.Application
{
    public interface IUserContext
    {
        UserId CurrentUserId { get; }
    }
}
