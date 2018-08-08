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
        public DateTime StartDateTime { get; set; }
        public DateTime? EndDateTime { get; set; }

        public TPlan Plan { get; set; }
        public ICollection<TPlanRule> TPlanRule { get; set; }
    }
}
