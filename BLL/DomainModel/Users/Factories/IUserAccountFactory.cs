using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Users.BLOs;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
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
