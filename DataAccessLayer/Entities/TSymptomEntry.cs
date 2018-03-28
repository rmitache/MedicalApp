using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TSymptomEntry
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int SymptomTypeId { get; set; }
        public int IntensityLevelId { get; set; }
        public DateTime OccurrenceDateTime { get; set; }

        public TSymptomType SymptomType { get; set; }
        public TUser User { get; set; }
    }
}
