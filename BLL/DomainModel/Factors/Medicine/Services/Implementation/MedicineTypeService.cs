﻿using BLL.DomainModel.Factors.Medicine.BLOs;
using BLL.DomainModel.Factors.Medicine.Factories;
using BLL.DomainModel.Plans.BLOs;
using BLL.DomainModel.Plans.Services;
using Common;
using Common.DataStructures;
using DataAccessLayer.Entities;
using DataAccessLayer.Repositories.MedicineTypeRepository;
using DataAccessLayer.Repositories.TakenMedicineFactorRecordRepository;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;

namespace BLL.DomainModel.Factors.Medicine.Library.Services
{
    public class MedicineTypeService : IMedicineTypeService
    {
        // Fields
        private readonly ITakenMedicineFactorRecordRepository takenMedFactorRecordRepo;
        private readonly IMedicineTypeRepository medicineTypeRepo;
        private readonly IMedicineTypeFactory medicineTypeFactory;
        private readonly IPlanService planService;
        private readonly IMedicineTypeSupplyService medicineTypeSupplyService;

        // Private methods
        private Dictionary<string, MedicineType> GetUniqueMedicineTypesInUseByPlans(List<Plan> planBLOs, Range<DateTime> targetDateRange)
        {
            // Variables
            Dictionary<string, MedicineType> uniqueMedicineTypesInUseAcrossPlans = new Dictionary<string, MedicineType>();

            // Get Versions in the plans which intersect with the targetDateRange
            foreach (Plan plan in planBLOs)
            {
                // For each Version loop through the unique MedicineTypes and merge them to the list 
                var versionsInPlanHittingToday = plan.GetVersionsWhichIntersectWithDateRange(targetDateRange);
                foreach (Plans.BLOs.Version version in versionsInPlanHittingToday)
                {
                    var uniqueMedTypesInVersion = version.GetUniqueMedicineTypes();
                    foreach (string medicineTypeName in uniqueMedTypesInVersion.Keys)
                    {
                        if (!uniqueMedicineTypesInUseAcrossPlans.ContainsKey(medicineTypeName))
                        {
                            uniqueMedicineTypesInUseAcrossPlans[medicineTypeName] = uniqueMedTypesInVersion[medicineTypeName];
                        }
                    }
                }
            }

            // 
            return uniqueMedicineTypesInUseAcrossPlans;
        }


        // Constructor
        public MedicineTypeService(
            ITakenMedicineFactorRecordRepository takenMedFactorRecordRepo,
            IMedicineTypeRepository medicineTypeRepo,
            IMedicineTypeFactory medicineTypeFactory,
            IPlanService planService,
            IMedicineTypeSupplyService medicineTypeSupplyService)
        {
            this.takenMedFactorRecordRepo = takenMedFactorRecordRepo;
            this.medicineTypeRepo = medicineTypeRepo;
            this.medicineTypeFactory = medicineTypeFactory;
            this.planService = planService;
            this.medicineTypeSupplyService = medicineTypeSupplyService;
        }

        // Public methods
        public virtual MedicineType AddMedicineType(MedicineType blo, int userID)
        {
            var dataEntity = this.medicineTypeFactory.Convert_ToDataEntity(blo, userID);
            this.medicineTypeRepo.AddMedicineType(dataEntity);

            blo.ID = dataEntity.Id;

            return blo;
        }
        public virtual List<MedicineType> GetAllMedicineTypes(int userID, bool retreiveSupplyAndUsageInfo = false)
        {
            // Get all the medicineTypes available for the current user 
            var dataEntities = this.medicineTypeRepo.GetAllMedicineTypes(userID, true);

            // Get a dictionary with all medicineTypes in use 
            Dictionary<string, MedicineType> uniqueMedicineTypesInUseToday = null;
            if (retreiveSupplyAndUsageInfo)
            {
                var planBLOs = this.planService.GetPlans(userID, true);
                var currentDateTime = Common.Functions.GetCurrentDateTimeInUTC();
                Range<DateTime> today = new Range<DateTime>(currentDateTime, currentDateTime);
                uniqueMedicineTypesInUseToday = this.GetUniqueMedicineTypesInUseByPlans(planBLOs, today);
            }

            // Get a dictionary with remaining supply info for each MedicineType
            Dictionary<string, SupplyInfo> supplyInfoPerMedicineType = null;
            if (retreiveSupplyAndUsageInfo)
            {
                supplyInfoPerMedicineType = new Dictionary<string, SupplyInfo>();
                foreach (TMedicineType dataEntity in dataEntities)
                {
                    var supplyInfo = new SupplyInfo();
                    supplyInfo.CurrentSupplyAmount = medicineTypeSupplyService.DetermineCurrentSupplyAmount(dataEntity);
                    supplyInfo.SupplyWillLastUntil = medicineTypeSupplyService.DetermineSupplyWillLastUntil(dataEntity, supplyInfo.CurrentSupplyAmount);

                    supplyInfoPerMedicineType[dataEntity.Name] = supplyInfo;
                }

            }


            // Construct the BLOs
            var blos = this.medicineTypeFactory.Convert_ToBLOList(dataEntities, uniqueMedicineTypesInUseToday, supplyInfoPerMedicineType);
            var sortedBLOs = blos.OrderBy(medicineType => medicineType.Name).ToList();


            return sortedBLOs;
        }
        public virtual bool MedicineTypeNameExists(int userID, string name, string ignoreName)
        {
            var medTypes = this.GetAllMedicineTypes(userID, false);
            bool exists = medTypes.Any(medType => String.Equals(medType.Name, name, StringComparison.OrdinalIgnoreCase) &&
            !String.Equals(medType.Name, ignoreName, StringComparison.OrdinalIgnoreCase));

            return exists;
        }
        public void RenameMedicineType(int medicineTypeID, string newName, int userID)
        {
            this.medicineTypeRepo.RenameMedicineType(medicineTypeID, newName, userID);
        }
    }
}

