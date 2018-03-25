using DataAccessLayer.Entities;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace DataAccessLayer.Repositories
{
    public class RuleRepository : IRuleRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public RuleRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }

        // Public methods
        public List<TPlanRule> GetRules(int versionID, bool includeRuleItems)
        {
            if (includeRuleItems)
            {
                return entitiesContext.TPlanRule
                .AsNoTracking()
                .Where(rule => rule.PlanVersionId == versionID)
                .Include(rule => rule.TPlanMedicineRuleItem)
                        .ThenInclude(medicineRuleItem => medicineRuleItem.MedicineType)
                        .ToList();
            }
            else
            {
                return entitiesContext.TPlanRule
                .AsNoTracking()
                .Where(rule => rule.PlanVersionId == versionID)
                        .ToList();
            }
        }


    }
}

