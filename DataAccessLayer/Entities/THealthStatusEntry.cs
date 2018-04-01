using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class THealthStatusEntry
    {
        public THealthStatusEntry()
        {
            TSymptomEntry = new HashSet<TSymptomEntry>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public int HealthLevelId { get; set; }
        public DateTime OccurrenceDateTime { get; set; }

        public TUser User { get; set; }
        public ICollection<TSymptomEntry> TSymptomEntry { get; set; }
    }
}
