using BLL.DomainModel.Users.BLOs;
using BLL.DomainModel.Users.Factories;
using DataAccessLayer.Repositories.UserRepository;
using System;

namespace BLL.DomainModel.Users.Services
{
    public class UserAccountService : IUserAccountService
    {
        // Fields
        private readonly IUserRepository userRepo;
        private readonly IUserAccountFactory userAccountFactory;

        // Constructor
        public UserAccountService(
            IUserRepository userRepo,
            IUserAccountFactory userAccountFactory
            )
        {
            this.userRepo = userRepo;
            this.userAccountFactory = userAccountFactory;

        }

        // Public methods
        public UserAccount FindUserAccount(string email, string password)
        {
            UserAccount userAccount = null;
            var userDataEntity = this.userRepo.GetUser(email, password);
            if (userDataEntity != null && String.Equals(userDataEntity.Password, password , StringComparison.CurrentCulture))
            {
                userAccount = this.userAccountFactory.Convert_ToBLO(userDataEntity);

            }
            
            return userAccount;
        }
        public UserAccount FindUserAccount(string email)
        {
            UserAccount userAccount = null;
            var userDataEntity = this.userRepo.GetUser(email);
            if (userDataEntity != null)
            {
                userAccount = this.userAccountFactory.Convert_ToBLO(userDataEntity);

            }

            return userAccount;
        }

        public UserAccount GetUserAccount(int id)
        {
            UserAccount userAccount = null;
            var userDataEntity = this.userRepo.GetUser(id);
            if (userDataEntity != null)
            {
                userAccount = this.userAccountFactory.Convert_ToBLO(userDataEntity);

            }

            return userAccount;
        }
        public void UpdatePassword(int userId, string newPassword)
        {
            this.userRepo.UpdatePassword(userId, newPassword);
        }
        public void UpdateLastLoginDate(int userId, DateTime loginDate)
        {
            this.userRepo.UpdateLastLoginDate(userId, loginDate);
        }
        public void UpdateAcceptedTermsDate(int userId, DateTime dateTime)
        {
            this.userRepo.UpdateAcceptedTermsDate(userId, dateTime);
        }
    }
}
