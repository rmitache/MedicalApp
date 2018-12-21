using BLL.DomainModel.Indicators.Symptoms.Enums;
using System;
using System.Collections.Generic;
using System.Linq;

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

        // Public methods
        public string GetSymptomEntriesNames()
        {
            string symptomsString = "";
            foreach(var symptomEntry in this.SymptomEntries)
            {
                if(symptomEntry != this.SymptomEntries.First())
                {
                    symptomsString += ", " + symptomEntry.SymptomType.Name;
                } else
                {
                    symptomsString +=  symptomEntry.SymptomType.Name;
                }
                
            }


            return symptomsString;
        }
        public string GetSymptomEntriesIntensities()
        {
            string symptomsString = "";
            foreach (var symptomEntry in this.SymptomEntries)
            {
                if (symptomEntry != this.SymptomEntries.First())
                {
                    symptomsString += ", " + symptomEntry.IntensityLevel.ToString();
                }
                else
                {
                    symptomsString += symptomEntry.IntensityLevel.ToString();
                }

            }


            return symptomsString;
        }
    }



}
