using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TUser
    {
        public TUser()
        {
            TGeneralHealthEntry = new HashSet<TGeneralHealthEntry>();
            TMedicineFactorRecord = new HashSet<TMedicineFactorRecord>();
            TPlan = new HashSet<TPlan>();
            TSymptomEntry = new HashSet<TSymptomEntry>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? SignupDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Language { get; set; }

        public ICollection<TGeneralHealthEntry> TGeneralHealthEntry { get; set; }
        public ICollection<TMedicineFactorRecord> TMedicineFactorRecord { get; set; }
        public ICollection<TPlan> TPlan { get; set; }
        public ICollection<TSymptomEntry> TSymptomEntry { get; set; }
    }
}
