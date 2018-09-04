using DataAccessLayer.Entities;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;
using Z.EntityFramework.Plus;

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
        public void RenamePlan(int planID, string newName, int userID)
        {

            TPlan planEntity = entitiesContext.TPlan.AsNoTracking().Where(plan =>
                       plan.Id == planID && plan.UserId == userID).SingleOrDefault();
            if(planEntity== null)
            {
                throw new System.Exception("Plan with ID and userID cannot be found");
            }


            entitiesContext.TPlan.AsNoTracking().Where(plan =>
                       plan.Id == planID)
                       .Update(x => new TPlan() { Name = newName} );
            
            // OBS: it seems saveChanges is not needed, as the special Update method is carried out instantly
        }

    }
}

