using Easy.Fitness.DomainModels.Ids;

namespace Easy.Fitness.Infrastructure.Converters
{
    public class UserIdConverter : IdConverter<UserId>
    {
        protected override bool TryParse(string value, out UserId result) => UserId.TryParse(value, out result);
    }
}
