using BLL.DomainModel.Indicators.Symptoms.History.Enums;
using System;

namespace BLL.DomainModel.Indicators.Symptoms.History.BLOs
{
    public  class SymptomEntry
    {
        // Properties
        //public SymptomType SymptomType { get; set; }
        public SymptomIntensityLevel IntensityLevel { get; set; }
        public DateTime OccurenceDateTime { get; set; }


        // Constructor
        internal SymptomEntry() { }
    }



}
