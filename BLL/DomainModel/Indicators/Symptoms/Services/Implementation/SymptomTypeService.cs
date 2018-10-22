using BLL.DomainModel.Indicators.Symptoms.BLOs;
using BLL.DomainModel.Indicators.Symptoms.Factories;
using DataAccessLayer.Repositories.SymptomTypeRepository;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Indicators.Symptoms.Services
{
    public class SymptomTypeService : ISymptomTypeService
    {
        // Fields
        private readonly ISymptomTypeRepository symptomTypeRepo;
        private readonly ISymptomTypeFactory symptomTypeFactory;

        // Constructor
        public SymptomTypeService(ISymptomTypeRepository symptomTypeRepo, ISymptomTypeFactory symptomTypeFactory)
        {
            this.symptomTypeRepo = symptomTypeRepo;
            this.symptomTypeFactory = symptomTypeFactory;
        }

        // Public methods
        public List<SymptomType> GetAllSymptomTypes()
        {
            var dataEntities = this.symptomTypeRepo.GetAllSymptomTypes();
            var blos = this.symptomTypeFactory.Convert_ToBLOList(dataEntities);

            // Sort alphabetically
            var sortedBLOs = blos.OrderBy(symptomType => symptomType.Name).ToList();


            return sortedBLOs;
        }
        public List<SymptomType> GetSymptomTypesFromHealthEntries(List<HealthStatusEntry> healthEntries)
        {
            // Create a dictionary of unique symptomTypes
            healthEntries = healthEntries.OrderByDescending(x => x.OccurrenceDateTime).ToList();
            var symptomTypesDict = new Dictionary<string, SymptomType>();
            foreach (HealthStatusEntry healthEntry in healthEntries)
            {
                foreach (SymptomEntry symptomEntry in healthEntry.SymptomEntries)
                {
                    if (!symptomTypesDict.ContainsKey(symptomEntry.SymptomType.Name))
                    {
                        symptomTypesDict.Add(symptomEntry.SymptomType.Name, symptomEntry.SymptomType);
                    }

                }
            }

            return symptomTypesDict.Values.ToList();
        }
    }
}
