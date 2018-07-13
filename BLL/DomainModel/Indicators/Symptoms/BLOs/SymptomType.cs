using System;
using System.Collections.Generic;
using System.Text;

namespace BLL.DomainModel.Indicators.Symptoms.BLOs
{
    public class SymptomType
    {
        // Properties
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }


        // Constructor
        internal SymptomType() { }
    }
}
