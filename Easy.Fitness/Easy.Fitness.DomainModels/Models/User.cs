using System;
using System.Collections.Generic;
using Easy.Fitness.DomainModels.Ids;

namespace Easy.Fitness.DomainModels.Models
{
    public class User : Entity<Guid>
    {
        public string Email { get; private set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string PhoneNumber { get; set; }
        public string BirthDate { get; set; }
        public UserParameters Parameters { get; set; }
        public ICollection<Activity> Activities { get; set; }
        public string Image { get; set; }
        
        public User(string email, string password)
        {
            Email = !string.IsNullOrEmpty(email) ? email : throw new ArgumentNullException(nameof(email));
            Password = !string.IsNullOrEmpty(password) ? password : throw new ArgumentNullException(nameof(password));
        }

        public User(string email, string password, UserId createdBy) : base(createdBy)
        {
            Email = !string.IsNullOrEmpty(email) ? email : throw new ArgumentNullException(nameof(email));
            Password = !string.IsNullOrEmpty(password) ? password : throw new ArgumentNullException(nameof(password));
        }

        public User(string email, string password, string firstName, string lastName, string phoneNumber, string birthDate)
        {
            Email = !string.IsNullOrEmpty(email) ? email : throw new ArgumentNullException(nameof(email));
            Password = !string.IsNullOrEmpty(password) ? password : throw new ArgumentNullException(nameof(password));
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            BirthDate = birthDate;
        }
        
        public User(Guid id, string firstName, string lastName, string phoneNumber, string birthdate) : base(id)
        {
            FirstName = firstName;
            LastName = lastName;
            PhoneNumber = phoneNumber;
            BirthDate = birthdate;
        }
    }
}
