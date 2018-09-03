using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Repositories.UserRepository
{
    public interface IUserRepository
    {
        TUser GetUser(string email, string password);
        TUser GetUser(string email);
        void UpdatePassword(int userId, string newPassword);
        void UpdateLastLoginDate(int userId, DateTime loginDate);
    }
}
