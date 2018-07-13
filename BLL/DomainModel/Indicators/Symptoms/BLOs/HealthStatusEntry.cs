using BLL.DomainModel.Indicators.Symptoms.Enums;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Indicators.Symptoms.BLOs
{
    public  class HealthStatusEntry
    {
        // Properties
        public int ID { get; set; }
        public DateTime OccurrenceDateTime { get; set; }
        public HealthLevel HealthLevel { get; set; }
        public List<SymptomEntry> SymptomEntries { get; set; }

        // Constructor
        internal HealthStatusEntry() { }
    }



}
