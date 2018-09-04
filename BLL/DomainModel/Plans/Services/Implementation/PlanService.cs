using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Factories;
using Common.DataStructures;
using DataAccessLayer.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Plans.Services
{
    public class PlanService : IPlanService
    {
        // Fields
        private readonly IPlanRepository planRepository;
        private readonly IPlanFactory planFactory;
        private readonly IVersionRepository versionRepository;
        private readonly IVersionFactory versionFactory;

        // Constructor
        public PlanService(
            IPlanRepository planRepository,
            IPlanFactory planFactory,
            IVersionRepository versionRepository,
            IVersionFactory versionFactory)
        {
            this.planRepository = planRepository;
            this.planFactory = planFactory;
            this.versionRepository = versionRepository;
            this.versionFactory = versionFactory;
        }

        // Public methods
        public List<Plan> GetPlans(int userID, bool includeRules)
        {
            var dataEntities = this.planRepository.GetPlans(userID, includeRules);
            var blos = this.planFactory.Convert_ToBLOList(dataEntities);
            return blos;
        }
        public Plan AddPlan(Plan blo, int userID)
        {
            var dataEntity = this.planFactory.Convert_ToDataEntity(blo, userID);
            this.planRepository.AddPlan(dataEntity);

            // Update IDs
            blo.ID = dataEntity.Id;

            return blo;
        }
        public Plan UpdatePlan(Plan planBLO, int userID)
        {
            if (planBLO.Versions.Count == 0)
            {
                throw new ArgumentException("planBLO");
            }


            // 1. Handle LatestVersion
            var latestVersionBLO = planBLO.GetLatestVersion();
            var lastVersionDataEntity = this.versionFactory.Convert_ToDataEntity(planBLO.GetLatestVersion());
            if (latestVersionBLO.ToBeDeleted)
            {
                this.versionRepository.DeleteVersion(latestVersionBLO.ID, planBLO.ID); // Delete
            }
            else if (lastVersionDataEntity.Id == 0)
            {
                this.versionRepository.AddVersion(lastVersionDataEntity, planBLO.ID); // New 
            }
            else if (lastVersionDataEntity.Id > 0)
            {
                this.versionRepository.UpdateVersion(lastVersionDataEntity, planBLO.ID); // Update
            }


            // 2. Handle PreviousVersion  
            if (planBLO.GetPreviousLatestVersion() != null)
            {
                var previousLastVersionDataEntity = this.versionFactory.Convert_ToDataEntity(planBLO.GetPreviousLatestVersion());
                this.versionRepository.UpdateVersion(previousLastVersionDataEntity, planBLO.ID);
            }

            return planBLO;
        }
        public void RenamePlan (int planID,  string newName, int userID)
        {
            this.planRepository.RenamePlan(planID, newName, userID);
        }
    }
}
