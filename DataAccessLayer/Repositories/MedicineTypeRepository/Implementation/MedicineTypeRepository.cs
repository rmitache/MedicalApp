using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace DataAccessLayer.Repositories.MedicineTypeRepository
{
    public class MedicineTypeRepository : IMedicineTypeRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public MedicineTypeRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }

        // Public methods
        public TMedicineType AddMedicineType(TMedicineType dataEntity)
        {
            entitiesContext.TMedicineType.Add(dataEntity);
            entitiesContext.SaveChanges();

            return dataEntity;
        }
        public List<TMedicineType> GetAllMedicineTypes(int userID, bool includeSupplyEntriesAndTakenRecords = false)
        {
            return entitiesContext.TMedicineType
                .AsNoTracking()
                .Where(medicineType =>
                        medicineType.UserId == userID)
                        .Include(medicineType => medicineType.TMedicineTypeSupplyEntry)
                        .ToList();
        }
    }
}

