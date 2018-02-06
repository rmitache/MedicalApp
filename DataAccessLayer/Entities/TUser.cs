using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TUser
    {
        public TUser()
        {
            TMedicineFactorRecord = new HashSet<TMedicineFactorRecord>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? SignupDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Language { get; set; }

        public ICollection<TMedicineFactorRecord> TMedicineFactorRecord { get; set; }
    }
}
