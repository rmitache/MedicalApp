using Common.Datastructures;
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
                if (dataEntity.PlanId != null)
                {
                    entitiesContext.TTakenMedicineFactorRecord.Where(x =>
                        x.MedicineTypeId == dataEntity.MedicineTypeId &&
                        x.PlanId == dataEntity.PlanId &&
                        x.OccurrenceDateTime == dataEntity.OccurrenceDateTime
                    ).Delete();
                }
                 else
                {
                    entitiesContext.TTakenMedicineFactorRecord.Where(x =>
                        x.MedicineFactorRecordId == dataEntity.MedicineFactorRecordId 
                    ).Delete();
                }


            });
            entitiesContext.SaveChanges();

        }
        public Dictionary<string, TTakenMedicineFactorRecord> GetTakenMedicineFactorRecords(Range<DateTime> dateRange, int userID)
        {
            // Get the DataEntities
            var list = entitiesContext.TTakenMedicineFactorRecord
                .AsNoTracking()
                .Where(
                    record =>
                        record.Plan.UserId == userID &&
                        record.OccurrenceDateTime.Date >= dateRange.RangeStart.Date &&
                        record.OccurrenceDateTime.Date <= dateRange.RangeEnd.Date.Add(new TimeSpan(23, 59, 59)))
                .Include(record => record.MedicineType)
                .ToList();

            // Convert to dictionary
            var dictionary = new Dictionary<string, TTakenMedicineFactorRecord>();
            foreach (TTakenMedicineFactorRecord dataEntity in list) {
                string key;
                if (dataEntity.PlanId!= null)
                {
                    key = dataEntity.PlanId + "_" + dataEntity.MedicineTypeId + "_" + dataEntity.OccurrenceDateTime.ToString();
                } else
                {
                    key = dataEntity.MedicineFactorRecordId + "";
                }

                dictionary[key] = dataEntity;
            }

            return dictionary;
        }
    }
}


