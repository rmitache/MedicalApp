using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
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
        public TMedicineTypeSupplyEntry AddMedicineTypeSupplyEntry(int userID, int MedicineTypeID, int SupplyQuantity)
        {

            // Check that the userID matches the MedicineTypeID
            TMedicineType medicineType = entitiesContext.TMedicineType.AsNoTracking().Where(medType =>
                        medType.Id == MedicineTypeID).SingleOrDefault();
            if (medicineType.UserId != userID)
            {
                throw new ArgumentException("userID");
            }


            // Create the dataentity
            TMedicineTypeSupplyEntry dataEntity = new TMedicineTypeSupplyEntry();
            dataEntity.EntryDateTime = DateTime.Now;
            dataEntity.MedicineTypeId = MedicineTypeID;
            dataEntity.SupplyQuantity = SupplyQuantity;


            entitiesContext.TMedicineTypeSupplyEntry.Add(dataEntity);
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

