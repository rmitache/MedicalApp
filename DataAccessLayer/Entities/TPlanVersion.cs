using System;
using System.Collections.Generic;

namespace DataAccessLayer.Entities
{
    public partial class TPlanVersion
    {
        public int Id { get; set; }
        public int PlanId { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }

        public TPlan Plan { get; set; }
    }
}
