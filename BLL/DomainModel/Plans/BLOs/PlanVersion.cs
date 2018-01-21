﻿using System;

namespace BLL.DomainModel.Plans.BLOs
{
    public class PlanVersion
    {
        // Properties
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public SectionHeader[] SectionHeaders { get; set; }
        public Rule[] Rules { get; set; }

        // Constructor
        internal PlanVersion() { }
    }
    
}