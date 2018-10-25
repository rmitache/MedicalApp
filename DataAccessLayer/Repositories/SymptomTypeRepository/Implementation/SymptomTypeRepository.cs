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
        public List<TSymptomType> GetAllSymptomTypes()
        {
            return entitiesContext.TSymptomType.Select(symptomType => symptomType).ToList();
        }
        public List<TSymptomType> GetSymptomTypesWhichHaveMatchingSymptomEntries(int userID)
        {
            return entitiesContext.TSymptomType
                .AsNoTracking()
                .Where(symptomType => symptomType.TSymptomEntry.Any(symptomEntry => symptomEntry.HealthStatusEntry.UserId == userID))
                .ToList();
        }

    }
}

