using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TSymptomEntry
    {
        public int Id { get; set; }
        public int HealthStatusEntryId { get; set; }
        public int SymptomTypeId { get; set; }
        public int IntensityLevelId { get; set; }
        public DateTime OccurrenceDateTime { get; set; }

        public THealthStatusEntry HealthStatusEntry { get; set; }
        public TSymptomType SymptomType { get; set; }
    }
}
