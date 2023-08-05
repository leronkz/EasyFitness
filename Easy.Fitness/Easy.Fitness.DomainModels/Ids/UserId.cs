using System;

namespace Easy.Fitness.DomainModels.Ids
{
    public class UserId : IComparable, IComparable<UserId>, IEquatable<UserId>
    {
        public static readonly UserId Empty = new UserId(Guid.Empty);

        private readonly Guid _id;

        protected UserId(Guid id)
        {
            _id = id;
        }

        public override bool Equals(object obj)
        {
            if (obj is UserId)
            {
                return Equals((UserId)obj);
            }
            return false;
        }

        public bool Equals(UserId other)
        {
            if (ReferenceEquals(other, null))
            {
                return false;
            }
            if (ReferenceEquals(this, other))
            {
                return true;
            }
            return _id == other._id;
        }

        internal static bool IsNullOrEmpty(UserId id)
        {
            return id == null || id == Empty;
        }

        public override int GetHashCode()
        {
            return _id.GetHashCode();
        }

        public override string ToString()
        {
            return _id.ToString();
        }

        public int CompareTo(object obj)
        {
            return CompareTo((UserId)obj);
        }

        public int CompareTo(UserId other)
        {
            return _id.CompareTo(other._id);
        }

        public static UserId Parse(string id)
        {
            return new UserId(Guid.Parse(id));
        }

        public static bool operator ==(UserId left, UserId right)
        {
            if (ReferenceEquals(left, right))
            {
                return true;
            }
            if (ReferenceEquals(left, null))
            {
                return false;
            }
            if (ReferenceEquals(right, null))
            {
                return false;
            }
            return left.Equals(right);
        }

        public static bool operator !=(UserId left, UserId right)
        {
            return !(left == right);
        }

        public static implicit operator Guid(UserId user)
        {
            return user._id;
        }

        public static explicit operator UserId(Guid userId)
        {
            return new UserId(userId);
        }

        public static UserId NewId()
        {
            return new UserId(Guid.NewGuid());
        }

        public static UserId FromGuid(Guid id)
        {
            return new UserId(id);
        }
        public static bool TryParse(string value, out UserId result)
        {
            bool guidParsingResult = Guid.TryParse(value, out Guid guidParsed);
            result = guidParsingResult ? (UserId)guidParsed : null;
            return guidParsingResult;
        }
    }
}
