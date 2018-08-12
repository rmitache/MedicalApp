using BLL.DomainModel.Users.BLOs;
using BLL.DomainModel.Users.Factories;
using Common.DataStructures;
using DataAccessLayer.Repositories.UserRepository;
using System;
using System.Collections.Generic;
using System.Linq;

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
    }
}
