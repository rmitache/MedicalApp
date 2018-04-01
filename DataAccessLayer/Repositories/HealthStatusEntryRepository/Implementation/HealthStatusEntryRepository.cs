using Common.Datastructures;
using DataAccessLayer.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

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
        
    }
}


