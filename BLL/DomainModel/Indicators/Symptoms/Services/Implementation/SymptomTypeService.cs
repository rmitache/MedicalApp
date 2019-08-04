using BLL.DomainModel.Indicators.Symptoms.BLOs;
using BLL.DomainModel.Indicators.Symptoms.Factories;
using Common;
using DataAccessLayer.Repositories.SymptomTypeRepository;
using System;
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
        public List<SymptomType> GetSymptomTypes(int userID)
        {
            var dataEntities = this.symptomTypeRepo.GetSymptomTypes(userID);
            var blos = this.symptomTypeFactory.Convert_ToBLOList(dataEntities);

            // Sort alphabetically
            var sortedBLOs = blos.OrderBy(symptomType => symptomType.Name).ToList();


            return sortedBLOs;
        }
        public List<SymptomType> GetSymptomTypesInUse(int userID)
        {
            var dataEntities = this.symptomTypeRepo.GetOnlySymptomTypesInUse(userID);
            var blos = this.symptomTypeFactory.Convert_ToBLOList(dataEntities);

            // Sort alphabetically
            var sortedBLOs = blos.OrderBy(symptomType => symptomType.Name).ToList();


            return sortedBLOs;
        }
        public List<SymptomType> GetUniqueSymptomTypesInHealthEntries(List<HealthStatusEntry> healthEntries)
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
        public SymptomType AddCustomSymptomType(SymptomType blo, int userID)
        {
            blo.Name = blo.Name.FirstCharToUpper();

            //
            var dataEntity = this.symptomTypeFactory.Convert_ToDataEntity(blo, userID);
            this.symptomTypeRepo.AddCustomSymptomType(dataEntity);

            blo.ID = dataEntity.Id;

            return blo;
        }
        public void RenameCustomSymptomType(int symptomTypeID, string newName, int userID)
        {
            this.symptomTypeRepo.UpdateName(userID, symptomTypeID, newName);
        }
        public bool SymptomTypeNameExists(int userID, string name, string ignoreName)
        {
            var symptomTypes = this.GetSymptomTypes(userID);
            bool exists = symptomTypes.Any(elem => String.Equals(elem.Name, name, StringComparison.OrdinalIgnoreCase) &&
            !String.Equals(elem.Name, ignoreName, StringComparison.OrdinalIgnoreCase));

            return exists;
        }
    }
}
