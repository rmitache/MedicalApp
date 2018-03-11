using DataAccessLayer.Entities;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace DataAccessLayer.Repositories.PlanRepository
{
    public class VersionRepository : IVersionRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public VersionRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }

        // Public methods
        public TPlanVersion AddVersion(TPlanVersion version, int planID)
        {
            version.PlanId = planID;
            entitiesContext.TPlanVersion.Add(version);
            entitiesContext.SaveChanges();

            return version;
        }
        public TPlanVersion UpdateVersion(TPlanVersion version, int planID)
        {
            version.PlanId = planID;
            entitiesContext.Attach(version);
            entitiesContext.Entry(version).State = EntityState.Modified;

            entitiesContext.SaveChanges();

            return version;
        }
    }
}

