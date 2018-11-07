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
            blo.TermsAcceptedDate = dataEntity.TermsAcceptedDate;

            return blo;
        }
    }
}
