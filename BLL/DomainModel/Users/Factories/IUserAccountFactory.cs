using BLL.DomainModel.Users.BLOs;
using DataAccessLayer.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Users.Factories
{
    public interface IUserAccountFactory
    {
        UserAccount Convert_ToBLO(TUser dataEntity);
    }
}
