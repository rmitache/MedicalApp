using BLL.DomainModel.General.Enums;
using DataAccessLayer.Entities;
using System.Linq;
using System.Collections.Generic;
using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Factors.Medicine.Library.BLOs;
using BLL.DomainModel.Factors.Medicine.Library.Enums;
using BLL.DomainModel.Plans.BLOs;
using Common.Datastructures;
using System;
using BLL.DomainModel.Plans.Enums;
using Ical.Net.CalendarComponents;
using Ical.Net.DataTypes;
using Ical.Net;
using BLL.DomainModel.Users.BLOs;

namespace BLL.DomainModel.Users.Factories
{
    public class UserAccountFactory : IUserAccountFactory
    {
        // Constructor
        public UserAccountFactory()
        {
        }

        // Public methods
        public UserAccount Convert_ToBLO(TUser dataEntity)
        {
            UserAccount blo = new UserAccount();
            blo.ID = dataEntity.Id;
            blo.Email = dataEntity.Email;
            blo.SignupDate = dataEntity.SignupDate;
            blo.BirthDate = dataEntity.BirthDate;
            blo.Language = dataEntity.Language;

            return blo;
        }
    }
}
