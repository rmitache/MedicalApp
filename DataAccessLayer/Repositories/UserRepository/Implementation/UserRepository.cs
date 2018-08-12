using DataAccessLayer.Entities;
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
    }
}

