using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TUser
    {
        public TUser()
        {
            THealthStatusEntry = new HashSet<THealthStatusEntry>();
            TMedicineType = new HashSet<TMedicineType>();
            TPlan = new HashSet<TPlan>();
            TSymptomType = new HashSet<TSymptomType>();
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? TermsAcceptedDate { get; set; }
        public DateTime? LastLoginDate { get; set; }
        public bool? HasSeenWelcome { get; set; }

        public ICollection<THealthStatusEntry> THealthStatusEntry { get; set; }
        public ICollection<TMedicineType> TMedicineType { get; set; }
        public ICollection<TPlan> TPlan { get; set; }
        public ICollection<TSymptomType> TSymptomType { get; set; }
    }
}
