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
        public Plan AdjustPlan(Plan blo, int userID)
        {
            // Update next last Version
            BLOs.Version nextLastVersion = blo.Versions[blo.Versions.Count - 2];
            var nextLastVersionDataEntity = this.versionFactory.Convert_ToDataEntity(nextLastVersion);
            this.versionRepository.UpdateVersion(nextLastVersionDataEntity, blo.ID);

            // Add the new version
            BLOs.Version lastVersion = blo.Versions[blo.Versions.Count - 1];
            var lastVersionDataEntity = this.versionFactory.Convert_ToDataEntity(lastVersion);
            this.versionRepository.AddVersion(lastVersionDataEntity, blo.ID);

            return blo;
        }
    }
}
