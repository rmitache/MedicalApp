using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TPlanVersion
    {
        public TPlanVersion()
        {
            TPlanRule = new HashSet<TPlanRule>();
        }

        public int Id { get; set; }
        public int PlanId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }

        public TPlan Plan { get; set; }
        public ICollection<TPlanRule> TPlanRule { get; set; }
    }
}
