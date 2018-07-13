using BLL.DomainModel.Users.BLOs;
using Common.Datastructures;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Users.Services
{
    public interface IUserAccountService
    {
        UserAccount FindUserAccount(string email, string password);
        UserAccount FindUserAccount(string email);
    }


}
