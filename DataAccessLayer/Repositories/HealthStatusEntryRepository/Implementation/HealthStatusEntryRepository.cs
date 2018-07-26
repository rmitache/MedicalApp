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
                        healthStatusEntry.OccurrenceDateTime.Date >= dateRange.RangeStart.Date &&
                        healthStatusEntry.OccurrenceDateTime.Date <= dateRange.RangeEnd.Date.Add(new TimeSpan(23, 59, 59)))
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
                        record.OccurrenceDateTime.Date >= dateRange.RangeStart.Date &&
                        record.OccurrenceDateTime.Date <= dateRange.RangeEnd.Date.Add(new TimeSpan(23, 59, 59)))
                .ToList();
            }



        }
    }
}


