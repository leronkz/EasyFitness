using System;
using System.Threading.Tasks;
using System.Threading;
using Microsoft.EntityFrameworkCore;
using Easy.Fitness.DomainModels.Interfaces;
using Easy.Fitness.DomainModels.Models;
using Easy.Fitness.Infrastructure.Exceptions;

namespace Easy.Fitness.Infrastructure.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;
        private const string DUPLICATE_KEY_ERROR_CODE = "23505";

        public UserRepository(AppDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<User> AddUserAsync(User user, CancellationToken cancellationToken)
        {
            try
            {
                _context.Users.Add(user);
                await _context.SaveChangesAsync(cancellationToken);
                return user;
            }
            catch(Exception ex)
            {
                Npgsql.PostgresException dbException = ex.InnerException as Npgsql.PostgresException;
                if(dbException != null)
                {
                    if(dbException.SqlState == DUPLICATE_KEY_ERROR_CODE)
                    {
                        throw new UserExistsException(ex);
                    }
                }
                throw new DatabaseException("An error occured while trying to register user", ex);
            }
        }

        public async Task<User> GetUserByEmailAsync(string email)
        {
            try
            {
                return await _context.Users.SingleAsync(x => x.Email == email);
            }
            catch(Exception ex)
            {
                throw new NoUserFoundException(ex);
            }
        }
    }
}
