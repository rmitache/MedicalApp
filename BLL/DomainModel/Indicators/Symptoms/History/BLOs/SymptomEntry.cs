using BLL.DomainModel.Indicators.Symptoms.History.Enums;
using BLL.DomainModel.Indicators.Symptoms.Library.BLOs;
using System;

namespace BLL.DomainModel.Indicators.Symptoms.History.BLOs
{
    public  class SymptomEntry
    {
        // Properties
        public int ID { get; set; }
        public SymptomType SymptomType { get; set; }
        public SymptomIntensityLevel IntensityLevel { get; set; }


        // Constructor
        internal SymptomEntry() { }
    }



}
