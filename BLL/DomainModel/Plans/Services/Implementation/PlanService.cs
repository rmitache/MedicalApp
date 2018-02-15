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

        // Constructor
        public PlanService(
            IPlanRepository planRepository,
            IPlanFactory planFactory)
        {
            this.planRepository = planRepository;
            this.planFactory = planFactory;
        }

        // Public methods
        public List<Plan> GetAllPlans(int userID)
        {
            var dataEntities = this.planRepository.GetAllPlans(userID);
            var blos = this.planFactory.Convert_ToBLOList(dataEntities);
            return blos;
        }
    }

}
