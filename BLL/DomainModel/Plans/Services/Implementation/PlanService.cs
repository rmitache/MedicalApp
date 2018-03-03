﻿using BLL.DomainModel.Factors.Medicine.History.BLOs;
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

        // Constructor
        public PlanService(
            IPlanRepository planRepository,
            IPlanFactory planFactory)
        {
            this.planRepository = planRepository;
            this.planFactory = planFactory;
        }

        // Public methods
        public List<Plan> GetPlans(int userID, bool includeRules )
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
    }

}
