using BLL.DomainModel.Users.BLOs;
using Common.DataStructures;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Users.Services
{
    public interface IUserAccountService
    {
        UserAccount FindUserAccount(string email, string password);
        UserAccount FindUserAccount(string email);
        UserAccount GetUserAccount(int id);

        void UpdatePassword(int userId, string newPassword);
        void UpdateLastLoginDate(int userId, DateTime loginDate);
        void UpdateAcceptedTermsDate(int userId, DateTime dateTime);
        void UpdateHasSeenWelcome(int userId, bool hasSeenWelcome);
    }


}
