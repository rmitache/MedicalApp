using BLL.DomainModel.Indicators.Symptoms.History.Enums;
using System;

namespace BLL.DomainModel.Indicators.Symptoms.History.BLOs
{
    public  class HealthStatusEntry
    {
        // Properties
        public int ID { get; set; }
        public DateTime OccurenceDateTime { get; set; }
        public HealthLevel HealthLevel { get; set; }


        // Constructor
        internal HealthStatusEntry() { }
    }



}
