using BLL.DomainModel.Indicators.Symptoms.History.Enums;
using System;
using System.Collections.Generic;

namespace BLL.DomainModel.Indicators.Symptoms.History.BLOs
{
    public  class HealthStatusEntry
    {
        // Properties
        public int ID { get; set; }
        public DateTime OccurenceDateTime { get; set; }
        public HealthLevel HealthLevel { get; set; }
        public List<SymptomEntry> SymptomEntries { get; set; }

        // Constructor
        internal HealthStatusEntry() { }
    }



}
