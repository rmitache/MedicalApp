using Common.DataStructures;
using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore.Query;

namespace DataAccessLayer.Repositories.HealthStatusEntryRepository
{
    public class HealthStatusEntryRepository : IHealthStatusEntryRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public HealthStatusEntryRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }



        // Public methods
        public THealthStatusEntry AddHealthStatusEntry(THealthStatusEntry dataEntity)
        {
            entitiesContext.THealthStatusEntry.Add(dataEntity);
            entitiesContext.SaveChanges();

            return dataEntity;
        }
        public List<THealthStatusEntry> GetHealthStatusEntries(Range<DateTime> dateRange, int userID, bool includeSymptoms)
        {

            if (includeSymptoms)
            {
                return entitiesContext.THealthStatusEntry
                .AsNoTracking()
                .Where(
                    healthStatusEntry =>
                        healthStatusEntry.UserId == userID &&
                        healthStatusEntry.OccurrenceDateTime >= dateRange.RangeStart &&
                        healthStatusEntry.OccurrenceDateTime <= dateRange.RangeEnd)
                .Include(healthStatusEntry => healthStatusEntry.TSymptomEntry)
                    .ThenInclude(symptomEntry => symptomEntry.SymptomType)
                .ToList();

            }
            else
            {
                return entitiesContext.THealthStatusEntry
                .AsNoTracking()
                .Where(
                    record =>
                        record.UserId == userID &&
                        record.OccurrenceDateTime >= dateRange.RangeStart &&
                        record.OccurrenceDateTime <= dateRange.RangeEnd)
                .ToList();
            }



        }

        public int GetHealthStatusEntriesCount(int userID)
        {
            var count = entitiesContext.THealthStatusEntry
                .AsNoTracking()
                .Where(
                    healthStatusEntry =>
                        healthStatusEntry.UserId == userID)
                        .Count();

            return count;

        }
    }
}


