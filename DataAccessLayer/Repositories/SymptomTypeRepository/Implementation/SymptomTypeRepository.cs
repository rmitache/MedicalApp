using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DataAccessLayer.Repositories.SymptomTypeRepository
{
    public class SymptomTypeRepository : ISymptomTypeRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public SymptomTypeRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }

        // Public methods
        public List<TSymptomType> GetSymptomTypes(int userID)
        {
            return entitiesContext.TSymptomType
                 .AsNoTracking()
                 .Where(symptomType => symptomType.UserId == null || symptomType.UserId == userID)
                 .ToList();
        }
        public List<TSymptomType> GetOnlySymptomTypesInUse(int userID)
        {
            return entitiesContext.TSymptomType
                .AsNoTracking()
                .Where(symptomType => symptomType.TSymptomEntry.Any(symptomEntry => symptomEntry.HealthStatusEntry.UserId == userID))
                .ToList();
        }
        public TSymptomType AddCustomSymptomType(TSymptomType dataEntity)
        {
            if(dataEntity.UserId!=null)
            {
                throw new System.Exception("Only custom Symptom Types can be created - Eg: those WITH a valid UserId");
            }

            entitiesContext.TSymptomType.Add(dataEntity);
            entitiesContext.SaveChanges();

            return dataEntity;
        }

    }
}

