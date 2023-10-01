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

        public async Task<User> GetUserByEmailAsync(string email, CancellationToken cancellationToken)
        {
            try
            {
                return await _context.Users.SingleAsync(x => x.Email == email, cancellationToken);
            }
            catch(Exception ex)
            {
                throw new NoUserFoundException(ex);
            }
        }

        public async Task<User> UpdateUserAsync(User user, CancellationToken cancellationToken)
        {
            try
            {
                User userToUpdate = await _context.Users.SingleAsync(x => x.Id == user.Id, cancellationToken);
                userToUpdate.FirstName = user.FirstName;
                userToUpdate.LastName = user.LastName;
                userToUpdate.PhoneNumber = user.PhoneNumber;
                userToUpdate.BirthDate = user.BirthDate;
                _context.Update(userToUpdate);
                await _context.SaveChangesAsync(cancellationToken);
                return userToUpdate;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to save your personal data", ex);
            }
        }

        public async Task<User> GetUserByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            try
            {
                User user = await _context.Users.Include(x => x.Parameters).SingleAsync(x => x.Id == id, cancellationToken);
                return user;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your personal data", ex);
            }
        }

        public async Task UpdateUserPasswordAsync(Guid id, string newPassword, CancellationToken cancellationToken)
        {
            try
            {
                User user = await GetUserByIdAsync(id, cancellationToken);
                user.Password = newPassword;
                _context.Update(user);
                await _context.SaveChangesAsync(cancellationToken);
            }
            catch(NoUserFoundException ex)
            {
                throw ex;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to change password", ex);
            }
        }

        public async Task<UserParameters> UpdateUserParametersAsync(Guid id, UserParameters parameters, CancellationToken cancellationToken)
        {
            try
            {
                User user = await GetUserByIdAsync(id, cancellationToken);
                if(user.Parameters == null)
                {
                    user.Parameters = parameters;
                }
                else
                {
                    user.Parameters.Weight = parameters.Weight;
                    user.Parameters.Height = parameters.Height;
                }
                _context.Update(user);
                await _context.SaveChangesAsync(cancellationToken);
                return parameters;
            }
            catch(NoUserFoundException ex)
            {
                throw ex;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to update your parameters", ex);
            }
        }

        public async Task SaveUserImageAsync(Guid id, string fileName, CancellationToken cancellationToken)
        {
            try
            {
                User user = await GetUserByIdAsync(id, cancellationToken);
                user.Image = fileName;
                _context.Update(user);
                await _context.SaveChangesAsync(cancellationToken);
            }
            catch(NoUserFoundException ex)
            {
                throw ex;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to save your photo", ex);
            }
        }

        public async Task<string> GetUserImageAsync(Guid id, CancellationToken cancellationToken)
        {
            try
            {
                User user = await GetUserByIdAsync(id, cancellationToken);
                return user.Image;
            }
            catch(NoUserFoundException ex)
            {
                throw ex;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your photo", ex);
            }
        }

        public async Task<UserParameters> GetUserParametersByIdAsync(Guid id, CancellationToken cancellationToken)
        {
            try
            {
                User user = await GetUserByIdAsync(id, cancellationToken);
                return user.Parameters;
            }
            catch(NoUserFoundException ex)
            {
                throw ex;
            }
            catch(Exception ex)
            {
                throw new DatabaseException("An error occurred while trying to load your parameters", ex);
            }
        }
    }
}
