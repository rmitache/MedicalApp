using Common;
using Common.DataStructures;
using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Z.EntityFramework.Plus;

namespace DataAccessLayer.Repositories.TakenMedicineFactorRecordRepository
{
    public class TakenMedicineFactorRecordRepository : ITakenMedicineFactorRecordRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public TakenMedicineFactorRecordRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }

        // Public methods
        public void AddTakenMedicineFactorRecords(List<TTakenMedicineFactorRecord> dataEntities)
        {
            dataEntities.ForEach(record =>
            {
                entitiesContext.TTakenMedicineFactorRecord.Add(record);

            });
            entitiesContext.SaveChanges();

        }
        public void RemoveTakenMedicineFactorRecords(List<TTakenMedicineFactorRecord> dataEntities)
        {
            dataEntities.ForEach(dataEntity =>
            {
                // Delete where it matches the record
                entitiesContext.TTakenMedicineFactorRecord.Where(x =>
                    x.MedicineTypeId == dataEntity.MedicineTypeId &&
                    x.PlanId == dataEntity.PlanId &&
                    x.OccurrenceDateTime == dataEntity.OccurrenceDateTime
                ).Delete();
            });
            entitiesContext.SaveChanges();

        }

        public List<TTakenMedicineFactorRecord> GetTakenMedicineFactorRecords(Range<DateTime> dateRange, int userID)
        {
            // Get the DataEntities
            var list = entitiesContext.TTakenMedicineFactorRecord
                .AsNoTracking()
                .Where(
                    record =>
                        record.Plan.UserId == userID &&
                        record.OccurrenceDateTime.Date >= dateRange.RangeStart.Date.StartOfDay() &&
                        record.OccurrenceDateTime.Date <= dateRange.RangeEnd.Date.EndOfDay())
                .Include(record => record.MedicineType)
                .ToList();
            return list;


        }
    }
}


