using Common.Datastructures;
using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

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
            dataEntities.ForEach(record =>
            {
                entitiesContext.TTakenMedicineFactorRecord.Attach(record);
                entitiesContext.TTakenMedicineFactorRecord.Remove(record);

            });
            entitiesContext.SaveChanges();

        }
        public List<TTakenMedicineFactorRecord> GetTakenMedicineFactorRecords(Range<DateTime> dateRange, int planID)
        {
            return entitiesContext.TTakenMedicineFactorRecord
                .AsNoTracking()
                .Where(
                    record =>
                        record.PlanId == planID &&
                        record.OccurrenceDateTime.Date >= dateRange.RangeStart.Date &&
                        record.OccurrenceDateTime.Date <= dateRange.RangeEnd.Date.Add(new TimeSpan(23, 59, 59)))
                .Include(record => record.MedicineType)
                .ToList();
        }
    }
}


