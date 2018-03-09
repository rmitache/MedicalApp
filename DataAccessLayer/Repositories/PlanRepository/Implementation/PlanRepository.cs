using DataAccessLayer.Entities;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace DataAccessLayer.Repositories.PlanRepository
{
    public class PlanRepository : IPlanRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;

        // Constructor
        public PlanRepository(DataEntitiesContext dbContext)
        {
            this.entitiesContext = dbContext;
        }

        // Public methods
        public List<TPlan> GetPlans(int userID, bool includeRules)
        {


            if (includeRules)
            {

                return entitiesContext.TPlan
                .AsNoTracking()
                .Where(plan => plan.UserId == userID)
                .Include(plan => plan.TPlanVersion)
                    .ThenInclude(version => version.TPlanRule)
                        .ThenInclude(rule => rule.TPlanMedicineRuleItem)
                            .ThenInclude(medicineRuleItem => medicineRuleItem.MedicineType)
                            .ToList();
            }
            else
            {
                return entitiesContext.TPlan
                .AsNoTracking()
                .Where(plan => plan.UserId == userID)
                .Include(plan => plan.TPlanVersion)
                .ToList();
            }

        }
        public TPlan AddPlan(TPlan plan)
        {
            entitiesContext.TPlan.Add(plan);
            entitiesContext.SaveChanges();

            return plan;
        }
    }
}

