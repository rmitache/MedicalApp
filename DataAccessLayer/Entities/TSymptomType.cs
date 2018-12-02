using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TSymptomType
    {
        public TSymptomType()
        {
            TSymptomEntry = new HashSet<TSymptomEntry>();
        }

        public int Id { get; set; }
        public int? UserId { get; set; }
        public string Name { get; set; }

        public TUser User { get; set; }
        public ICollection<TSymptomEntry> TSymptomEntry { get; set; }
    }
}
