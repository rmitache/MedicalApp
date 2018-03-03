using Common.Datastructures;
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
        public List<TMedicineFactorRecord> GetMedicineFactorRecords(Range<DateTime> dateRange, int userID)
        {
            return entitiesContext.TMedicineFactorRecord
                .AsNoTracking()
                .Where(
                    record =>
                        record.UserId == userID &&
                        record.OccurrenceDateTime.Date >= dateRange.RangeStart.Date &&
                        record.OccurrenceDateTime.Date <= dateRange.RangeEnd.Date.Add(new TimeSpan(23, 59, 59)))
                .Include(record => record.MedicineType)
                .ToList();
        }
    }
}


