using System;

namespace BLL.DomainModel.Indicators.Symptoms.BLOs
{
    public  class SymptomEntry
    {
        // Properties
        public SymptomType SymptomType { get; set; }
        public IntensityLevel IntensityLevel { get; set; }
        public DateTime OccurenceDateTime { get; set; }


        // Constructor
        internal SymptomEntry() { }
    }

    public enum IntensityLevel
    {
        None,
        Mild,
        Intense,
        Severe
    }


}
