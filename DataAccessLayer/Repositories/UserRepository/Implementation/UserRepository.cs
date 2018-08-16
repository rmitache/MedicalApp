using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DataAccessLayer.Repositories.UserRepository
{
    public class UserRepository : IUserRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public UserRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }

        // Public methods
        public TUser GetUser(string email, string password)
        {
            return entitiesContext.TUser
                .SingleOrDefault(user => user.Email == email && user.Password == password);

            
        }
        public TUser GetUser(string email)
        {
            return entitiesContext.TUser
                .SingleOrDefault(user => user.Email == email);
        }
        public void UpdatePassword(int userId, string newPassword)
        {
            TUser userAcc = entitiesContext.TUser.AsNoTracking().Where(user =>
                        user.Id == userId).SingleOrDefault();
            userAcc.Password = newPassword;

            entitiesContext.Entry(userAcc).State = EntityState.Modified;
            entitiesContext.SaveChanges();
        }
    }
}

