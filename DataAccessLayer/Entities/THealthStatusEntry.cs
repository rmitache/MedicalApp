using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class THealthStatusEntry
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int HealthLevelId { get; set; }
        public DateTime OccurrenceDateTime { get; set; }

        public TUser User { get; set; }
    }
}
