using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataAccessLayer.Repositories.MedicineFactorRecordRepository
{
    public class MedicineFactorRecordRepository : IMedicineFactorRecordRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public MedicineFactorRecordRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }



        // Public methods
        public List<TMedicineFactorRecord> AddMedicineFactorRecords(List<TMedicineFactorRecord> factorRecordDataEntities)
        {
            factorRecordDataEntities.ForEach(record =>
            {
                entitiesContext.TMedicineFactorRecord.Add(record);

            });
            entitiesContext.SaveChanges();

            return factorRecordDataEntities;
        }
        public List<TMedicineFactorRecord> GetMedicineFactorRecords(DateTime date, int userID)
        {
            return entitiesContext.TMedicineFactorRecord
                .AsNoTracking()
                .Where(
                    record =>
                        record.UserId == userID &&
                        record.OccurrenceDateTime.DayOfYear == date.DayOfYear)
                .Include(record => record.MedicineType)
                .ToList();
        }
    }
}


