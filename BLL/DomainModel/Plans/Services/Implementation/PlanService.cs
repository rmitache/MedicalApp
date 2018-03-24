using BLL.DomainModel.Factors.Medicine.History.BLOs;
using BLL.DomainModel.Factors.Medicine.History.Factories;
using BLL.DomainModel.Factors.Medicine.Library.Factories;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Factories;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineFactorRecordRepository;
using DataAccessLayer.Repositories.PlanRepository;
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
            // Adjust or Restart
            if (planBLO.Versions.Count > 1 && planBLO.GetLatestVersion().ID == 0)
            {
                // Update previousLastVersion and Add the new latestVersion
                var previousLastVersionDataEntity = this.versionFactory.Convert_ToDataEntity(planBLO.GetPreviousLatestVersion());
                this.versionRepository.UpdateVersion(previousLastVersionDataEntity, planBLO.ID);
                var lastVersionDataEntity = this.versionFactory.Convert_ToDataEntity(planBLO.GetLatestVersion());
                this.versionRepository.AddVersion(lastVersionDataEntity, planBLO.ID);
            }
            // HardEdit
            else
            {
                // Try and update both the previousLastVersion and the latestVersion
                if (planBLO.Versions.Count > 1)
                {
                    var previousLastVersionDataEntity = this.versionFactory.Convert_ToDataEntity(planBLO.GetPreviousLatestVersion());
                    this.versionRepository.UpdateVersion(previousLastVersionDataEntity, planBLO.ID);
                }
                var lastVersionDataEntity = this.versionFactory.Convert_ToDataEntity(planBLO.GetLatestVersion());
                this.versionRepository.UpdateVersion(lastVersionDataEntity, planBLO.ID);
            }



            return planBLO;
        }
    }
}
