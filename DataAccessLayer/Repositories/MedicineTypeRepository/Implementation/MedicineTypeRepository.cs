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
            var baseQuery = entitiesContext.TMedicineType
                .AsNoTracking()
                .Where(medicineType =>
                        medicineType.UserId == userID)
                .AsQueryable();


            if (includeSupplyEntriesAndTakenRecords)
            {
                baseQuery = baseQuery.Include(medicineType => medicineType.TMedicineTypeSupplyEntry);
                baseQuery = baseQuery
                    .Include(medicineType => medicineType.TTakenMedicineFactorRecord)
                        .ThenInclude(takenRecord => takenRecord.PlanMedicineRuleItem);
            }


            return baseQuery.ToList();

        }
    }
}

