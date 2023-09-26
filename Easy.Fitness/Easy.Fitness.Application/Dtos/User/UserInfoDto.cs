using System;

namespace Easy.Fitness.Application.Dtos
{
    public class UserInfoDto
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string BirthDate { get; set; }
    }
}
