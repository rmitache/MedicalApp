using BLL.DomainModel.Indicators.Symptoms.Enums;
using BLL.DomainModel.Indicators.Symptoms.BLOs;
using System;

namespace BLL.DomainModel.Indicators.Symptoms.BLOs
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
