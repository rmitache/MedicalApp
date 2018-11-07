using System;

namespace BLL.DomainModel.Users.BLOs
{
    public class UserAccount
    {
        // Properties
        public int ID { get; set; }
        public string Email { get; set; }
        public DateTime? TermsAcceptedDate { get; set; }

        // Constructor
        internal UserAccount() { }
    }
}
