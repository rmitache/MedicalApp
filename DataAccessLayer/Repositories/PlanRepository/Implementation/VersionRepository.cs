using DataAccessLayer.Entities;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query;

namespace DataAccessLayer.Repositories
{
    public class VersionRepository : IVersionRepository
    {
        // Fields
        private readonly DataEntitiesContext entitiesContext;
        private readonly IRuleRepository ruleRepository;

        // Constructor
        public VersionRepository(DataEntitiesContext dbContext,
            IRuleRepository ruleRepository)
        {
            this.entitiesContext = dbContext;
            this.ruleRepository = ruleRepository;
        }

        // Public methods
        public TPlanVersion AddVersion(TPlanVersion version, int planID)
        {
            version.PlanId = planID;
            entitiesContext.TPlanVersion.Add(version);
            entitiesContext.SaveChanges();

            return version;
        }
        public TPlanVersion UpdateVersion(TPlanVersion modifiedVersion, int planID)
        {
            //
            modifiedVersion.PlanId = planID;
            entitiesContext.Entry(modifiedVersion).State = EntityState.Modified;

            // Mark the version and all children as Modified or Added
            modifiedVersion.TPlanRule.ToList().ForEach(modifiedRule =>
            {
                entitiesContext.Entry(modifiedRule).State = (modifiedRule.Id == 0) ? EntityState.Added : EntityState.Modified;
                modifiedRule.TPlanMedicineRuleItem.ToList().ForEach(modifiedRuleItem =>
                {
                    entitiesContext.Entry(modifiedRuleItem).State = (modifiedRuleItem.Id == 0) ? EntityState.Added : EntityState.Modified;
                });
            });

            // Handle deleted Rules
            var originalRules = this.ruleRepository.GetRules(modifiedVersion.Id, true);
            foreach (TPlanRule originalRule in originalRules)
            {
                TPlanRule matchingModifiedRule = modifiedVersion.TPlanRule.FirstOrDefault(r => r.Id == originalRule.Id);
                bool originalRuleWasDeleted = (matchingModifiedRule == null);
                if (originalRuleWasDeleted)
                {
                    entitiesContext.Entry(originalRule).State = EntityState.Deleted;
                    modifiedVersion.TPlanRule.Add(originalRule);
                } else
                {
                    // Handle deleted ruleItems in it
                    entitiesContext.Entry(matchingModifiedRule).State = EntityState.Modified;
                    foreach (TPlanMedicineRuleItem originalRuleItem in originalRule.TPlanMedicineRuleItem)
                    {
                        TPlanMedicineRuleItem matchingRuleItem = matchingModifiedRule.TPlanMedicineRuleItem.FirstOrDefault(rt => rt.Id == originalRuleItem.Id);
                        bool originalItemWasDeleted = (matchingRuleItem == null);
                        if (originalItemWasDeleted)
                        {
                            entitiesContext.Entry(originalRuleItem).State = EntityState.Deleted;
                            matchingModifiedRule.TPlanMedicineRuleItem.Add(originalRuleItem);
                        } 
                    }

                }
            }

            // Save and return
            entitiesContext.SaveChanges();
            return modifiedVersion;
        }
    }
}

