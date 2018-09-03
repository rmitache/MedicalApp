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
        }

        public int Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public DateTime? SignupDate { get; set; }
        public DateTime? BirthDate { get; set; }
        public string Language { get; set; }
        public DateTime? LastLoginDate { get; set; }

        public ICollection<THealthStatusEntry> THealthStatusEntry { get; set; }
        public ICollection<TMedicineType> TMedicineType { get; set; }
        public ICollection<TPlan> TPlan { get; set; }
    }
}
