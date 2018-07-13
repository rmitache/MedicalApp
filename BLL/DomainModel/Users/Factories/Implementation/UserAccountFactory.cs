using DataAccessLayer.Entities;
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
